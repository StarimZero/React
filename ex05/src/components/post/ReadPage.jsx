import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {Card, Row, Col, Button } from 'react-bootstrap'
import { app } from '../../firebaseInit'
import { getFirestore, doc, getDoc, deleteDoc} from 'firebase/firestore'
import Spinner from 'react-bootstrap/Spinner';
import ListPage from '../comment/ListPage'

const ReadPage = () => {
    const navi = useNavigate();
    const [post, setPost] = useState('');
    const db = getFirestore(app);
    const [loading, setLoading] = useState(false);
    const {id} = useParams();
    const { email, title, body, date} = post;

    const callAPI = async() => {
        setLoading(true);
        const res=await getDoc(doc(db, 'posts', id));
        console.log(res.data());
        setPost(res.data());
        setLoading(false);
      }

      useEffect(()=>{
        callAPI();
      }, []);

      const onClickDelete = async () => {
            if(!window.confirm(`${id}의 게시글을 삭제하시겠습니까?`)) return;
            //게시글삭제
            setLoading(true);
            await deleteDoc(doc(db, `posts/${id}`));
            setLoading(false);
            navi('/post/list')
            alert("삭제완료")
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
    <>
    <Row className='justify-content-center my-5'>
        <h1 className='text-center'> 게시글 정보 </h1>
        <Col>
            <Card>
                <Card.Body>
                    <h5>{title}</h5>
                    <hr/>
                    <div style={{ whiteSpace: "pre-wrap" }}>{body}</div>
                </Card.Body>
                <Card.Footer className='text-muted'>
                    Posted {date} by {email}
                </Card.Footer>
            </Card>
                {email===sessionStorage.getItem("email") &&
                    <div className='text-end my-2'>
                        <Button onClick={()=>navi(`/post/update/${id}`)} variant='success' className='me-2'>수정</Button>
                        <Button variant='danger' onClick={onClickDelete}>삭제</Button>
                    </div>
                }
        </Col>
    </Row>
    {/* 댓글달기의 listPage */}
    <ListPage id={id}/>
    </>
  )
}

export default ReadPage