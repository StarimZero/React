import axios from 'axios';
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import {Row, Col, Form, Button} from 'react-bootstrap'

const InsertPage = () => {


    const [form, setForm] = useState({
        uid : sessionStorage.getItem("uid"),
        title : "",
        contents :  ""
    });
    
    const {uid, title, contents} = form;




    const onChangeForm = (e) =>{
        setForm({...form, [e.target.name]: e.target.value});
    }

    const onReset = () =>{
        setForm({...form, title:"", contents:""});
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`/bbs/insert`, form);
        alert("게시글 등록완료");
        window.location.href="/bbs/list";
    }

  return (
    <Container>
        <div>
            <h1 className='text-center'>글쓰기페이지 </h1>
            <Row className='justify-content-center'>
                <Col lg={8}>
                    <form onReset={onReset} onSubmit={onSubmit}>
                        <Form.Control placeholder='제목을 입력하세요' className='mb-2' name="title" value={title}  onChange={onChangeForm} />
                        <Form.Control as="textarea" rows={15} placeholder='내용을 입력하세요' name='contents' value={contents} onChange={onChangeForm} />
                        <div className='text-end my-2'>
                            <Button className='me-2' size='sm' variant='outline-danger' type='reset'>다시쓰기</Button>
                            <Button size='sm' variant='outline-warning' type='submit'>등록하기</Button>
                        </div>
                    </form>
                </Col>
            </Row>
        </div>
    </Container>
  )
}

export default InsertPage