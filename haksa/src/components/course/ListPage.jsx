import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Container, Table, Row, Col, Button } from 'react-bootstrap'
import Pagination from 'react-js-pagination'
import '../../common/Paging.css'
import { Link } from 'react-router-dom';
import { BoxContext } from '../../contexts/BoxContext';


const ListPage = () => {


    const {setBox} = useContext(BoxContext);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [count, setCount] = useState(0);
    const [list, setList] = useState([]);



    const callAPI = async () => {
        const res = await axios.get(`/cou?page=${page}&size=${size}`);
        console.log(res.data)
        setList(res.data.list);
        setCount(res.data.total)
        const last = Math.ceil(res.data.total/size);
        if(page>last) setPage(page-1);
    }

    useEffect(()=>{
        callAPI();
    },[page])


    const onDelete =  (cou) => {
        if(cou.persons > 0){
            setBox({
                show:true,
                message:`${cou.persons}명의 수강신청내력이 존재합니다.`
            });
            return;
        }
        setBox({
            show : true,
            message:`선택하신 강좌는 ${cou.lname}입니다?`,
            action: async ()=>{
                await axios.post(`/cou/delete/${cou.lcode}`)
                .then(()=>{
                    callAPI();
                })
                .catch(err=>console.log(err));
            }
        })
    }

  return (
    <Container>
        <Row>
            <Col>총강좌수 : {count}</Col>
            <Col className='text-end'><Link to='/cou/insert'><Button size='sm' variant='outline-info' >강좌등록하기</Button></Link></Col>
           
         </Row>
        <Table>
           
            <thead>
                <tr>
                    <td>강좌번호</td>
                    <td>강좌이름</td>
                    <td>이수시간</td>
                    <td>강의실</td>
                    <td>총인원</td>
                    <td>현재인원</td>
                    <td>개설학과</td>
                    <td>담당교수</td>
                    <td>삭제</td>
                </tr>
            </thead>    

            <tbody>
                {list.map(cou=>
                    <tr key={cou.lcode}>
                        <td>{cou.lcode}</td>
                        <td><Link to={`/cou/read/${cou.lcode}`}>{cou.lname}</Link></td>
                        <td>{cou.hours}</td>
                        <td>{cou.room}</td>
                        <td>{cou.capacity}</td>
                        <td>{cou.persons}</td>
                        <td>{cou.dept}</td>
                        <td>{cou.instructor}</td>
                        <td><Button variant='outline-danger' onClick={()=>onDelete(cou)}>강좌삭제</Button></td>
                    </tr>
                )}
            </tbody>
        </Table>
        {count > size && 
        <Pagination
        activePage={page}
        itemsCountPerPage={size}
        totalItemsCount={count}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={(e)=>setPage(e)}/>
        }
    </Container>
  )
}

export default ListPage