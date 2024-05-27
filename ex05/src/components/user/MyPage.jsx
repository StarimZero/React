import React from 'react'
import { useState } from 'react'
import { Row, Col, Card, Form, InputGroup, Button} from 'react-bootstrap'
import { app } from '../../firebaseInit'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'
import Spinner from 'react-bootstrap/Spinner';
import { useEffect } from 'react'
import ModalAddress from './ModalAddress'
import ModalPhoto from './ModalPhoto'

const MyPage = () => {
    const [loading, setLoading] = useState(false);
    const db = getFirestore(app);
    const email = sessionStorage.getItem("email");
    const uid = sessionStorage.getItem("uid");
    const [form, setForm] = useState({
        email : 'email',
        name : '이름',
        phone : "010-0000-0000",
        add1 : "경기 화성시 동탄반석로 277",
        add2 : "예당마을우미린풍경채아파트 125동"
    });
    const {name, phone, add1, add2} = form; //비구조할당    
    const onChangeForm = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit = async (e) =>{
        e.preventDefault();
        if(name===""){
            alert("이름은 필수입력 사항입니다.");
            return;
        }
        if(!window.confirm("내정보를 등록 하시겠습니까?")) return;
        //사용자 정보 저장한다니까
        console.log(form);
        setLoading(true);
        await setDoc(doc(db, 'users', uid), form);
        setLoading(false);
        alert("사용자 정보를 변경하였습니다.")
    }

    const callAPI = async () =>{
        setLoading(true);
        const res=await getDoc(doc(db, 'users', uid));
        if(res.data()){
            setForm(res.data());
        }
        setLoading(false);
    }

    useEffect(()=>{
        callAPI();
    }, []);

    if(loading) return <div className='my-5 text-center'> 
    <>
        <Spinner animation="border" variant="primary" />
        <Spinner animation="border" variant="secondary" />
        <Spinner animation="border" variant="success" />
        <Spinner animation="border" variant="danger" />
        <Spinner animation="border" variant="warning" />
        <Spinner animation="border" variant="info" />
        <Spinner animation="border" variant="light" />
        <Spinner animation="border" variant="dark" />
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="secondary" />
        <Spinner animation="grow" variant="success" />
        <Spinner animation="grow" variant="danger" />
        <Spinner animation="grow" variant="warning" />
        <Spinner animation="grow" variant="info" />
        <Spinner animation="grow" variant="light" />
        <Spinner animation="grow" variant="dark" />
    </>
</div>
  return (
    <div>
        <Row className='justify-content-center my-5 mypage'>
            <Col>
                <ModalPhoto form={form} setForm={setForm} setLoading={setLoading} />
                <br/>
                <span>{email}</span>
            </Col>
            <Col xs={10} md={8} lg={6}>
                <Card>
                    <Card.Header>
                        <h3 className='text-center mt-3'>내정보</h3>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={onSubmit}>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text>이름</InputGroup.Text>
                                <Form.Control name="name" value={name} onChange={onChangeForm} />
                            </InputGroup>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text>전화번호</InputGroup.Text>
                                <Form.Control name="phone" value={phone} onChange={onChangeForm} />
                            </InputGroup>
                            <InputGroup >
                                <InputGroup.Text>주소</InputGroup.Text>
                                <Form.Control name="add1" value={add1} onChange={onChangeForm} />
                                <Button><ModalAddress setForm={setForm} form={form} /></Button>
                            </InputGroup>
                            <InputGroup className='mb-3'>
                                <Form.Control placeholder='상세주소를 입력하세요' name="add2" value={add2} onChange={onChangeForm} />
                            </InputGroup>
                            <div className='text-end'>
                                <Button onClick={callAPI} className='' variant="danger" size='sm'>다시쓰기</Button>
                                <Button type='submit' className='px-3 ms-2' variant="success" size='sm'>등록</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
            </Col>
        </Row>
    </div>
  )
}

export default MyPage