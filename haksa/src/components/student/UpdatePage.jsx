import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Form, Card, Table, Row, Col, InputGroup } from 'react-bootstrap'
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BoxContext } from '../../contexts/BoxContext';


const UpdatePage = () => {

    const navi = useNavigate();

    const {setBox} = useContext(BoxContext);

    const {scode} = useParams();
    
    
    const [list, setList] = useState([]);
    const [form, setForm] = useState("");
    const [student, setStudent] = useState("");
    const {sname, dept, birthday, advisor, year} = form;





    const callAPI= async () => {

        const res = await axios.get(`/stu/${scode}`);
        console.log(res.data)
        setForm(res.data);
        setStudent(res.data);

        const res1 = await axios.get(`/pro?page=1&size=100&word`);
        console.log(res1.data.list);
        setList(res1.data.list);

    }

    const onChangeForm = (e) => {
        setForm({...form, [e.target.name]:e.target.value});
    }


    const onClickCancel = () => {
        if(JSON.stringify(student)===JSON.stringify(form)) return;
        setBox({
            show: true,
            message : "데이터가 초기화됩니다.",
            action : ()=> setForm(student)
        });
    }

    const onClickUpdate = () => {
        if(JSON.stringify(student)===JSON.stringify(form)) return;
        setBox({
            show: true,
            message : "정보가 수정됩니다.",
            action :  async ()=> {
                await axios.post(`/stu/update`, form)
                navi(`/stu/read/${scode}`);
            }
        })
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
                        <h3 className='text-center'>{scode} 학생정보수정</h3>
                    </Card.Header>
                    <Card.Body>
                        <InputGroup className='mb-2'>
                            <InputGroupText>이름이용</InputGroupText>
                            <Form.Control value={sname} name="sname" onChange={onChangeForm}/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroupText>학번이용</InputGroupText>
                            <Form.Control value={scode} readOnly/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroupText>학과에용</InputGroupText>
                            <Form.Select value={dept} readOnly>
                                <option value="전산">컴퓨터공학과</option>
                                <option value="전자">전기공학과</option>
                                <option value="건축">건축공학과</option>
                                <option value="생명">생명공학과</option>
                                <option value="경제">경제학과</option>
                            </Form.Select>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroupText>생년월일</InputGroupText>
                            <Form.Control value={birthday || '2005-01-01'} type='date' name="birthday" onChange={onChangeForm}/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroupText>학년은요</InputGroupText>
                            <Form.Control value={year} type="number" name="year" onChange={onChangeForm}/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroupText>지도교수</InputGroupText>
                            <Form.Select value={advisor} name="advisor" onChange={onChangeForm}>
                                {list.map(pro=>
                                   <option value={pro.pcode} key={pro.pcode}>{pro.pname} ({pro.pcode}:{pro.dept})</option>
                                )}
                            </Form.Select>
                        </InputGroup>
                        <div className='text-end mt-3'>
                            <Button className='me-2' variant='outline-danger' size="sm"onClick={onClickCancel}>취소하기</Button>
                            <Button variant='outline-success' size="sm" onClick={onClickUpdate}>수정하기</Button>
                        </div>
                    </Card.Body>
                    <Card.Footer>
                        발
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    </Container>
  )
}

export default UpdatePage