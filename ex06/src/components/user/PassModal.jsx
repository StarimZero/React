import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const PassModal = () => {


    const [form, setForm] = useState({
        upass : "red",
        npass : "1234",
        cpass : "1234"
    })

    const {upass, npass, cpass} = form;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const onChangeForm = (e) =>{
        setForm({...Form, [e.target.name]:e.target.value});
    }

    const onClickSave = async() => {
        //현재비밀번호 일치체크
        const res=await axios.get(`/users/${sessionStorage.getItem('uid')}`);
        if(res.data.upass !== upass){
          alert("현재비밀번호가 일치하지 않습니다!");
          return;
        }
        //새비밀번호 비밀번호확인하고 같은지 체크
        if(npass !== cpass){
          alert('새비밀번호가 일치하지 않습니다!');
          return;
        }
    
        if(npass===upass) {
          alert("새비밀번호가 현재비밀번호와 일치합니다!");
          return;
        }
        
        //새비밀번호로 업데이트
        if(!window.confirm('비밀번호를 변경하실래요?')) return;
        await axios.post('/users/update/pass', 
          {uid:sessionStorage.getItem('uid'), upass:npass});
        alert("비밀번호변경완료!");
        sessionStorage.clear();
        window.location.href='/users/login';  
      }

  return (
    <>
      <Button variant="outline-warning" onClick={handleShow}> 비밀번호변경하기 </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>비밀번호 변경을 원하십니까?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
                <InputGroup className='mb-2'>
                    <InputGroup.Text>현재비밀번호</InputGroup.Text>
                    <Form.Control  value={upass} name="upass" onChange={onChangeForm}/>
                </InputGroup>
                <InputGroup className='mb-2'>
                    <InputGroup.Text>새로비밀번호</InputGroup.Text>
                    <Form.Control  value={npass} name="npass" onChange={onChangeForm}/>
                </InputGroup>
                <InputGroup className='mb-2'>
                    <InputGroup.Text>비밀번호확인</InputGroup.Text>
                    <Form.Control  value={cpass} name="cpass" onChange={onChangeForm}/>
                </InputGroup>
            </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>
                닫기
            </Button>
            <Button variant='outline-primary' onClick={onClickSave}>비밀변호변경</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PassModal