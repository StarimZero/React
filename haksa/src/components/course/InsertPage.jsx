import React, {  useContext, useState } from 'react'
import { Button, Container, Form, Row, Col, InputGroup } from 'react-bootstrap'
import { BoxContext } from '../../contexts/BoxContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InsertPage = () => {

    
    const navi =useNavigate();
    const {setBox} = useContext(BoxContext);
    const [dept, setDept] = useState("경제");
    const [lname, setLname] = useState("");


    const onSubmit = async () => {
        if(lname==="") {
            setBox({show:true, message:"강좌이름이없는데용??"});
            return;
        }
        await axios.post(`/cou/insert`, {dept,lname});
        setBox({show:true, message:"강좌등록완료. 목록페이지로 이동할껴?", action:()=>navi('/cou/list')})
    }


  return (
    <Container>
        <Row style={{height:"13rem"}}></Row>
        <Row className='justify-content-center'>
            <Col lg={4}>
                <InputGroup className='mb-2'>
                    <InputGroup.Text>개설학과</InputGroup.Text>
                    <Form.Select value={dept} onChange={(e)=>setDept(e.target.value)}>
                        <option value="0">개설학과를 선택하십시오.</option>
                        <option value="전자">전자공학과</option>
                        <option value="건축">건축공학과</option>
                        <option value="전산">컴퓨터공학과</option>
                        <option value="경제">경제학과</option>
                        <option value="생명">생명공학과</option>
                    </Form.Select>
                </InputGroup>
                <InputGroup className='mb-2'>
                    <InputGroup.Text>강좌이름</InputGroup.Text>
                    <Form.Control placeholder='강좌이름을 넣으세여' value={lname} onChange={(e)=>setLname(e.target.value)}/>
                </InputGroup>
                <InputGroup className='mb-2'>
                    <InputGroup.Text>강의시수</InputGroup.Text>
                    <Form.Control placeholder='강좌시수를 넣으세여'/>
                </InputGroup>
                <div className='text-end'>
                    <Button size='sm' variant='outline-danger'  className='me-3'>등록취소</Button>
                    <Button size='sm' variant='outline-dark' onClick={onSubmit}>강좌등록</Button>
                </div>
                
            </Col>
        </Row>
    </Container>
  )
}

export default InsertPage