import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Card, Row, Col, Table, Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import EnrollList from './EnrollList';


const ReadPage = () => {

    const {scode} = useParams();


    const [student, setStudent] = useState("");
    const {sname, dept, birthday, advisor, year, pname} = student;
    const [list, setList] = useState([]);

    const callAPI= async () => {
        const res = await axios.get(`/stu/${scode}`);
        console.log(res.data)
        setStudent(res.data);
        callCourses();

    }

    const callCourses = async () => {
        const res1 = await axios.get(`/enroll/scode/${scode}`)
        console.log(res1.data)
        setList(res1.data);
    }

    
    useEffect(()=> {
        callAPI();
    },[])



  return (
    <Container>
        <Row className='justify-content-center'>
            <Col lg={4}>
                <Card>
                    <Card.Header>
                        <h3 className='text-center'>{scode} 학생정보</h3>
                        
                    </Card.Header>
                    <Card.Body>
                        <Table>
                            <tbody className='text-center'>
                                <tr>
                                    <td>학번</td>
                                    <td>{scode}</td>
                                </tr>
                                <tr>
                                    <td>이름</td>
                                    <td>{sname}</td>
                                </tr>
                                <tr>
                                    <td>생년월일</td>
                                    <td>{birthday}</td>
                                </tr>
                                <tr>
                                    <td>학년</td>
                                    <td>{year}</td>
                                </tr>
                                <tr>
                                    <td>학과</td>
                                    <td>{dept}</td>
                                </tr>
                                <tr>
                                    <td>지도교수</td>
                                    <td>{pname}{advisor}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Card.Footer>
                        <Link to ={`/stu/update/${scode}`}><Button style={{width:"100%"}} variant='warning'>정보수정하기</Button></Link>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
        <hr/>
        <Row>
            <Col>
                <EnrollList list={list} scode={scode} callCourses={callCourses}/>
            </Col>
        </Row>
    </Container>
  )
}

export default ReadPage