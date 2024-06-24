import React, { useContext, useState } from 'react'
import { Container, Row, Col, Card, Button, InputGroup, Form, Table } from 'react-bootstrap'
import { BoxContext } from '../../contexts/BoxContext';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';


const Gmarket = () => {

    const [loading, setLoading] = useState(false);
    const {setBox} = useContext(BoxContext);
    const [query, setQuery] = useState("");
    const [list, setList] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault();
        if(query===""){
            setBox({show:true, message:"검색어를 입력하세요"}); return;
        }
        setLoading(true);
        const res = await axios.get(`/crawl/gmarket?query=${query}`);
        console.log(res.data);
        setList(res.data);
        setLoading(false);
    }



    if(loading) return (
        <div className='text-center' style={{fontSize:"150px"}}>
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
        </div>
      );
  return (
    <Container>
        <div className='text-center'>
            <h1>상품검색하기</h1>
        </div>
        <Row className='justify-content-center'>
            <Col lg={4} className='mt-2'>
                <form onSubmit={onSubmit}>
                    <InputGroup>
                        <Form.Control placeholder = "검색어를 입력하세요" value={query} onChange={(e)=>setQuery(e.target.value)}/>
                        <Button type='submit'>검색</Button>
                    </InputGroup>
                </form>
            </Col>
            <hr/>
            <Row className='justify-content-center' >
                <Col lg={10} >
                    <Table className='mt-3'>
                        <thead className='text-center'>
                            <tr>
                                <td>상품코드</td>
                                <td>상품명</td>
                                <td>가격</td>
                                <td>이미지</td>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {list.map((pro)=>
                                <tr key={pro.code}>
                                    <td>{pro.code}</td>
                                    <td>{pro.title}</td>
                                    <td>{pro.price}</td>
                                    <td><img src={pro.image} width={"50%"}/></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Row>
    </Container>
  )
}

export default Gmarket