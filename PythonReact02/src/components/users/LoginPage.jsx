import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import {app} from '../../firebaseInit'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'


const LoginPage = () => {

    const auth = getAuth(app);
    const navi = useNavigate();
    const [form, setForm] = useState({
        email : 'red@test.com',
        pass :'12341234'
    })

    const onChangeForm = (e) => {
        setForm({...form, [e.target.name]:e.target.value})
    }

    const onLogin =(e) => {
        e.preventDefault();
        if(form.email==="" || form.pass===""){
            alert("공백")
        }
        signInWithEmailAndPassword(auth, form.email, form.pass).then(success=>{
            alert("성공")
            sessionStorage.setItem('email', form.email);
            navi('/');
        }).catch(err=>{
            alert("로그인에러 : " + err.message)
        })

    }



    return (
        <Row className='justify-content-center'>
            <Col lg={5}>
                <Card className='my-3'>
                    <Card.Header>
                        <h1>로그인</h1>
                    </Card.Header>
                    <Card.Body>
                        <form >
                            <Form.Control placeholder='이메일' className='my-2' name='email' value={form.email} onChange={onChangeForm} />
                            <Form.Control placeholder='비밀번호' type='password' name='pass' value={form.pass} onChange={onChangeForm}/>
                            <Button className='my-2 w-100' variant='outline-info' type='submit' onClick={onLogin}>로그인</Button>
                        </form>
                    </Card.Body>
                    <Card.Footer>
                        <div>
                            <img src="/images/header03.png" width={"100%"}/>
                        </div>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    )
}

export default LoginPage