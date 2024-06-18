import React from 'react'
import { Button, Row, Col, Container } from 'react-bootstrap'
import MessageRouter from '../router/MessageRouter'


const MessagePage = () => {
  return (
    <Container>
        <Row>
            <Col lg={1}>
                <div>
                    <a href="/message/insert">메시지 작성</a>
                </div>
                <div>
                    <a href="/message/receive">받은메세지</a>
                </div>
                <div>
                    <a href="/message/send">보낸메세지</a>
                </div>
                <div>
                    <a href="/message/delete">휴지통</a>
                </div>
            </Col>
            <Col lg={11}>
                <MessageRouter/>
            </Col>
        </Row>
    </Container>
  )
}

export default MessagePage