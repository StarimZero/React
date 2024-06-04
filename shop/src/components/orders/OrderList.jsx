import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, FormCheck, Table } from 'react-bootstrap';
import ModalOrder from './ModalOrder';


const OrderList = () => {


    
    const uid = sessionStorage.getItem("uid");
    const [orders, setOrders] = useState([]);
    const status = ['결제대기', '결제확인', '배송준비', '배송완료', '주문완료'];


    const callAPI = async () =>{
        const res = await axios.get(`/orders/list?uid=${uid}`)
        console.log(res.data);
        setOrders(res.data);
    }

    useEffect(()=>{
        callAPI();
    },[])


  return (
    <div>
        <h1 className='my-5 text-center' >주문목록</h1>
        <Table striped bordered hover variant="dark" size="sm" >
            <thead >
                <tr className='text-center align-middle'>
                    <td><FormCheck/></td>
                    <td>주문번호</td>
                    <td>주문일</td>
                    <td>주문금액</td>
                    <td>전화번호</td>
                    <td>주소</td>
                    <td>상태</td>
                    <td>상세보기</td>
                </tr>
            </thead>
            <tbody>
                {orders.map(order=>
                    <tr key={order.pid} className='text-center align-middle'>
                        <td ><FormCheck/></td>
                        <td style={{fontSize: "18px"}}>{order.pid}</td>
                        <td style={{fontSize: "18px"}}>{order.fmtdate}</td>
                        <td style={{fontSize: "18px"}}>{order.fmtsum}</td>
                        <td style={{fontSize: "18px"}}>{order.phone}</td>
                        <td style={{fontSize: "18px"}}>{order.add1} <br/>{order.add2}</td>
                        <td style={{fontSize: "18px"}}>{status[order.status]}</td>
                        <td style={{fontSize: "18px"}}><ModalOrder pid={order.pid} order={order}/></td>
                    </tr>
                )}
            </tbody>
        </Table>
    </div>
  )
}

export default OrderList