import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Card, CardBody, CardHeader, Button, CardFooter, Container} from 'react-bootstrap'
import ReplyPage from './ReplyPage';

const ReadPaget = () => {



    const {bid} = useParams();
    const [form, setForm] = useState('');
    
    
    const callAPI = async () =>{
        const res = await axios.get(`/bbs/${bid}`);
        console.log(res.data);
        setForm(res.data);
    }

    useEffect(()=>{
        callAPI();
    },[])


    const onDelete = async () => {
        if(!window.confirm(`${form.bid}번 게시글을 삭제하시겠습니까?`)) return;
        await axios.post(`/bbs/delete/${form.bid}`);
        alert("글 삭제 완료")
        window.location.href="/bbs/list";
    }


  return (
    <Container>
        <div>
            <Row>
                <Col>
                    <Card>
                        <CardHeader className='text-center'>
                            <Row>
                                <Col style={{ width: '90%', flex: '0 0 75%' }} className='text-end'>[{bid}] {form.title} </Col>
                                <Col style={{width: '5%'}} className='text-end'>조회수 : {form.viewcnt}</Col>
                            </Row>
                        </CardHeader>
                        <CardBody style={{whiteSpace:"pre-wrap"}}>
                            {form.contents}
                        </CardBody>
                        <CardFooter>
                            <div className='text-end'>
                                Created by {form.uname} on {form.regDate}
                            </div>
                        </CardFooter>
                    </Card>
                    {sessionStorage.getItem('uid')===form.uid &&
                        <div className='text-end my-3'>
                            <Button variant='outline-danger' className='me-2' size='sm' onClick={onDelete}>삭제하기</Button>
                            <Link to={`/bbs/update/${form.bid}`}><Button variant='outline-info' size='sm'>수정하기</Button></Link>
                        </div>
                    }
                </Col>
            </Row>
        </div>
        <ReplyPage bid={bid}/>
    </Container>
  )
}

export default ReadPaget