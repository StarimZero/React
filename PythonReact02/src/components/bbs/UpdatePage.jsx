import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';


const UpdatePage = () => {
    const [form, setForm] = useState({
        bbs_title : "",
        bbs_contents : ""
    })

    const {bbs_title, bbs_contents} = form;
    const {bbs_id} = useParams();
    const navi = useNavigate();

    const callAPI = async () => {
        const res = await axios.get(`/bbs/${bbs_id}`)
        setForm(res.data);
    }

    useEffect(()=>{
        callAPI();
    },[])

    const onChangeForm = (e) =>{
        setForm({...form, [e.target.name]: e.target.value});
    }

    const onReset = () => {
        setForm({
            bbs_title : "",
            bbs_contents : ""
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if(bbs_title===""){
            Swal.fire({
                title: "에러",
                text: "제목을 입력하세요!",
                icon: "error"
            });
            return;
        }
        Swal.fire({
            title: `${bbs_id}글을 수정 하시겠습니까?`,
            text: "",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "수정"
        }).then(async (result) => {
            if (result.isConfirmed){
                const res = await axios.put(`/bbs/${bbs_id}`, form)
                if(res.data==='success'){
                    Swal.fire({
                        title: "성공",
                        text: "등록완료.",
                        icon: "success"
                    });
                    navi(`/bbs/${bbs_id}`)
                    
                }else{
                    Swal.fire({
                        title: "에러",
                        text: "글쓰기 실패!",
                        icon: "error"
                    });
                }
            }
        });
        
    }
  return (
    <>
        <Row>
            <Col>
                <h1 className='text-center my-5'>[{bbs_id}]게시글의 수정페이지</h1>
            </Col>
        </Row>
        <Row>
            <form >
                <Form.Control className='mb-2' placeholder='제목을...' value={bbs_title || ""} onChange={onChangeForm} name='bbs_title'/>
                <Form.Control rows={15} as="textarea" placeholder='내용을..' value={bbs_contents || ""} onChange={onChangeForm} name='bbs_contents'/>
                <Button className='me-3 my-2' variant='outline-secondary' size='lg' onClick={onSubmit}>수정</Button>
                <Button variant='outline-danger' size='lg' onClick={onReset}>다시쓰기</Button>
            </form>
        </Row>
    </>
  )
}

export default UpdatePage