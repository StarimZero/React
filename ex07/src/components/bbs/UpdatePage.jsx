import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Col, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'


const UpdatePage = () => {
    
    const {bid} = useParams();
    const [form, setForm] = useState({
        bid,
        title:"",
        contents:""
    });
    const {title, contents} = form;
    

    const callAPI = async () =>{
        const res = await axios.get(`/bbs/${bid}`);
        setForm(res.data);
    }

    useEffect(()=> {
        callAPI();
    } , []);



    const onChangeForm = (e) =>{
        setForm({...form, [e.target.name]:e.target.value})
    }

    const onReset = () => {
        if(!window.confirm("수정한내용을 취소하시겠습니까?")) return;
        callAPI();
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if(!window.confirm("게시글을 수정하시겠습니까?")) return;
        await axios.post(`/bbs/update`, form);
        window.location.href="/bbs/list"
    }

    return (
        <Container>
            <div >
                <h1 className='text-center'>글수정페이지  </h1>
                <Row className='justify-content-center'>
                    <Col lg={8}>
                        <form onReset={onReset} onSubmit={onSubmit}>
                            <Form.Control placeholder='제목을 입력하세요' className='mb-2' name="title"  value={title} onChange={onChangeForm}/>
                            <Form.Control as="textarea" rows={15} placeholder='내용을 입력하세요' name='contents' value={contents} onChange={onChangeForm} />
                            <div className='text-end my-2'>
                                <Button className='me-2' size='sm' variant='outline-danger' type='reset' >다시쓰기</Button>
                                <Button size='sm' variant='outline-warning' type='submit'>수정하기</Button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </div>
        </Container>
    )
}

export default UpdatePage