import React, { useState } from 'react'
import { Button, Row, Col, Form } from 'react-bootstrap'
import moment from 'moment'
import { app } from '../../firebaseInit'
import { getFirestore, addDoc, collection} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';

const InsertPage = () => {
    const [loading, setLoading] = useState(false);
    const navi = useNavigate();
    const db = getFirestore(app);
    const[form, setForm] = useState({
        title : "",
        body : ""
    });
    const {title, body} = form;
    const onChangeForm = (e) =>{
        setForm({...form, [e.target.name]:e.target.value});
    }
    const onSubmit = async (e) =>{
        e.preventDefault();
        if(title===""){
            alert("제목을 입력하세요")
            return;
        }
        if(!window.confirm("글을 등록 하시겠습니까?")) return;
        //게시글등록
        const now = new Date();
        const date = moment(now).format("YY년MM월DD일 HH시mm분ss초")
        const email = sessionStorage.getItem("email");
        setLoading(true);
        await addDoc(collection(db, 'posts'), {...form, date, email});
        setLoading(false);
        navi('/post/list');
    }
    if(loading) return 
        <div className='my-5 text-center'> 
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
    <div className='my-5'>
        <h1 className='text-center'>글쓰기</h1>
        <Row className='justify-content-center'>
            <Col xs={10} md={8} lg={6}>
                <form onSubmit={onSubmit}>
                    <Form.Control className="mb-2" name='title' value={title} onChange={onChangeForm} placeholder='제목을 입력하세요' />
                    <Form.Control className="mb-2" name='body' value={body} onChange={onChangeForm} 
                        placeholder='────────────
                        1️⃣공항픽업 신청서

                        -한글성함 :

                        -항공편 출발 날짜 (도착일X) :
                        -항공편명 :
                        -다낭 공항 도착일 :
                        -도착시간(24시간형식!!) :
                        (짐 찾고, 환전 등 하고 나오셔도 됩니다.
                        항공편 지연 시에도 기사님 대기합니다.)

                        -종료장소(목적지) :

                        -인원(성인/아동) :
                        -차량종류 : 4/ 7/ 16/ 29인승
                        -캐리어 수량(대략) :

                        ────────────' as="textarea" row={50}/>
                    <Button className="px-3" variant="outline-danger" size="sm" >다시쓰기</Button>
                    <Button className='px-3 ms-3' variant="outline-success" size="sm" type='submit'>등록하기</Button>
                </form>
            </Col>
        </Row>
    </div>
  )
}

export default InsertPage