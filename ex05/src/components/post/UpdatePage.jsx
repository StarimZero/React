import React, { useEffect, useState } from "react";
import { app } from "../../firebaseInit";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { Row, Col, Button, Form } from "react-bootstrap";
import {  useNavigate, useParams } from "react-router-dom";

const UpdatePage = () => {
    const navi = useNavigate();
    const db = getFirestore(app);
    const [loading, setLoading] = useState(false);
    const {id} = useParams();
    const [form, setForm] = useState('');
    const {title, body} = form;
    const callAPI = async () => {
        setLoading(true);
        const res = await getDoc(doc(db, `posts/${id}`))
        console.log(res.data());
        setForm(res.data());
        setLoading(false);
    }
    useEffect(()=>{
        callAPI();
    }, []);
    
    const onChangeForm = (e) =>{
        setForm({...form, [e.target.name]:e.target.value});
    }
    
    const onSubmit = async (e) =>{
        e.preventDefault();
        if(!window.confirm(`${id}의 게시글을 수정하시겠습니까?`)) return;
        //게시글수정
        setLoading(true);
        await setDoc(doc(db, `/posts/${id}`), form);
        setLoading(false);
        navi(`/post/read/${id}`)

    }

    if(loading) return <h1>로딩중...</h1>
    return (
        <Row className="justify-content-center my-5"> 
            <Col xs={12} md={10} lg={8}>
                <h1 className="text-center mb-5">게시글 수정</h1>
                <form  onSubmit={onSubmit}>
                    <Form.Control name="title" onChange={onChangeForm} className="mb-2 " value={title}/>
                    <Form.Control name="body" onChange={onChangeForm} as="textarea" rows={10} className="mb-3" value={body} />
                    <div className="text-end">
                        <Button className="px-3" onClick={() => callAPI()}>다시쓰기</Button>
                        <Button className="px-3" variant="secondary ms-2" type="submit">수정하기</Button>
                    </div>
                </form>
            </Col>
        </Row>
    );
};

export default UpdatePage;
