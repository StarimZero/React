import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  Button, FormCheck, Table, Row, Col, InputGroup, Form, Alert } from 'react-bootstrap';
import '../Paging.css'
import Pagination from 'react-js-pagination';

const ListPage = () => {

    const [key, setKey] = useState("title");
    const [word, setWord]  = useState("");
    const [loading, setLoading] = useState(false);
    const [chk, setChk] = useState(0);
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [count, setCount] = useState(0);

    useEffect(()=>{
        let count = 0;
        books.map(book=>book.checked && count++)
        setChk(count);
    },[books])

    const callAPI = async () =>{
        setLoading(true);
        const url = `/books/list?page=${page}&size=${size}&key=${key}&word=${word}`;
        const res = await axios.get(url);
        const documents = res.data.documents;
        console.log(res.data);
        setBooks(documents.map(book=>book &&{...book, checked:false}));
        setCount(res.data.count);
        if(page > Math.ceil(res.data.count/size)) setPage(page-1); //마지막페이지에서 다 삭제하고 난후 처리 
        setLoading(false);
    }

    useEffect(()=>{
        callAPI();
    },[page])

    const onDelete = async (book) =>{
        if(!window.confirm(`책제목 : ${book.title} \n삭제 하시겠습니까?`)) return;
        //삭제하기
        const res=await axios.post('/books/delete', {bid:book.bid});
        if(res.data.result===1){
            alert("삭제하였습니다.")
            callAPI();
        }else{
            alert("삭제에 실패하였습니다.")
        }
    }

    const onChangeAll = (e) =>{
        setBooks(books.map(book=>book && {...book, checked:e.target.checked}))
    }

    const onChangeSingle = (e, bid) =>{
        setBooks(books.map(book=>book.bid===bid ? {...book, checked:e.target.checked} : book));
    }

    const onDeleteChecked = () =>{
        if(chk===0){
            alert("삭제하실 도서를 선택해주세요")
            return;
        }
        if(!window.confirm(`${chk}의 도서를 삭제하시겠습니까?`)) return;
        //삭제하기
        let deleted=0;
        let cnt = 0;
        books.forEach(async book=>{
            if(book.checked){
                const res= await axios.post('/books/delete', {bid:book.bid});
                cnt++;
                if(res.data.result===1) deleted++;
                if(cnt==chk){
                    alert(`${deleted}개 도서가 삭제되었습니다.`)
                    //setBooks(books.map(book=>book && {...book, checked:false}));
                    callAPI();
                }
            }
        })
    }

    const onSubmit = async (e) =>{
        e.preventDefault();
        const url = `/books/list?page=${page}&size=${size}&key=${key}&word=${word}`;
        const res = await axios.get(url);
        const documents = res.data.documents;
        if(documents.length === 0) {
            alert('검색된 결과가 없습니다');
                setLoading(false);
                window.location.reload();
                return;
        }else{
            setPage(1);
            callAPI();
        }

    }
    if(loading) return <h1 className='text-center align-middle'>로딩중</h1>
  return (
    <div>
        <h1 className='text-center my-5'>도서목록</h1>
        <Row>
            <Col>
                <form onSubmit={onSubmit}>
                    <InputGroup className="input-group-sm">
                            <Form.Select value={key} onChange={(e)=>setKey(e.target.value)}>
                            <option value="title">제목</option>
                            <option value="author">저자</option>
                            <option value="publisher">출판사</option>
                        </Form.Select>
                        <Form.Control placeholder='검색어를 입력하세요' value={word} onChange={(e)=>setWord(e.target.value)}/>
                        <Button type='submit' size='sm'>검색</Button>
                        <Col className='text-center align-middle my-1'>검색수 : {count}</Col>
                    </InputGroup>
                </form>
            </Col>
            <Col className='mb-2 text-end'>
                <Button onClick={onDeleteChecked} variant='outline-danger'>선택도서삭제</Button>
            </Col>
        </Row>
        <Table striped bordered hover variant="dark" >
            <thead className='text-center align-middle'>
                <tr>
                    <td><FormCheck onChange={onChangeAll} checked={books.length===chk} /></td>
                    <td>번호</td>
                    <td>이미지</td>
                    <td>제목</td>
                    <td>저자</td>
                    <td>가격</td>
                    <td>출판사</td>
                    <td>등록일</td>
                    <td>등록삭제</td>
                </tr>
            </thead>
            <tbody  className='align-middle text-center'>
                {books.map(book=>
                    <tr key={book.bid}>
                        <td><FormCheck  checked={book.checked} onChange={(e)=>onChangeSingle(e, book.bid)}/></td>
                        <td>{book.bid}</td>
                        <td><img src={book.image} width="60px"/></td>
                        <td><a href={`/books/update/${book.bid}`}>{book.title}</a></td>
                        <td>{book.author}</td>
                        <td>{book.fmtprice}원</td>
                        <td>{book.publisher}</td>
                        <td>{book.fmtdate.slice(0,10)}</td>
                        <td><Button variant='outline-danger' size='sm' onClick={()=>onDelete(book)}>삭제</Button></td>
                    </tr>
                )}
            </tbody>
        </Table>
        <Pagination
            activePage={page}
            itemsCountPerPage={size}
            totalItemsCount={count}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={(e)=>setPage(e)}/>
    </div>
    
  )
}

export default ListPage