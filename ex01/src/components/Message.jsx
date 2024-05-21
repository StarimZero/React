import React, { useState } from 'react'
import {Row, Col, Button} from 'react-bootstrap'


const Message = () => {
    const [message, setMessage] = useState("");
    const [textColor, setTextColor] = useState("yellow");
  return (
    <>
        <Row className='my-5'>
            <Col>
                <h1 style={{color : textColor}}>{message}</h1>
                <Button className='m-3'onClick={()=> setMessage("입장입니다.")} variant="outline-danger">입장</Button>
                <Button className='m-3'onClick={()=> setMessage("퇴장입니다.")} variant="outline-primary">퇴장</Button>
                <br/>
                <hr/>
                <h1>글자색깔바꾸기</h1>
                <Button className='m-3' variant="danger" onClick={()=> setTextColor("red")}>빨강색으로</Button>
                <Button className='m-3' variant="primary" onClick={() => setTextColor("blue")}>파랑색으로</Button>
                <Button className='m-3' variant="success" onClick={()=> setTextColor("green")}>초록색으로</Button>
            </Col>
        </Row>
    </>
  )
}

export default Message