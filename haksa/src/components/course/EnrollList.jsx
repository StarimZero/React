import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Button, Table } from 'react-bootstrap'
import { BoxContext } from '../../contexts/BoxContext';

const EnrollList = ({lcode}) => {

    const [checked, setChecked] = useState(0);
    const [list, setList] = useState([]);
    const [enroll, setEnroll] = useState([]);
    const {setBox} = useContext(BoxContext);

    useEffect(()=>{
        let cnt=0;
        list.forEach(stu=>stu.checked && cnt++);
        setChecked(cnt);
    }, [list]);

    const callAPI = async () => {
        const res = await axios.get(`/enroll/lcode/${lcode}`);
        const data = res.data.map(stu=>stu && {...stu, num:stu.grade, checked:false});

        console.log(res.data)
        setList(data);
        setEnroll(data);
    }

    useEffect(()=>{
        callAPI();
    },[])

    const onChangeGrade = (e, scode) => {
        let grade=e.target.value.replace(/[^0-9]/g,'');
        if(grade > 100) {
          grade=100;
        }
        const data=list.map(stu=>stu.scode===scode ? {...stu, grade}:stu);
        setList(data);
    }

    const onClickUpdate = (stu) => {
        if(stu.num === stu.grade){
            alert("점수를 수정해주세요");
        }else{
            setBox({
                show : true,
                message:"점수를 수정하시겠습니까?",
                action : async () => {
                    await axios.post(`/enroll/update`, {lcode, scode:stu.scode, grade:stu.grade})
                    alert("수정완료")
                    callAPI();
                }
            })
        }

    }

    const onChangeAll = (e) => {
        const data = list.map(stu=>stu && {...stu, checked:e.target.checked});
        setList(data);
    }

    const onChagneSingle = (e, scode) => {
        const data = list.map(stu=>stu.scode===scode ? {...stu, checked:e.target.checked} : stu);
        setList(data);
    }

    const onClickedUpdate = () => {
        if(checked === 0) {
            setBox({show:true, message:"수정대상이없습니다."}) ;
            return;
        }

        setBox({
            show:true,
            message : "점수를 수정하시겠습니까?",
            action : () => {
                let cnt = 0;
                list.forEach (async stu => {
                    if(stu.checked){
                        await axios.post(`/enroll/update`, {lcode, scode:stu.scode, grade:stu.grade})
                        cnt++
                    }
                    if(cnt===checked) callAPI();
                })

            }
        })
    }

  return (
    <Container>
        <Row className='justify-content-center'>
            <Col lg={6}>
                <h1>수강신청목록</h1>
                <Button onClick={onClickedUpdate}>수정</Button>
                <Table>
                    <thead>
                        <tr>
                            <td><input type='checkbox' onChange={onChangeAll} checked={list.length===checked} /></td>
                            <td>학번</td>
                            <td>이름</td>
                            <td>학과</td>
                            <td>학년</td>
                            <td>지도교슈</td>
                            <td>생일</td>
                            <td>점수</td>
                        </tr>
                    </thead>
                    <tbody>
                    {list && list.map(stu=>
                                <tr key = {stu.scode}>
                                    <td><input type="checkbox" checked={stu.checked} onChange={(e)=>onChagneSingle(e, stu.scode)}  /></td>
                                    <td>{stu.scode}</td>
                                    <td>{stu.sname}</td>
                                    <td>{stu.dept}</td>
                                    <td>{stu.year}</td>
                                    <td>{stu.pname}</td>
                                    <td>{stu.fmtdate}</td>
                                    <td>
                                        <input value={stu.grade} size={3} className='text-end pe-1 me-1' onChange={(e)=>onChangeGrade(e, stu.scode)}/>
                                        <Button variant='outline-primary' size='sm' onClick={()=>onClickUpdate(stu)}>수정</Button>
                                    </td>
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