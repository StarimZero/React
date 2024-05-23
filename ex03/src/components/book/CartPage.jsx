import React, { useEffect, useState } from 'react'
import { app } from '../../firebaseInit'
import { getDatabase, ref, onValue, remove } from 'firebase/database'
import { Table, Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import ModalBook from './ModalBook';


const CartPage = () => {
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const uid = sessionStorage.getItem("uid");
    const db = getDatabase(app);

    const callAPI = () =>{
        setLoading(true);
        onValue(ref(db, `cart/${uid}`), snapshot=>{
            let rows=[];
            let count=0;
            snapshot.forEach(row=>{
                //console.log(row.key, row.val());
                count++;
                rows.push({no:count, key:row.key, ...row.val()})
            });
            //console.log(rows);
            setBooks(rows);
            setLoading(false);
        });
    }

    useEffect(()=>{
        callAPI();
    }, []);

    const onClickDelete = (book) =>{
        if(window.confirm(`장바구니에서 제외할 책 : ${book.title} `)){
            //삭제하기
            remove(ref(db, `cart/${uid}/${book.key}`));
        }
    }

    if(loading) return <div className='text-center my-5'>
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
    </div>

  return (
    <div className='my-5'>
        <h1 className='text-center'>장바구니</h1>
        <Table>
            <thead>
                <tr>
                    <td>No.</td>
                    <td>제목</td>
                    <td>가격</td>
                    <td>삭제하기</td>
                    <td>상세보기</td>
                </tr>
            </thead>
            <tbody>
                {books.map(book=>
                    <tr key={book.key}>
                        <td>{book.no}</td>
                        <td>{book.title}</td>
                        <td>{book.price}원</td>
                        <td><Button size="sm" variant="danger" type='submit' onClick={()=>onClickDelete(book)}>삭제</Button></td>
                        <td><ModalBook book={book} type="cart"  /></td>
                    </tr>
                )}
            </tbody>
        </Table>
    </div>
  )
}

export default CartPage