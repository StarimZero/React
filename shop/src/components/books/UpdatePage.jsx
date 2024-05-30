import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Row, Col, Form, InputGroup, Card, Button} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import ModalImage from './ModalImage';


const UpdatePage = () => {

    const {bid} = useParams();
    const [form, setForm] = useState({
        bid : bid,
        title:"",
        contents :"",
        author : "",
        price : "",
        imgae : "",
        fmtdate :"",
        bigimage : ""
    });
    const {title, contents, author, image, fmtdate, price, bigimage} = form; //비구조할당

    
    const callAPI = async () =>{
        const res =  await axios.get(`/books/read/${bid}`);
        console.log(res.data);
        setForm(res.data);
    }

    useEffect(()=>{
        callAPI();
    },[])

    const onChangeForm = (e) =>{
        setForm({...form, [e.target.name]: e.target.value})
    }

    const onUpdate = async () =>{
        if(!window.confirm("도서정보를 수정하시겠습니까?")) return;
        //수정하기
        const res = await axios.post('/books/update', form);
        if(res.data.result===1){
            alert("도서정보수정 완료.")
            callAPI();
        }else{
            alert("도서정보수정에 실패했습니다.")
            console.log(res.data.result)
        }
    }

    const onChagePrice = (e) => {
        const result=e.target.value.replace(/[^0-9]/g,'');
        setForm({...form, price:result})  
      }
      

    return (
        <Row className='justify-content-center my-5'>
            <Col lg={8}>
                <Card>
                    <Card.Header>
                        <h3 className='text-center mt-2'>도서정보수정[{bid}]</h3>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col lg={2} className='my-4'>
                                <ModalImage bigimage={bigimage} callAPI={callAPI} bid={bid} />
                            </Col>
                            <Col className='my-3'>
                                <form>
                                    <InputGroup className='mb-2'>
                                        <InputGroup.Text>도서제목</InputGroup.Text>
                                        <Form.Control onChange={onChangeForm} name='title' value={title} />
                                    </InputGroup>
                                    <InputGroup className='mb-2'>
                                        <InputGroup.Text >도서가격</InputGroup.Text>
                                        <Form.Control onChange={onChagePrice} name='price' value={price} />
                                    </InputGroup>
                                    <InputGroup className='mb-2'>
                                        <InputGroup.Text>도서저자</InputGroup.Text>
                                        <Form.Control onChange={onChangeForm} name='author' value={author} />
                                    </InputGroup>
                                </form>
                            </Col>
                            <div className='p-3'>
                                    <Form.Control onChange={onChangeForm} name='contents' value={contents} as="textarea" rows={10}/>
                            </div>
                            <Col>
                                <div className='align-middle'>
                                    {fmtdate &&
                                    <span>수정일: {fmtdate}</span>}
                                </div>
                            </Col>
                            <Col>
                                <div className='text-end'>
                                    <Button className='me-2' size='sm' variant='outline-danger' onClick={callAPI}>다시쓰기</Button>
                                    <Button variant='outline-primary' size='sm' onClick={onUpdate}>정보수정</Button>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default UpdatePage