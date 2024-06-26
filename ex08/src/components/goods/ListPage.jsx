import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Button, Table, Form } from 'react-bootstrap'
import '../../common/Paging.css'
import Pagination from 'react-js-pagination';
import { BoxContext } from '../../common/BoxContext';
import { Link } from 'react-router-dom';

const ListPage = () => {

    const {setBox} = useContext(BoxContext);

    const [chk, setChk] = useState(0);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [goods, setGoods] = useState([]);
    const [count, setCount] = useState(0);

    const callAPI = async () => {
        const res = await axios.get(`/goods/list?page=${page}&size=${size}`);
        if(res.data.total===0){
            setGoods([]);
        }else{
            const data = res.data.list.map(good=>good && {...good, checked:false});
            setGoods(data);
            console.log(res.data);
            setGoods(res.data.list);
            setCount(res.data.total);
            const last = Math.ceil(res.data.total/size);
            if(page>last) setPage(page-1);
        }
    }

    useEffect(()=>{
        let cnt = 0;
        goods.map(good=>good.checked && cnt ++);
        setChk(cnt);
    },[goods])

    useEffect(()=>{
        callAPI();
    },[page])

    const onDelete =  (gid) => {
        setBox({show:true, message:`${gid}번 상품을 삭제하시겠습니까?`, 
            action:async ()=>{
                await axios.post(`/goods/delete/${gid}`);
                callAPI();
                setBox({show:true, message:"상품삭제완료"})
            } 
        })
    }

    const onChangeAll = (e) => {
        const data = goods.map(good=>good && {...good, checked:e.target.checked});
        setGoods(data);
    }

    const onChangeSingle = (e, gid) => {
        const data = goods.map(good=>good.gid===gid ? {...good, checked:e.target.checked}: good);
        setGoods(data);
    }

    const onCheckedDelete = () => {
        if(chk===0){
            alert("삭제할상품을 선택하세요");
            return;
        }
        if(!window.confirm("선택한 상품을 삭제하시겠습니까?")) return;
        let cnt=0;
        goods.forEach(async good=>{
            if(good.checked){
                await axios.post(`/goods/delete/${good.gid}`);
                cnt++;
                if(cnt===chk){
                    alert(`${cnt}개의 상품 삭제완료`)
                    callAPI();
                }
            }
        })
    }

  return (
    <Container>
        <Row>
            <Col>
                <Button variant='outline-danger' onClick={onCheckedDelete}>선택삭제</Button>
            </Col>
            <Col lg={10}>
                <div> 등록상품수 : {count}</div>
            </Col>
        </Row>
        <Row>
            <Col>
                <Table>
                    <thead>
                        <tr>
                            <td><Form.Check onChange={onChangeAll} checked={goods.length===chk}/></td>
                            <td>이미지</td>
                            <td>상품명</td>
                            <td>가격</td>
                            <td>등록일</td>
                            <td>삭제하기</td>
                        </tr>
                    </thead>
                    <tbody>
                        {goods.map(good=>
                            <tr key={good.gid} className='align-middle'>
                                <td><Form.Check checked={good.checked} onChange={(e)=>onChangeSingle(e, good.gid)}  /></td>
                                <td><Link to={`update/${good.gid}`}><img src={good.image || "http://via.placeholder.com/150x150"} width={"150px"}/></Link></td>
                                <td><div>{good.title}</div> </td>
                                <td> {good.fmtprice}원</td>
                                <td>{good.fmtdate}</td>
                                <td ><Button variant='outline-danger' onClick={()=>onDelete(good.gid)}>상품삭제</Button></td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Col>
        </Row>
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