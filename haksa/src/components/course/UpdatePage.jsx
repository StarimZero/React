import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Form, Card, Table, Row, Col, InputGroup } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { BoxContext } from '../../contexts/BoxContext';






const UpdatePage = () => {

    const {setBox} = useContext(BoxContext);
    const navi = useNavigate();
    const [list, setList] = useState([]);
    const [form, setForm] = useState("");
    const [course, setCourse] = useState("");
    const {lname, room, instructor, pname, persons, capacity, dept, hours} = form;


    const {lcode} = useParams();

    const callAPI = async () => {
        const res = await axios.get(`/cou/${lcode}`);
        console.log(res.data);
        setCourse(res.data);
        setForm(res.data);

        const res1 = await axios.get(`/pro?page=1&size=100&word=`)
        console.log(res1.data.list);
        setList(res1.data.list)

    }



    const onChangeForm = (e) => {
        setForm({...form, [e.target.name]:e.target.value});
    }

    const onClickCancel = () => {
        if(JSON.stringify(course)===JSON.stringify(form)) return;
        setBox({
            show: true,
            message : "데이터가 초기화됩니다.",
            action : ()=> setForm(course)
        });
    }

    const onClickUpdate = () => {
        if(JSON.stringify(course)===JSON.stringify(form)) return;
        setBox({
            show: true,
            message : "정보가 수정됩니다.",
            action :  async ()=> {
                await axios.post(`/cou/update`, form)
                navi(`/cou/read/${lcode}`);
            }
        })
    }

    useEffect(()=>{
        callAPI();
    },[])

  return (
    <Container>
        <Row className='justify-content-center'>
            <Col lg={4}>
                <Card>
                    <Card.Header>
                        <h3 className='text-center'>{lcode}강좌정보수정</h3>
                    </Card.Header>
                    <Card.Body>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>강좌이름</InputGroup.Text>
                            <Form.Control  value={lname} name='lname' onChange={onChangeForm} />
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>개설학과</InputGroup.Text>
                            <Form.Control value={dept} name="dept" readonly/> 
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>강의교수</InputGroup.Text>
                            <Form.Select value={instructor} name="instructor" onChange={onChangeForm}>
                                {list.map(pro=>
                                    <option key={pro.pcode} value={pro.pcode}>{pro.pname} : {pro.dept} </option>
                                )}
                            </Form.Select>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>강의실은</InputGroup.Text>
                            <Form.Control name="room" value={room} onChange={onChangeForm} />
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>최대인원</InputGroup.Text>
                            <Form.Control name='capacity' value={capacity} onChange={onChangeForm}/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>강의시수</InputGroup.Text>
                            <Form.Control name='hours' value={hours} onChange={onChangeForm}/>
                        </InputGroup>
                        <div className='text-end'>
                            <Button onClick={onClickCancel} className='me-2'>다시쓰기</Button>
                            <Button onClick={onClickUpdate}>수정하기</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
  )
}

export default UpdatePage