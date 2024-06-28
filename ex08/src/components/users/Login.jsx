import { Button, Checkbox } from '@mui/material'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { BoxContext } from '../../common/BoxContext'

const Login = () => {


    const navi = useNavigate();
    const [form, setForm] = useState({
        uid :"red",
        upass: "red",
    });

    const {uid, upass} = form;

    const onChageForm = (e) => {
        setForm({...form, [e.target.name]:e.target.value});
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if(uid==="" || upass===""){
            alert("로그인정보를 입력하세요")
            return;
        }
        const res=await axios.post('/users/login', form);
        console.log(res.data)
        if(res.data===1){
            alert("로그인성공");
            sessionStorage.setItem("uid", uid);
            window.location.href="/";
            
        }else if(res.data===2){
            alert("비밀번호가 일치하지 않습니다.");
        }else{
            alert("그런 아이디는 존재하지 않습니다.")
        }
    }



  return (
    <Container>
        <Row className='justify-content-center'>
            <Col lg={5}> 
                <Card>
                    <Card.Header>
                        <div className='text-center'>
                            <h1>로그인페이지입니다.</h1>
                        </div>
                    </Card.Header>
                    <form onSubmit={onSubmit}>
                        <Card.Body>
                            <InputGroup className='mb-2' >
                                <InputGroup.Text style={{background:"#bbb"}}>아이디이</InputGroup.Text>
                                <Form.Control placeholder='아이디를입력하세요' value={uid} name='uid' onChange={onChageForm} />
                            </InputGroup>
                            <InputGroup>
                                <InputGroup.Text style={{background:"#058332"}}>비밀번호</InputGroup.Text>
                                <Form.Control placeholder='비밀번호를입력하세요' value={upass} name='upass' onChange={onChageForm}/>
                            </InputGroup>
                            <div>
                                <Checkbox/><span>간편로그인저장</span>
                            </div>
                            <div className='text-center'>
                                <Link to ="/users/join"><Button variant="contained" color="secondary" className='me-3'>회원가입하기</Button></Link>
                                <Button variant="contained" color="error" className='me-3'>비밀번호찾기</Button>
                                <Button variant="contained" color="success" type='submit'>로그인하기</Button>
                            </div>
                        </Card.Body>
                    </form>
                </Card>
            </Col>
        </Row>
    </Container>
  )
}

export default Login