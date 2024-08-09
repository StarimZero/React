import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';

const ReadPage = () => {
    const [bbs, setBBS] = useState("");
    const {bbs_id} = useParams();
    const navi = useNavigate();


    const callAPI = async () => {
        const res = await axios.get(`/bbs/${bbs_id}`)
        console.log(res.data);
        setBBS(res.data);
    }

    useEffect(()=>{
        callAPI();
    },[])


    const onDelete = () => {
        Swal.fire({
            title: "삭제?",
            text: "",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "등록"
        }).then(async (result) => {
            if (result.isConfirmed){
                const res = await axios.delete(`/bbs/${bbs_id}`)
                console.log(res)
                if(res.data==='success'){
                    Swal.fire({
                        title: "삭제",
                        text: "삭제완료.",
                        icon: "success"
                    });
                    navi('/bbs/')
                }else{
                    Swal.fire({
                        title: "에러",
                        text: "삭제 실패!",
                        icon: "error"
                    });
                }
            }
        });
    }

    const onUpdate = () => {
        navi(`/bbs/update/${bbs_id}`)
    }
  return (
    <Row>
        <Col>
            <Card className='my-5'>
                <CardHeader>
                    <h1 className='text-center my-3'>[{bbs_id}]{bbs.bbs_title}</h1>
                </CardHeader>
                <CardBody>
                    <div style={{whiteSpace:'pre-warp'}}>{bbs.bbs_contents}</div>
                </CardBody>
                <CardFooter>
                    <p>Create By <b>{bbs.bbs_writer} </b> on {bbs.bbs_regDate}</p>
                </CardFooter>
            </Card>
            <Button className='me-2' variant='outline-warning' onClick={onUpdate}>수정</Button>
            <Button variant='outline-danger' onClick={onDelete}>삭제</Button>
        </Col>
    </Row>
  )
}

export default ReadPage