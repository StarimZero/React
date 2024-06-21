import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Button, Col, Table, Card, Form } from 'react-bootstrap'
import { BoxContext } from '../../contexts/BoxContext';

const EnrollList = ({list, scode, callCourses}) => {

    const {setBox} = useContext(BoxContext);

    const [cous, setCous] = useState([]);
    //const [lcode, setLcode] = useState("");
    const [cou, setCou]  = useState("");
    const callAPI = async () => {
        const res = await axios.get(`/cou?page=1&size=100`);
        console.log(res.data.list)
        setCous(res.data.list)
    }

    useEffect(()=>{
        callAPI();
    },[])
    

    const onInsert = async () => {
        if(cou.lcode===undefined){
            setBox({show:true, message:"강좌를 선택하세요"});
            return;
        }
        if(cou.persons >= cou.capacity){
            setBox({show:true, message:"수강신청이 마감되었습니다."});
            return;

        }
        setBox({show:true, message:`${cou.lname} 강좌를 수강신청 하시겠습니까?`, 
            action:async () => {
                
                const check = await axios.post(`/enroll/insert`, {lcode : cou.lcode, scode : cou.scode})
                console.log(check.data)
                if(check.data===0){
                    setBox({show:true, message:"수강신청완료"})
                    callCourses();
                    callAPI();
                }else{
                    alert("이미수강신청하였습니다.")
                }
            }
        })
    }

    const onDelete = (lcode, lname) => {
        setBox({
            show :true, 
            message : `${lname}강좌 수강취소?`, 
            action: async () => {
            await axios.post(`/enroll/delete`, {lcode, scode});
            callAPI();
            callCourses();
            }
        });
    }



  return (
    <Container>
        <Row className='justify-content-center'>
            <Col lg={8}>
            <h5 className='text-center'>수강신청목록</h5>
                <Row className='justify-content-center'>
                    <Col>
                        <Card>
                            <Form.Select onChange={(e)=>setCou(JSON.parse(e.target.value))}>
                                <option>강좌를 선택해주세요</option>
                                {cous.map(cou=>
                                    <option key={cou.lcode} value={JSON.stringify(cou)} >
                                        강좌이름 : {cou.lname}({cou.lcode}) 교수 : {cou.pname} 수강인원 : {cou.persons} / {cou.capacity}
                                    </option>
                                )}
                            </Form.Select>
                        </Card>
                    </Col>
                    <Col lg={2}>
                        <Button onClick={onInsert}>수강신청</Button>
                    </Col>
                </Row>
                <Table>
                    <thead>
                        <tr>
                            <td>강좌번호</td>
                            <td>강좌이름</td>
                            <td>강의교수</td>
                            <td>강의실</td>
                            <td>수강인원</td>
                            <td>시수</td>
                            <td>등록일</td>
                            <td>개설학과</td>
                            <td>내점수</td>
                            <td>수강취소</td>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map(cou=>
                            <tr key={cou.lcode}>
                                <td>{cou.lcode}</td>
                                <td>{cou.lname}</td>
                                <td>{cou.pname}({cou.instructor})</td>
                                <td>{cou.room}호</td>
                                <td>{cou.persons}/{cou.capacity}명</td>
                                <td>{cou.hours}</td>
                                <td>{cou.fmtdate}</td>
                                <td>{cou.dept}</td>
                                <td>{cou.grade}</td>
                                <td><Button variant='outline-danger' size='sm' onClick={()=>onDelete(cou.lcode, cou.lname)}>취소</Button></td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Col>
        </Row>
    </Container>
  )
}

export default EnrollList