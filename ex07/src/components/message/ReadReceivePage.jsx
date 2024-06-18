import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'




    ////////////////////////////////받은메세지 보기 페이지입니다.//////////////////////////////////////////////////////////////////////////
const ReadReceivePage = () => {
    
    const{mid} = useParams();
    const [msg, setMsg] = useState("");


    const callAPI = async () => {
        const url = `/message/receive/${mid}`;
        const res = await axios.get(url);
        console.log(res.data)
        setMsg(res.data);
    }

    useEffect(()=>{
        callAPI();
    },[])


  return (
    <Container>
        <div> 메세지번호 : {mid} </div>
        <div> 보낸이 : {msg.uname}({msg.sender}) </div>
        <div> 보낸시간 : {msg.sendDate}</div>
        <hr/>
        <dvi> {msg.message}</dvi>
        <hr/>
        <div> 수신일 : { msg.readDate || "수신대기중"} </div>
    </Container>    
  )
}

export default ReadReceivePage