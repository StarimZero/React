import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Form, InputGroup, Button, CardHeader} from 'react-bootstrap'
import ModalAddress from './ModalAddress';
import ModalPhoto from './ModalPhoto';


const ReadPage = () => {

    const uid = sessionStorage.getItem("uid");
    const [form, setForm] = useState({
        uid : uid,
        uname : "",
        phone : "",
        add1 : "",
        add2 : "",
        photo : ""
    });
    const {uname, phone, add1, add2, photo} = form; //비구조할당







    const callAPI = async () =>{
        const uid = sessionStorage.getItem("uid");
        const url = `/users/read/${uid}`
        const res = await axios.get(url);
        console.log(res.data);
        setForm(res.data);
    }

    useEffect(()=>{
        callAPI();
    }, []);

    const onChangeForm = (e) => {
        setForm({...form, [e.target.name]:e.target.value})
    }

    const onSubmit = async (e) =>{
        e.preventDefault();
        if(uname===""){
            alert("이름을 입력하세요")
            return;
        }
        if(!window.confirm("회원정보를 수정하시겠습니까?")) return;
        //수정하기
        const url = "/users/update";
        const res = await axios.post(url, form);
        if(res.data.result==1){
            alert("정보수정완료")
            callAPI();
        }
    }

  return (
    <Row className='justify-content-center my-5 readPage'>
        <Col lg={10} >
            <Card>
                <Card.Header>
                    <h3 className='text-center'>마이페이지</h3>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col lg={4} md={6} sm={12}><ModalPhoto uid={uid} form={form} callAPI={callAPI} setForm={setForm} photo={photo}/></Col>
                        <Col>                    <form onSubmit={onSubmit}>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text className='title justify-content-center'>이름</InputGroup.Text>  
                            <Form.Control name='uname' value={uname} onChange={onChangeForm} />
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text className='title justify-content-center'>전화</InputGroup.Text>  
                            <Form.Control name='phone' value={phone} onChange={onChangeForm} />
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text className='title justify-content-center'>주소</InputGroup.Text>  
                            <Form.Control name='add1' value={add1} onChange={onChangeForm} />
                            <Button className='' size='sm'><ModalAddress form={form} setForm={setForm}/></Button>
                        </InputGroup>
                        <InputGroup>
                            <Form.Control placeholder='상세주소' name='add2' value={add2} onChange={onChangeForm} />
                        </InputGroup>
                        <div className='text-end'>
                            <Button className='m-2' variant='outline-danger' size='sm'onClick={callAPI} >다시쓰기</Button>
                            <Button variant='outline-success'size='sm' type='submit'>수정하기</Button>
                        </div>
                    </form></Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    </Row>
  )
}

export default ReadPage