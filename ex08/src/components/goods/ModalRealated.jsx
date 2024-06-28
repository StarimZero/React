import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Container, Row, Table, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalRealated = ({gid, callRelated}) => {
    const [show, setShow] = useState(false);
    const [list, setList] = useState([]);

    const handleClose = () => {
        setShow(false);
        callRelated();
    }
    const handleShow = () => setShow(true);


    useEffect( ()=>{
        axios.get(`/goods/list?page=1&size=10`)
        .then(res => setList(res.data.list))
    },[])
        console.log(list);

    const onClickInsert = async (rid) => {
        const res = await axios.post(`/goods/related/insert`, {gid, rid});
        console.log(res.data)
        if(res.data===0){
            alert("관련삼품등록완료")
        }else{
            alert("이미 관련상품으로 등록된 상품입니다.")
        }

    }



  return (
    <>
        <Button variant="primary" onClick={handleShow}>관련상품등록</Button>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size='xl'
        >
            <Modal.Header closeButton>
                <Modal.Title>관련상품찾기</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            <Table>
                                <thead>
                                    <tr>
                                        <td>id</td>
                                        <td>이름</td>
                                        <td>가격</td>
                                        <td>등록</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list.length > 0 && list.map(goods=>
                                        <tr key={goods.gid}>
                                            <td>{goods.gid}</td>
                                            <td>{goods.title}</td>
                                            <td>{goods.fmtprice}원</td>
                                            <td><Button size='sm' variant='outline-warning' onClick={()=>onClickInsert(goods.gid)}>상품등록</Button></td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleClose}>닫기</Button>
            </Modal.Footer>
        </Modal>
    </>
  );
}

export default ModalRealated