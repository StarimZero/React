import { Button, Checkbox } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const JoinPage = () => {


    const navi = useNavigate();

    const [form, setForm] = useState({
        uid:"",
        upass:"",
        uname:""
    })
    
    const {uid, upass, uname} = form;





    const onChagneForm = (e) => {
        setForm({...form, [e.target.name]:e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if(uid ==="" || upass ==="" || uname===""){
            alert("모든정보를 입력하세요");
            return;
        }
        if(!window.confirm("회원가입하시겠습니까?")) return;
        //회원가입하기
        await axios.post(`/users/insert`, form);
        alert("회원가입완료")
        navi("/users/login");
    }





  return (
    <Container>
        <Row className='justify-content-center'>
            <Col lg={5}> 
                <Card>
                    <Card.Header>
                        <div className='text-center'>
                            <h1>회원가입페이지입니다.</h1>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <form onSubmit={onSubmit}>
                            <InputGroup className='mb-2' >
                                <InputGroup.Text style={{background:"#bbb"}}>아이디이</InputGroup.Text>
                                <Form.Control placeholder='아이디를입력하세요' value={uid} name='uid' onChange={onChagneForm} />
                            </InputGroup>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text style={{background:"#058332"}}>비밀번호</InputGroup.Text>
                                <Form.Control placeholder='비밀번호를입력하세요' value={upass} name='upass' onChange={onChagneForm} />
                            </InputGroup>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text style={{background:"#958fe3"}}>회원이름</InputGroup.Text>
                                <Form.Control placeholder='이름을 입력하세요' value={uname} name='uname' onChange={onChagneForm} />
                            </InputGroup>
                            <div>
                                <Checkbox/><span>간편로그인저장</span>
                            </div>
                            <div className='text-center'>
                                <Button variant="contained" color="error" className='me-3'>가입안하기</Button>
                                <Button variant="contained" color="success" type='submit'>가입하기</Button>
                            </div>
                        </form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
  )
}

export default JoinPage