import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, Form, Button, InputGroup, Row, Col } from 'react-bootstrap';
import Pagination from "react-js-pagination";
import '../Paging.css';
import ModalOrder from '../orders/ModalOrder';


const OrderList = () => {
    const [count, setCount] = useState(0);
    const [key, setKey] = useState("status");
    const [word, setWord] = useState("");
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState(0);

    const callAPI = async () =>{
        const res = await axios.get(`/orders/adlist?key=${key}&word=${word}&page=${page}&size=${size}`)
        console.log(res.data)
        setOrders(res.data.documents);
        setCount(res.data.count);
    }



    useEffect(()=>{
        callAPI();
    },[page, key, word])

    const onChangeStatus = (e, pid) =>{ //e에 우리가 선택한 value에 있고 pid를 들고오고 
        const data = orders.map(order=>order.pid===pid ? {...order, status:e.target.value} : order);
        setOrders(data);
    }

    const onUpdateStatus = async (pid, status) =>{
        if(!window.confirm(`${pid}번 주문의 상태를 ${status}로 변경하시겠습니까?`)) return;
        const res = await axios.post('/orders/status', {pid, status});
        if(res.data.result===1){
            alert("상태 변경 완료")
        }
    }


    const onSubmit = (e) =>{
        e.preventDefault();
        setPage(1);
        callAPI();
    }
    
    const onSubmitStatus = async (e) =>{
        e.preventDefault();
        const res = await axios.get(`/orders/adlist?key=status&word=${status}&page=${page}&size=${size}`)
        setOrders(res.data.documents)
        setCount(res.data.count);
        setPage(1);
    }
    
    const onChangeKey = (e) =>{
        setKey(e.target.value);
        if(e.target.value==='status'){
            setWord(0);
        }else{
            setWord('');
        }
    }

    const onChangeFormStatus = (e) =>{
          setWord(e.target.value);
          setPage(1);
      };
    


  return (
    <div>
        <h3 className='text-center my-3'>관리자 주문관리페이지</h3>
        <Row className='mb-2'>
            <Col lg={4}>
                <form  onSubmit={onSubmit}>
                    <InputGroup>
                        <Form.Select value={key} onChange={onChangeKey}>
                            <option value="status">주문상태</option>
                            <option value="uid">아이디</option>
                            <option value="uname">이름</option>
                            <option value="phone">전화번호</option>
                            <option value="add1">배송지</option>
                            <option value="pid">ID</option>
                        </Form.Select>
                        {key==='status'?
                        <Form.Select style={{width:"20%"}} value={word} onChange={onChangeFormStatus}>
                            <option value="0">결제대기</option>
                            <option value="1">결제확인</option>
                            <option value="2">배송준비</option>
                            <option value="3">배송완료</option>
                            <option value="4">주문완료</option>
                        </Form.Select>
                        :
                        <Form.Control style={{width:"20%"}} value={word} placeholder='검색어' onChange={(e)=>setWord(e.target.value)}/>
                        }
                        <Button size='sm' type='submit'>검색</Button>
                    </InputGroup>
                </form>
            </Col>
            <Col className='aling-middle mt-2'>
                <span>검색된 주문 : {count}건</span>
            </Col>
        
        </Row>
        <Table striped bordered hover>
            <thead>
                <tr className='text-center'>
                    <td>주문번호</td>
                    <td>주문일</td>
                    <td>주문자</td>
                    <td>전화번호</td>
                    <td>주문금액</td>
                    <td>배송상태</td>
                </tr>
            </thead>
            <tbody>
                    {orders.map(order=>
                        <tr key={order.pid} className='align-middle text-center'>
                            <td style={{fontSize: "17px"}}>{order.pid}</td>
                            <td style={{fontSize: "17px"}} >{order.fmtdate}</td>
                            <td style={{fontSize: "17px"}}>{order.uid}({order.uname})</td>
                            <td style={{fontSize: "17px"}}>{order.phone}</td>
                            <td style={{fontSize: "17px"}}>{order.fmtsum}원</td>
                            <td><ModalOrder pid={order.pid} order={order} /></td>
                            <td >
                                <InputGroup >
                                    <Form.Select value={order.status} style={{fontSize: "18px"}} onChange={(e)=>onChangeStatus(e, order.pid)}>
                                        <option value="0">결제대기</option>
                                        <option value="1">결제확인</option>
                                        <option value="2">배송준비</option>
                                        <option value="3">배송완료</option>
                                        <option value="4">주문완료</option>
                                    </Form.Select>
                                    <Button size='sm' variant='outline-danger' style={{fontSize: "18px"}} onClick={()=>onUpdateStatus(order.pid, order.status)}>변경</Button>
                                </InputGroup>
                            </td>
                        </tr>
                    )}
            </tbody>
        </Table>
        <Pagination
            activePage={page}
            itemsCountPerPage={size}
            totalItemsCount={count}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={(e)=>setPage(e)}/>
    </div>
  )
}

export default OrderList