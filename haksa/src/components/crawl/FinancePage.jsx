import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Table, Card, Button } from 'react-bootstrap'
import { FaChartLine } from "react-icons/fa";


const FinancePage = () => {

    


    const [list, setList] = useState([]);


    const callAPI =async () => {
        const res=await axios.get(`/crawl/finance`);
        console.log(res.data);
        setList(res.data);
    }

    useEffect(()=>{
        callAPI();
    },[])


  return (
    <Container>
        <Row className='justify-content-center'>
            <Col lg={5}>
                <Card>
                    <Card.Header>
                        <h1>거래량상위 TOP15 <FaChartLine style={{color:"red"}}/></h1>
                    </Card.Header>
                    <Card.Body>
                        <Table>
                            <thead className='text-center'>
                                <tr>
                                    <td>순위</td>
                                    <td>종목명</td>
                                    <td>가격</td>
                                    <td>상승하락</td>
                                    <td>변동폭</td>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {list.map((fi, index)=>
                                    <tr key={index}>
                                        <td> {index+1}</td>
                                        <td> {fi.title}</td>
                                        <td >{fi.price}</td>
                                        <td >{fi.range.substr(0,2)}</td>
                                        
                                        <td>{
                                            (fi.range.substr(0,2)==="상승" )
                                            ?
                                            <span style={{color:'red'}}>{fi.range.substr(3)}</span>
                                            :
                                            <span style={{color:"blue"}}>{fi.range.substr(3)}</span>}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
  )
}

export default FinancePage