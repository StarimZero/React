import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Form, Button} from 'react-bootstrap'

const InsertPage = () => {

        const [message, setMessage]= useState("");
        const [receiver, setReceiver] = useState("");
        const [sender, setSender] = useState("");


        const [users, setUsers] = useState([]);

        const callAPI = async() => {
            const res = await axios.get("/users");
            setUsers(res.data)
    }

    useEffect(()=>{
        callAPI();
    },[])

    const onSend = async () => {
        if(message===""){
            alert("메세지 내용을 입력하세요");
            return;
        }
        //메세지보내기
        if(!window.confirm(`메세지를 보내시겠습니까?`)) return;
        await axios.post(`/message/insert`, {
            sender : sessionStorage.getItem("uid"),
            receiver,
            message
        });
        alert("메시지가 전송되었습니다.");
        window.location.href="/message";

    }



  return (
    <Container>
        <Row className='justify-content-center '>
            <Col lg={6}>
                <div >
                <h1 className='text-center'>메세지쓰기</h1>
                    <Form.Select value={receiver} onChange={(e)=>setReceiver(e.target.value)}>
                        {users.map(user=>
                        <option key ={user.uid} value={user.uid} >{user.uname}({user.uid})</option>
                        )}
                    </Form.Select >
                    <Form.Control  as="textarea" rows={15} value={message}  onChange={(e)=>setMessage(e.target.value)} />
                </div>
            </Col>
            <Row className='justify-content-center'>
                <Col className='text-end'>
                    <div>
                        <Button size='lg' variant='outline-danger' className='mt-3'>다시쓰기</Button> 
                    </div>
                </Col>
                <Col>
                    <div className='text-left'>
                        <Button size='lg' variant='outline-primary' className='mt-3' onClick={onSend}>보내기</Button> 
                    </div>
                </Col>
            </Row>
        </Row>

    </Container>
  )
}

export default InsertPage