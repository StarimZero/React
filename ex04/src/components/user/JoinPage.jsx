import React, { useState } from 'react'
import { Row, Col, InputGroup, Form, Button, Card} from 'react-bootstrap'
import { app } from '../../firebaseInit'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth' 
import { useNavigate } from 'react-router-dom'


const JoinPage = () => {
    const navi = useNavigate();
    const auth = getAuth(app);
    const [form, setForm] = useState({
        email:"black@test.com",
        pass:"12341234"
    });
    const { email, pass } = form; //비구조할당\
    const onChangeForm = (e) =>{
        setForm({...form, [e.target.name]:e.target.value});
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        if(email === "" || pass ==="") {
            alert("이메일과 비밀번호를 입력해주세요")
        }else{
            createUserWithEmailAndPassword(auth, email, pass)
            .then(success=>{
                alert(`${email}님의 회원가입을 환영합니다.`)
                navi("/user/login")
            })
            .catch(error=>{
                alert("회원가입오류:" + error)
            })
        }
    }
  return (
    <div>
        <Row className='justify-content-center my-5 userLogin'>
            <Col xs={8} lg={6}>
                <Card>
                    <Card.Header>
                        <h1 className='text-center'>회원가입</h1>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={onSubmit}>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text className='title justify-content-center'>이메일</InputGroup.Text>
                                <Form.Control name='email' type='email' value={email} onChange={onChangeForm} />
                            </InputGroup>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text className='title justify-content-center'>비밀번호</InputGroup.Text>
                                <Form.Control name='pass' type='password' value={pass} onChange={onChangeForm}/>
                            </InputGroup>
                            <Button className='w-100' type='submit' variant="dark">회원가입</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default JoinPage