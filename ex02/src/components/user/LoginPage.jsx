import React, { useState } from 'react'
import { Row, Col, Card, Form, InputGroup, Button, FormCheck} from 'react-bootstrap'
import FormCheckLabel from 'react-bootstrap/esm/FormCheckLabel'
import { app } from "../../firebaseinit"
import { getAuth, signInWithEmailAndPassword} from "firebase/auth"
import { useNavigate } from 'react-router-dom'


const LoginPage = () => {
    const navi = useNavigate();
    const auth = getAuth(app);
    const [form, setForm] = useState({
        email:"red@test.com",
        pass:"12341234"
    });
    const {email, pass} = form;
    const onChangeForm = (e) =>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        if(email==="" || pass===""){
            alert("이메일과 패스워드를 입력하세요");
            return;
        }
        //로그인체크
        //alert(`${email}\n${pass}`);
        signInWithEmailAndPassword(auth, email, pass)
        .then(success=>{
           alert("로그인성공하였습니다.");
           sessionStorage.setItem("email", email);
           sessionStorage.setItem("uid", success.user.uid);
           navi('/');
        })
        .catch(err=>{
            alert("이메일이 존재하지 않거나, 비밀번호가 틀립니다.");
        });
    }

  return (
    <div className='my-5 userLogin'>
        <Row className='justify-content-center'>
            <Col xs={8} md={7} lg={6}>
                <Card>
                    <Card.Header>
                        <h3 className='text-center'>로그인</h3>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={onSubmit}>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text className='title justify-content-center'>이메일</InputGroup.Text>
                                <Form.Control name='email' value={email} onChange={onChangeForm}
                                placeholder='이메일을 입력하세요'/>
                            </InputGroup>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text className='title justify-content-center'>비밀번호</InputGroup.Text>
                                <Form.Control name='pass' value={pass} onChange={onChangeForm}
                                type = "password" placeholder='비밀번호'/>
                            </InputGroup>
                            <InputGroup>
                                <FormCheck></FormCheck>
                                <FormCheckLabel className='ms-2'><p>비밀번호 기억하기</p></FormCheckLabel>
                            </InputGroup>
                            <Button type='submit' className='w-100'>로그인</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default LoginPage