import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Form, InputGroup, Button } from 'react-bootstrap'
import Pagination from 'react-js-pagination';
import './Paging.css'
import { FaRegThumbsUp } from "react-icons/fa6";
import { FaThumbsUp } from "react-icons/fa6";






const HomePage = () => {

    const uid = sessionStorage.getItem("uid");
    const [count, setCount] = useState(0);
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(6);
    const [key, setKey] = useState('title');
    const [word, setWord] = useState('');
    const callAPI = async () =>{
        const res = await axios.get(`/books/list?page=${page}&size=${size}&key=${key}&word=${word}&uid=${uid}`)
        console.log(res.data);
        setBooks(res.data.documents);
        setCount(res.data.count);
    }

    useEffect(()=>{
        callAPI();
    },[page])

    const onSubmit = (e) =>{
        e.preventDefault();
        setPage(1);
        callAPI();
    }    

    const onClickLike = async (bid) =>{
        if(uid){
            //떰즈업저장
            const res = await axios.post("/books/likes/insert", {uid, bid});
            //alert(res.data.result)
            callAPI();
        }else{
            window.location.href="/users/login"
        }
    }

    const onClickCancel = async (bid) =>{
        const res = await axios.post("/books/likes/delete", {uid, bid});
        if(res.data.result===1){
            callAPI();
        }
        
    }

    return (
        <div className='my-4'>
            <Row className='justify-content-end'>
                <Col lg={8}>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Select value={key} onChange={(e)=>setKey(e.target.value)} style={{width:"20px"}}>
                                <option value="title">제목</option>
                                <option value="author">저자</option>
                                <option value="publisher">출판사</option>
                            </Form.Select>
                            <Form.Control placeholder='검색어를 입 력  하  세 ' value={word} onChange={(e)=>setWord(e.target.value)} style={{width:"45%"}}></Form.Control>
                            <Button size="sm" variant='outline-info' type='submit'>검색</Button>
                            <span className='my-2 ms-2'>검색된 도서의 수 : {count}</span>
                        </InputGroup>
                    </form>
                </Col>
                <Col>
                </Col>

            </Row>
            <Row className='my-3'>
                {books.map(book=>
                    <Col key={book.bid} xs={6} lg={2}>
                        <Card>
                            <Card.Body>
                                <a href={`/books/read/${book.bid}`}>
                                <img src={book.image} width="100%" ucnt={book.ucnt} lcnt={book.lcnt}/>
                                </a>
                            </Card.Body>
                            <Card.Footer>
                                <Row>
                                    <Col className='ellipsis1' style={{fontSize:"16px"}} lg={12}>                                        
                                        {book.title}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{fontSize:"15px"}} lg={12}>
                                        가격 : {book.fmtprice}원
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='ellipsis1' style={{fontSize:"15px"}} lg={12}>
                                        저자 : {book.author}원
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {book.ucnt === 0 ? 
                                        <FaRegThumbsUp className='ThumbsN' size="80%" onClick={()=>onClickLike(book.bid)}/>
                                        :
                                        <FaThumbsUp className='ThumbsF'size="80%" onClick={()=>onClickCancel(book.bid)} />
                                        }
                                        <span style={{fontSize: "40px"}}className='align-middle'>{book.lcnt}</span>
                                    </Col>
                                </Row>
                            </Card.Footer>
                        </Card>
                    </Col>
                )}
            </Row>
                {count > size &&
                <Pagination
                activePage={page}
                itemsCountPerPage={size}
                totalItemsCount={count}
                pageRangeDisplayed={5}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={(e)=>setPage(e)}/>
                }
        </div>
    )
}

export default HomePage