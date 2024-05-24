import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Card, Row, Col, Button } from 'react-bootstrap'
import { app } from '../../firebaseInit'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import Spinner from 'react-bootstrap/Spinner';

const ReadPage = () => {
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
    <Row className='justify-content-center my-5'>
        <Col>
            <Card>
                <Card.Body>
                    <h5>{title}</h5>
                    <ht/>
                    <div style={{ whiteSpace: "pre-wrap" }}>{body}</div>
                </Card.Body>
                <Card.Footer className='text-muted'>
                    Posted {date} by {email}
                </Card.Footer>
            </Card>
        </Col>
    </Row>
  )
}

export default ReadPage