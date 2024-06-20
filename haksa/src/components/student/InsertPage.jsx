import React, {useState, useContext, useEffect} from 'react'
import {Button, Row, Col, Card, InputGroup, Form} from 'react-bootstrap'
import { BoxContext } from '../../contexts/BoxContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const InsertPage = () => {

    const [list, setList] = useState();

    const navi = useNavigate();
    const {setBox} = useContext(BoxContext);
    const [sname, setSname] = useState("");
    const [dept, setDept] = useState("경제");





    const callAPI= async () => {

        const res = await axios.get(`/pro?page=1&size=100&word=`);
        console.log(res.data.list);
        setList(res.data.list);

    }

    useEffect(()=>{
        callAPI();
    },[])




    const onSubmit = async () => {
        if(sname==""){
            setBox({
                show:true,
                message:"학생이름을 입력하세요"
            });
        }
        console.log(sname,dept);
        await axios.post(`/stu/insert`, {dept, sname})
        setBox({show:true, message:"학생등록완료.... 리스트로이동하시겠습니까?", action : ()=>navi("/stu/list")})
    }

  return (

    <div>    
        <Row className='justify-content-center'>
            <Col lg={3}>
                <Card>
                    <Card.Header>
                        <h1 className='text-center'>학생등록</h1>
                    </Card.Header>
                    <Card.Body>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>학생학과</InputGroup.Text>
                            <Form.Select value={dept} onChange={(e)=>setDept(e.target.value)}>
                                <option value="전산">컴퓨터공학과</option>
                                <option value="전자">전기공학과</option>
                                <option value="건축">건축공학과</option>
                                <option value="생명">생명공학과</option>
                                <option value="경제">경제학과</option>
                            </Form.Select>
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text>학생이름</InputGroup.Text>
                            <Form.Control value={sname} onChange={(e)=>setSname(e.target.value)}/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                        </InputGroup>
                    </Card.Body>
                    <Card.Footer>
                        <div className='text-end'>
                            <Button variant='outline-primary' onClick={onSubmit}>등록하기</Button>
                        </div>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default InsertPage