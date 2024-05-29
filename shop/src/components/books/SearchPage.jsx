import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import { Table, Row, Col, InputGroup, Form, FormControl, Button, FormCheck } from 'react-bootstrap';

const SearchPage = () => {

    const [chk, setChk] = useState(0);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [query, setQuery] = useState("채식주의자");
    const [total, setTotal] = useState(0);
    const [isEnd, setisEnd] = useState(false);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        let count = 0;
        books.forEach(book=>book.checked && count++)
        setChk(count);
    },[books]);

    const callAPI = async () => {
        const url =`https://dapi.kakao.com/v3/search/book?target=title&query=${query}&size=${size}&page=${page}`;
        const config ={
            "headers" : {"Authorization" : "KakaoAK 89e3021ad2846184fd12b67daf705b0f"}
        }
        setLoading(true);
        const res = await axios.get(url, config);
        console.log(res.data);
        const documents =res.data.documents;
        setBooks(documents.map(book=>book && {...book, checked:false}));
        setisEnd(res.data.meta.is_end);
        setTotal(res.data.meta.pageable_count);
        setLoading(false);
    }

    useEffect(() => {
        callAPI();
    },[page])


    const onSubmit = (e) => {
        e.preventDefault();
        if(query===""){
            alert("검색어를 입력해주세요")
            return;
        }
        setPage(1);
        callAPI();
    }

    const onInsert = async (book) => {
        if(!window.confirm(`"${book.title}" 등록하시겠습니까?`)) return;
        //도서등록 
        console.log(book);
        const data={...book, authors:book.authors.join(",")}
        const res= await axios.post('/books/insert', data);
        console.log("결과.....................................", res.data.result);
        if(res.data.result===1){
            alert("도서를 등록하였습니다.")
        }else{
            alert("이미등록된 도서입니다.")
        }
    }

    const onChangeAll = (e) => {
        setBooks(books.map(book=>book && {...book, checked:e.target.checked}));
    }
    
    const onChangeSingle = (e, isbn) =>{
        setBooks(books.map(book=>book.isbn===isbn ? {...book, checked:e.target.checked} : book));
    }
    
    //체크된거 저장하기
    const onInsertCheckd = () => {
        if(chk==0){
            alert("저장하실 품목을 선택하세요")
            return;

        }
        if(!window.confirm(`${chk}개의 도서를 저장하시겠습니까?`)) return;
        //선택한 도서들을 저장하는거
        let count =0;
        let inserted =0;
        books.forEach(async book=>{
            if(book.checked){
                const data={...book, authors:book.authors.join(",")}
                const res= await axios.post('/books/insert', data);
                count++;
                if(res.data.result===1) inserted++;
                if(count===chk){
                    alert(`${inserted}개의 도서가 저장되었습니다.`)
                    setBooks(books.map(book=>book && {...book, checked:false}));
                }
            }
        })
    }

    if(loading) return (
        <>
          <Spinner animation="border" variant="primary" />
          <Spinner animation="border" variant="secondary" />
          <Spinner animation="border" variant="success" />
          <Spinner animation="border" variant="danger" />
          <Spinner animation="border" variant="warning" />
          <Spinner animation="border" variant="info" />
          <Spinner animation="border" variant="light" />
          <Spinner animation="border" variant="dark" />
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="danger" />
          <Spinner animation="grow" variant="warning" />
          <Spinner animation="grow" variant="info" />
          <Spinner animation="grow" variant="light" />
          <Spinner animation="grow" variant="dark" />
        </>
      );
  return (
    <div className='my-5'>
        <h1 className='text-center mb-5'>도서검색</h1>
        <Row  className='mb-2'>
            <Col lg={4}>
                <form onSubmit={onSubmit}>
                    <InputGroup>
                        <Form.Control value={query} onChange={(e)=>setQuery(e.target.value)}/>
                        <Button type='submit'>검색</Button>
                    </InputGroup>
                </form>
            </Col>
            <Col className="align-middle mt-2"> 
                <span >검색수 : {total}건 </span>
            </Col>
            <Col className='text-end'>
                <Button variant='outline-info' onClick={onInsertCheckd}>선택도서 저장</Button>
            </Col>

        </Row>
        <Table striped bordered hover variant="dark" size="sm">
            <thead>
                <tr className='text-center'>
                    <td><FormCheck onChange={onChangeAll} checked={chk===books.length}  style={{backgroundColor: chk === books.length ? '#f00' : 'transparent'}} /></td>
                    <td>isbn</td>
                    <td colSpan={2}>제목</td>
                    <td>가격</td>
                    <td>작가</td>
                    <td>저장</td>
                </tr>
            </thead>
            <tbody>
                {books.map(book=>
                    <tr key={book.isbn}>
                        <td className='text-center align-middle'><FormCheck checked={book.checked} onChange={(e)=>onChangeSingle(e, book.isbn)}  /></td>
                        <td className='align-middle text-center'>{book.isbn}</td>
                        <td colSpan={2}><img src={book.thumbnail || "/images/dummy1.png" } width="40px"/>{book.title} </td>
                        <td className='align-middle text-center'>{book.price}원</td>
                        <td className='align-middle text-center'>{book.authors}</td>
                        <td className='align-middle text-center'onClick={()=>onInsert(book)} ><Button size='sm' variant='warning' style={{color: "purple"}} >등록</Button></td>
                    </tr>
                )}
            </tbody>
        </Table>
        <div className='text-center'>
            <Button onClick={()=>setPage(page-1)} disabled={page===1}>이전</Button>
            <span className='mx-3'><strong>{page}</strong></span>
            <Button onClick={()=>setPage(page+1)} disabled={isEnd}>다음</Button>
        </div>
    </div>
  )
}

export default SearchPage