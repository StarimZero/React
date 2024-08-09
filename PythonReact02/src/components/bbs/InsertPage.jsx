import axios from 'axios';
import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import Swal from 'sweetalert2';

const InsertPage = () => {

    const [form, setForm] = useState({
        writer : "blue",
        title : "",
        contents : ""
    })

    const {title, contents} = form;

    const onChangeForm = (e) =>{
        setForm({...form, [e.target.name]: e.target.value});
    }

    const onReset = () => {
        setForm({
            writer : "blue",
            title : "",
            contents : ""
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if(title===""){
            Swal.fire({
                title: "에러",
                text: "제목을 입력하세요!",
                icon: "error"
            });
            return;
        }
        Swal.fire({
            title: "글을 등록 하시겠습니까?",
            text: "",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "취소",
            confirmButtonText: "등록"
            
        }).then(async (result) => {
            if (result.isConfirmed){
                const res = await axios.post("/bbs/", form)
                console.log(res)
                if(res.data==='success'){
                    Swal.fire({
                        title: "성공",
                        text: "등록완료.",
                        icon: "success"
                    });
                    window.location.href='/bbs/'
                    
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
                <h1 className='text-center my-5'>글쓰기</h1>
            </Col>
        </Row>
        <Row>
            <form>
                <Form.Control className='mb-2' placeholder='제목을...' value={title} onChange={onChangeForm} name='title'/>
                <Form.Control rows={15} as="textarea" placeholder='내용을..' value={contents} onChange={onChangeForm} name='contents'/>
                <Button className='me-3 my-2' variant='outline-secondary' size='lg'  onClick={onSubmit}>등록</Button>
                <Button variant='outline-danger' size='lg' onClick={onReset}>다시쓰기</Button>
            </form>
        </Row>
    </>
  )
}

export default InsertPage