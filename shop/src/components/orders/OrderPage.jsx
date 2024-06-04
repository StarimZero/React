import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, Card, Form, Button, InputGroup } from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert';
import ModalAddress from '../users/ModalAddress';
import { v4 } from 'uuid'


const OrderPage = ({books, setBooks}) => {

    const [total, setTotal] = useState(0);
    const uuid= v4();
    const pid = uuid.substring(0, 13)
    const [form, setForm] = useState({
        uid :"",
        uname : "",
        phone : "",
        add1 : "",
        add2 : ""
    })
    const {uid, uname, phone, add1, add2} = form;
    const callAPI = async () =>{
        const res = await axios.get(`/users/read/${sessionStorage.getItem("uid")}`);
        setForm(res.data)
    }

    useEffect(()=>{
        callAPI();
    },[])



    useEffect(()=>{
        const data=books.filter(book=>book.checked);
        let totalSum=0;
        data.forEach(book=>{
            if(book.checked) totalSum+=book.price*book.qnt;
        })
        setTotal(totalSum);
        setBooks(data);
    },[]);

    const onChangeForm = (e) =>{
        setForm({...form, [e.target.name]:e.target.value});
    }

    const onClickOrder = async () =>{
        if(!window.confirm(`${books.length}개 도서를 주문하시겠습니까?`)) return;
        //주문자정보
        const res = await axios.post('/orders/purchase', {
            ...form, sum:total, pid, uid});// 주문자정보입력
        if(res.data.result===1){
            alert("주문자정보저장완료")
            books.forEach(async book=>{
                const res = await axios.post('/orders/insert', {
                    pid, bid:book.bid, price:book.price, qnt:book.qnt}); //주문상품입력
                if(res.data.result===1){
                    await axios.post("/cart/delete", {uid, bid:book.bid}); //장바구니에서 삭제
                }
            });
            // alert("주문이 완료되었습니다.")
            // window.location.href="/";
            setTimeout(() => {
                alert('주문이 완료되었습니다.');
                window.location.href = '/';
            }, 500);
        }else{
            alert("주문자 정보 저장 오류")
        }
    }


  return (
    <div>
        <h1 className='text-center'>주문하기</h1>
        <div>주문 아이디 : {pid}</div>
        <Table striped bordered hover variant="dark" sizme="sm">
            <thead>
                <tr>
                    <td>ID</td>
                    <td>제목</td>
                    <td>가격</td>
                    <td>수량</td>
                    <td>금액</td>
                </tr>
            </thead>
            <tbody>
                {books.map(book=>
                    <tr key={book.bid}>
                        <td>{book.bid}</td>
                        <td>
                            <img src={book.image} width="30px"/>
                            <span className='mx-2'>{book.title}</span>
                        </td>
                        <td>{book.fmtprice}원</td>
                        <td>{book.qnt}개</td>
                        <td>{book.sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</td>
                    </tr>
                )}
            </tbody>
        </Table>
        <>
            {[
                'primary',
            ].map((variant) => (
                <Alert key={variant} variant={variant} className='text-end my-1'>
                    <sapn>총합계  = {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</sapn>
                </Alert>
            ))}
        </> 
            <Card>
                <Card.Header>
                    <h3 className='text-center mt-1'>주문자정보</h3>
                </Card.Header>
                <Card.Body>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>주문자명</InputGroup.Text>
                        <Form.Control name='uname' value={uname} onChange={onChangeForm}/>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>전화번호</InputGroup.Text>
                        <Form.Control name='phone' value={phone} onChange={onChangeForm}/>
                    </InputGroup>  
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>배송주소</InputGroup.Text>
                        <Form.Control name='add1' value={add1} onChange={onChangeForm}/>
                        <ModalAddress form={form} setForm={setForm}  />
                    </InputGroup>
                    <Form.Control placeholder='상세주소를 입력하세요' name='add2' value={add2} onChange={onChangeForm}/>   
                </Card.Body>
            </Card>
        <div className='text-end'>
            <Button className='mt-2 me-2'variant='danger' size='sm'>다시쓰기</Button>
            <Button className='mt-2'variant='warning' size='sm' onClick={onClickOrder}>결제하기</Button>
        </div>
    </div>
  )
}

export default OrderPage