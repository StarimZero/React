import React, { useState } from 'react'
import { Row, Col, InputGroup, Form, Button, Card, FormCheck} from 'react-bootstrap'
import FormCheckLabel from 'react-bootstrap/esm/FormCheckLabel'
import { app } from '../../firebaseInit'
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';


const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const navi = useNavigate();
    const auth = getAuth(app);
    const[form, setForm] = useState({
        email:"blue@test.com",
        pass:"12341234"
    });
    const{email, pass} = form; //비구조할당
    const onChangeForm = (e) =>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        if(email===""||pass===""){
            alert("이메일이나 비밀번호를 입력하세요")

        }else{
            //로그인체크
            //alert(`${email}\n${pass}`)
            setLoading(true);
            signInWithEmailAndPassword(auth, email, pass)
            .then(success=>{
                sessionStorage.setItem("email", email);
                sessionStorage.setItem("uid", success.user.uid);
                alert(`${email}로 로그인 \nuid는 ${success.user.uid}입니다.`);
                setLoading(false);
                if(sessionStorage.getItem("target")){
                    navi(sessionStorage.getItem("target"));
                }else{
                    navi('/');
                }
            })
            .catch(error=>{
                alert("이메일또는 비밀번호가 일치하지않습니다.")
                setLoading(false);
            });
        }
    }
    if(loading) return <div className='my-5 text-center'> 
        <>
            <Spinner animation="border" variant="primary" />
            <Spinner animation="border" variant="secondary" />
            <Spinner animation="border" variant="success" />
            <Spinner animation="border" variant="danger" />
            <Spinner animation="border" variant="warning" />
            <Spinner animation="border" variant="info" />
            <Spinner animation="border" variant="light" />
            <Spinner animation="border" variant="dark" />
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="warning" />
            <Spinner animation="grow" variant="info" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="dark" />
        </>
    </div>
  return (
    <div>
        <Row className='justify-content-center my-5 userLogin'>
            <Col xs={8} lg={6}>
                <Card>
                    <Card.Header>
                        <h1 className='text-center'>로그인</h1>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={onSubmit}>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text className='title justify-content-center'>이메일</InputGroup.Text>
                                <Form.Control name='email' value={email} onChange={(e) => onChangeForm(e)} />
                            </InputGroup>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text className='title justify-content-center'>비밀번호</InputGroup.Text>
                                <Form.Control name='pass' type='password' value={pass} onChange={onChangeForm}/>
                            </InputGroup>
                            <InputGroup>
                                <FormCheck></FormCheck>
                                <FormCheckLabel className='ms-2'><p>자동로그인</p></FormCheckLabel>
                            </InputGroup>
                            <Button className='w-100' type='submit'>로그인</Button>
                            <div className='text-center my-2'>
                                <a href="/user/join">회원가입</a>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default LoginPage