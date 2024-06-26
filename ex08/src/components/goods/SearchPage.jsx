import React from 'react'
import { useState, useContext } from 'react';
import { Container, Row, Col, Table, Button, Form, InputGroup } from 'react-bootstrap'
import axios from 'axios'
import { useEffect } from 'react';
import Pagination from 'react-js-pagination';
import '../../common/Paging.css'
import { BoxContext } from '../../common/BoxContext';

const SearchPage = () => {

    const {setBox} = useContext(BoxContext);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("윈터트러플");
    const [goods, setGoods] = useState([]);
    const [size] = useState(5);
    const [count, setCount] = useState(0);
    const [checked, setChecked] = useState(0);

    const callAPI = async () => {
        const res = await axios.get(`/goods/search?query=${query}&page=${page}&size=${size}`)
        console.log(res.data)
        setGoods(res.data.items);
        const data = res.data.items.map(good => good && {...good, checked:false, title:removeTags(good.title)});
        setGoods(data);
        setCount(res.data.total > 100 && 100);
    }

    useEffect(()=>{
        let cnt=0;
        goods.map(good=>good.checked && cnt++);
        setChecked(cnt);
    },[goods])

    useEffect(()=>{
        callAPI();
    },[page])


    const onSubmit = (e) => {
        e.preventDefault();
        if(query===""){
            setBox({show:true, message:"검색어를 입력하세요",  action2: ()=>setQuery('최신')})
            return;
        }else{
            setPage(1);
            callAPI();
        }
        
    }

    const onInsert = (good) => {
        setBox({
            show:true, 
            message:`${good.title}상품을 등록하시겠습니까?`, 
            action: async()=>{
                const res = await axios.post(`/goods/insert`, {
                    gid:good.productId,
                    title:removeTags(good.title),
                    image:good.image,
                    maker:good.maker,
                    brand:good.brand,
                    price:good.lprice
                });
                if(res.data===1) {
                    setBox({show:true, message:"상품등록완료"})
                }else{
                    setBox({show:true, message:"상품등록실패"})
                }
            }
        })
    }

    const onChangeAll = (e) => {
        const data = goods.map(good=>good && {...good, checked:e.target.checked})
        setGoods(data);
    }

    const onChangeSingle = (e, id) =>{
        const data = goods.map(good=>good.productId===id ? {...good, checked:e.target.checked} : good);
        setGoods(data);
    }

    const onCheckedInsert = () => {
        let cnt = 0;
        let inserted = 0;
        if(checked===0){
            setBox({show:true, message:"등록할 상품이 없습니다."});
            return;
        }
        //상품넣기
        setBox({
            show:true, 
            message:`${checked}개 상품을 등록하시겠습니까?`,
            action:()=> {
                goods.forEach(async good=>{
                    if(good.checked){
                        const res = await axios.post(`/goods/insert`, {
                            gid:good.productId,
                            title:removeTags(good.title),
                            image:good.image,
                            maker:good.maker,
                            brand:good.brand,
                            price:good.lprice
                        });
                        if(res.data===1) inserted++;
                        cnt++;
                        if(cnt===checked){
                            setBox({
                                show:true, 
                                message:`${inserted}개의 상품등록완료`,
                                action2:()=>{
                                    const data = goods.map(good=>good && {...good, checked:false});
                                    setGoods(data);
                                }
                            });
                        }
                    }
                })
            }
        })
    }


    const onClickImage = async (image) => {
        if(!window.confirm(`이미지를 다운로드하시겠습니까?`)) return;
        await axios.post(`/download?file=${image}`)
        alert("다운로드하였습니다.")
    }

    const removeTags = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }


  return (
    <Container>
        <Row>
            <Col>
                <Button onClick={onCheckedInsert}>선택상품등록</Button>
            </Col>
            <Col lg={4}>
                <form onSubmit={onSubmit}>
                    <InputGroup>
                        <Form.Control placeholder='검색어를 입력하세요' value={query} onChange={(e)=>setQuery(e.target.value)} />
                        <Button type="submit">검색</Button>
                    </InputGroup>
                </form>
            </Col>
        </Row>
        <hr/>
        <Row>
            <Col lg={11}>
                <Table>
                    <thead>
                        <tr>
                            <td><Form.Check onChange={onChangeAll} checked={goods.length===checked}/></td>
                            <td>이미지</td>
                            <td>상품명</td>
                            <td>가격</td>
                            <td>브랜드</td>
                            <td>상품등록</td>
                        </tr>
                    </thead>
                    <tbody>
                        {goods.map(good=>
                            <tr key={good.productId}>
                                <td><Form.Check checked={good.checked} onChange={(e)=>onChangeSingle(e,good.productId)} /></td>
                                <td ><img src={good.image} width={"50px"} onClick={()=>onClickImage(good.image)} /> </td>
                                <td><div dangerouslySetInnerHTML={{__html:good.title}}></div></td>
                                <td>{good.lprice}</td>
                                <td>{good.brand}</td>
                                <td><Button onClick={()=>onInsert(good)} size='sm'>상품등록</Button></td>
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
            </Col>
        </Row>
        <Row>
            <div>
                <p>이미지를 누르면 다운로드됩니다.</p>
            </div>
        </Row>
    </Container>
  )
}

export default SearchPage