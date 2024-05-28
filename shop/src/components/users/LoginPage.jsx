import axios from 'axios';
import React, { useState } from 'react'
import { InputGroup, Form, Card, Button, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

    const navi = useNavigate();
    const [form, setForm] = useState({
        uid : "red",
        upass:"red"
    });
    const {uid, upass} = form;
    const onChangeForm = (e) => {
        setForm({...form, [e.target.name]:e.target.value});
    }

    const onSubmit = async (e) =>{
        e.preventDefault();
        if(uid ===""|| upass ===""){
            alert("아이디또는 비밀번호를 입력하세요") 
            return;
        }
        //로그인체크
        console.log(uid, upass);
        const res = await axios.post("/users/login", form);
        console.log(res.data.result);
        const result = res.data.result;
        if(result === 0){
            alert("아이디가 존재하지않습니다.")
        }else if(result === 2){
            alert("비밀번호가 틀렸습니다.")
        }else if(result ===1){
            alert("로그인 하였습니다.")
            sessionStorage.setItem("uid", uid);
            navi("/")

        }
        
    }





  return (
    <Row className='justify-content-center my-5 userLogin'>
        <Col xs={8} lg={5}>
            <Card>
                <Card.Header><h3 className='text-center'>로그인</h3></Card.Header>
                <Card.Body>
                    <form onSubmit={onSubmit}>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text className='title justify-content-center'>아이디</InputGroup.Text>
                            <Form.Control name = "uid" value={uid} onChange={onChangeForm}/>
                        </InputGroup>
                        <InputGroup className='mb-3'>
                            <InputGroup.Text className='title justify-content-center'>비밀번호</InputGroup.Text>
                            <Form.Control name='upass' value={upass} onChange={onChangeForm}  type = "password"/>
                        </InputGroup>
                        <Button className='w-100' variant='info'  type='submit'>로그인</Button>
                    </form>
                </Card.Body>
            </Card>
        </Col>
    </Row>
  )
}

export default LoginPage