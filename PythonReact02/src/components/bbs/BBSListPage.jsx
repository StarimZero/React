import React, { useEffect, useState } from 'react'
import '../Paging.css'
import axios from 'axios'
import {Button, Col, Row, Table} from 'react-bootstrap'
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';

const ListPage = () => {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);
    const [count, setCount] = useState();

    const callAPI = async () => {
        const res = await axios.get(`/bbs/?page=${page}&size=${size}`)
        console.log(res.data)
        setList(res.data.list);
        setCount(res.data.total);
        
    }
    

    useEffect(()=>{
        callAPI();
    },[page])

    return (
        <>
            <Row>
                <Col>
                    <div>글갯수 : {count}</div>
                </Col>
            </Row>
            <Row>
                
                <Col>
                    <Table>
                        <thead>
                            <tr>
                                <td>번호</td>
                                <td>제목</td>
                                <td>글쓴이</td>
                                <td>글쓴날</td>
                                <td>조회수</td>
                            </tr>
                        </thead>
                        <tbody>
                            {list && list.map(bbs=>
                                <tr key={bbs.bbs_id} >
                                    <td>{bbs.bbs_id}</td>
                                    <td><Link to = {`/bbs/${bbs.bbs_id}`} style={{ textDecoration: 'none', color: '#D492d2' }}>{bbs.bbs_title}</Link></td>
                                    <td>{bbs.bbs_writer}</td>
                                    <td>{bbs.fmtdate}</td>
                                    <td>{bbs.bbs_viewcnt}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
                
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
            </Row>
            <Link to = "/bbs/insert"><Button>글쓰기</Button></Link>
        </>
        
    )
}

export default ListPage