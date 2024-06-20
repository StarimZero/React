import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Table, Button, Card } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'

const ReadPage = () => {

    const [course, setCourse] = useState("");
    const {lcode} = useParams();

    const{lname, room, instructor, pname, persons, capacity} = course
    
    const callAPI  = async () => {
        const res= await axios.get(`/cou/${lcode}`)
        console.log(res.data);
        setCourse(res.data);
    }

    useEffect(()=>{
        callAPI();
    },[])

  return (
    <Container>
        <Row style={{height:"8rem"}}>

        </Row>
        <Row className='justify-content-center'>
            <Col lg={4}>
                <Card>
                    <Card.Header>
                        <h3 className='text-center'>{lcode} - {lname}</h3>
                    </Card.Header>
                    <Card.Body>
                        <Table>
                            <tbody className='text-center'>
                                <tr>
                                    <td>강의번호</td>
                                    <td>{lcode}</td>
                                </tr>
                                <tr>
                                    <td>강좌이름</td>
                                    <td>{lname}</td>
                                </tr>
                                <tr>
                                    <td>강의교수</td>
                                    <td>{instructor}({pname})</td>
                                </tr>
                                <tr>
                                    <td>강의실</td>
                                    <td>{room}</td>
                                
                                </tr>
                                <tr>
                                    <td>현재인원</td>
                                    <td>{persons}</td>                                
                                </tr>
                                <tr>
                                    <td>지도교수</td>
                                    <td>{capacity}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Card.Footer>
                        <Link to={`/cou/update/${lcode}`}><Button variant='outline-info' style={{width:"100%"}}>정보수정</Button></Link>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    </Container>
  )
}

export default ReadPage