import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Table } from 'react-bootstrap';

const ModalOrder = ({pid, order}) => {

    const [books, setBooks] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const callAPI = async () => {
        const res = await axios.get(`/orders/books?pid=${pid}`);
        console.log(res.data)
        setBooks(res.data);
    }


    useEffect(()=>{
        callAPI();
    },[])



  return (
    <>
      <Button variant="outline-warning" onClick={handleShow} size='sm'>
        주문상품
      </Button>

      <Modal style={{top:"10%"}}
        show={show} size='lg'
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>주문상품</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>주문번호 : {pid}</div>
            <div>배송지 : {order.add1} {order.add2}</div>
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
                        <tr>
                            <td style={{fontSize: "17px"}}>{book.bid}</td>
                            <td style={{fontSize: "17px"}}><img src={book.image} width="30px" /> {book.title}</td>
                            <td style={{fontSize: "17px"}}>{book.fmtprice}원</td>
                            <td style={{fontSize: "17px"}}>{book.qnt}개</td>
                            <td style={{fontSize: "17px"}}>{book.fmtsum}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalOrder