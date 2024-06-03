import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Card, Button, Tab, Tabs } from 'react-bootstrap'
import { useLocation, useParams } from 'react-router-dom'
import { FaRegThumbsUp } from "react-icons/fa6";
import { FaThumbsUp } from "react-icons/fa6";
import ReviewPage from './ReviewPage';
import ChangePage from './ChangePage';
import { CountContext } from '../CountContext';

const ReadPage = () => {
    
    const {count, setCount} = useContext(CountContext);
    const {pathname} = useLocation();
    console.log(pathname);

    const [book, setBook] = useState({
        bid:"",
        author:"",
        title:"",
        bigimage:"",
        contents:"",
        isbn:"",
        publisher:"",
        updateDate:"",
        regDate:"",
        fmtdate:"",
        price:"",
        fmtprice:"",
        ucnt : "",
        lcnt :""
    });


    const {author, title, bigimage, contents, isbn, publisher, updateDate, regDate, fmtdate, fmtprice, price, ucnt, lcnt} = book;
    const uid = sessionStorage.getItem("uid")
    const {bid} = useParams();
    const callAPI = async () =>{
        const res = await axios.get(`/books/read/${bid}?uid=${uid}`);
        console.log(res.data);
        setBook(res.data);
    }


    useEffect(()=>{
        callAPI();
    },[])


    const onLikeInsert = async (bid) =>{
        if(uid){
            //좋아요 저장하기 
            const res = await axios.post('/books/likes/insert', {bid, uid});
            if(res.data.result===1){
                callAPI();
            }
        }else{
            sessionStorage.setItem("target", pathname);
            window.location.href="/users/login"
        }
    }


    const onLikeDelete = async (bid) =>{
        if(uid){
            const res = await axios.post('/books/likes/delete', {bid, uid});
            if(res.data.result===1){
                callAPI();
            }
        }
    }

    const onClickCart = async () =>{
        if(!sessionStorage.getItem("uid")){
            sessionStorage.setItem("target", pathname);
            window.location.href="/users/login";
        }
        //장바구니넣기
        const res = await axios.post("/cart/insert", {uid:sessionStorage.getItem("uid"), bid});
        let message ="";
        if(res.data.result===1){
            message="장바구니에 넣었습니다."
            setCount(count+1);
        }else{
            message="장바구니에 이미 있는 상품입니다."
        }
        if(window.confirm(`${message} \n쇼핑을 계속 하시겠습니까?`)){
            window.location.href="/";
        }else{
            window.location.href="/orders/cart"
        }

        
    }

  return (
    <Row className='my-5 justify-content-center'>
        <Col>
            <h1 className='text-center'>책번호 : {bid}</h1>
            <Card>
                <Card.Body>
                    <Row>
                        <Col md={6} className='text-center'>
                            <img src={bigimage || '/images/book.png'}/>
                        </Col>
                        <Col  className='align-self-center'>
                            <div>
                                <h5>[{bid}]{title}
                                    {ucnt ===0 ?
                                    <FaRegThumbsUp className='ThumbsN' onClick={()=>onLikeInsert(bid)}/>
                                    :
                                    <FaThumbsUp className='ThumbsF' onClick={()=>onLikeDelete(bid)} />
                                    }
                                    <span>{lcnt}</span>
                                </h5>
                            </div>
                            <div>지은이 : {author}</div>
                            <div>출판사 : {publisher}</div>
                            <div>isbn : {isbn} </div>
                            <div>가격 : {fmtprice}</div>
                            <div>가격 : {price}</div>
                            <div>수정일 : {fmtdate}</div>
                            <div>등록일 : {regDate}</div>
                            <div>머선129 : {updateDate}</div>
                            <div className='text-end mt-2'>
                                <Button size='sm' className='me-2' variant='outline-warning' style={{float: "left"}}>찜하기</Button>
                                <Button size='sm' className='me-2' variant='outline-info' onClick={onClickCart}>장바구니</Button>
                                <Button size='sm' className='' variant='outline-primary'>구매</Button>
                            </div>

                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
        <Row className='my-2'>
            <Col ls={8}>
                <Tabs
                    defaultActiveKey="home"
                    id="justify-tab-example"
                    className="mb-3"
                    justify
                    >
                    <Tab eventKey="home" title="상세정보">
                        {contents}
                    </Tab>
                    <Tab eventKey="profile" title="리뷰">
                        <ReviewPage bid={bid}/>
                    </Tab>
                    <Tab eventKey="longer-tab" title="이벤트">
                        이벤트
                    </Tab>
                    <Tab eventKey="contact" title="교환/반품/품절">
                        <ChangePage/>
                    </Tab>
                </Tabs>
            </Col>
        </Row>
    </Row>
  )
}

export default ReadPage