import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom'

const ReadSend = () => {

    const [msg, SetMsg] = useState("");

    const {mid} = useParams();
    const callAPI = async () => {
        const url=`/message/send/${mid}`;
        const res = await axios.get(url);
        console.log(res.data);
        SetMsg(res.data);
    }

    useEffect(()=>{
        callAPI();
    },[])
    
  return (
    <Container>
        <div> 메세지번호 : {mid} </div>
        <div> 받은이 : {msg.uname}({msg.receiver}) </div>
        <div> 수신일 : { msg.readDate || "수신대기중"} </div>
        <hr/>
        <dvi> {msg.message}</dvi>
        <hr/>
        <div> 보낸시간 : {msg.sendDate}</div>
        <div> 보낸이 : {msg.sender}</div>
    </Container>        
  )
}

export default ReadSend