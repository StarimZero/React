import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Table, Row, Col, InputGroup, FormControl, Button, Form } from 'react-bootstrap';
import '../Paging.css';
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';

const ListPage = () => {

    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [key, setKey] = useState("title");
    const [word, setWord] = useState("");
    const [count, setCount] = useState("0");

    const callAPI = async () => {
        const res = await axios.get(`/bbs/list.json?key=${key}&word=${word}&page=${page}&size=${size}`)
        console.log(res.data);
        setList(res.data.documents);
        setCount(res.data.total);
    }

    useEffect(()=>{
        callAPI();
    },[page]);

    const onSubmit = (e) => {
        e.preventDefault();
        callAPI();
        
    }

  return (
    <div className='my-5'>
        <h1 className='text-center '>게시판리스트</h1>
        <Row>
            <Col className='mb-2' lg={8}>
                <form onSubmit={onSubmit}>
                    <InputGroup>
                        <Form.Select value={key} onChange={(e)=>setKey(e.target.value)}>
                            <option value="title">제목</option>
                            <option value="contents">내용</option>
                            <option value="uid">아이다</option>
                            <option value="uname">이름</option>
                        </Form.Select>
                        <FormControl placeholder='검색어를 입력하세요' value={word} onChange={(e)=>setWord(e.target.value)}/>
                        <Button type="submit" size="sm" variant='outline-primary'>검색</Button>
                    </InputGroup>
                </form>
            </Col>
            <Col>
                <div className='align-middle mt-2'>
                    <span className='me-3'>검색수 : {count}</span>
                </div>
            </Col>
            <Col className='text-end'>
            {sessionStorage.getItem('uid') && 
                <Link to="/bbs/insert"><Button size='sm' variant='outline-info'>글쓰기</Button></Link>
            }
            </Col>
        </Row>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr className='text-center'>
                    <td style={{fontSize: "20px"}}>글번호</td>
                    <td style={{fontSize: "20px"}}>제목</td>
                    <td style={{fontSize: "20px"}}>작성자</td>
                    <td style={{fontSize: "20px"}}>작성일</td>
                    <td style={{fontSize: "20px"}}>조회수</td>
                </tr>
            </thead>
            <tbody>
                {list.map(bbs=>
                    <tr key={bbs.bid}>
                        <td width="6%" >{bbs.bid}</td>
                        <td width="60%">
                            <div className='ellipsis1'>
                            <a href={`/bbs/read/${bbs.bid}`} style={{ textDecoration: 'none', color: 'white' }}>
                            {bbs.title} ({bbs.replycnt})
                            </a>
                            </div>
                        </td>
                        <td width="6%">{bbs.uid}</td>
                        <td width="22%"><div className='ellipsis1'>{bbs.fmtdate}</div></td>
                        <td width="6%" className='text-center'>{bbs.viewcnt}</td>
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
       
    </div>
  )
}

export default ListPage