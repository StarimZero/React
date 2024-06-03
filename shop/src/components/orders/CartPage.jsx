import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Table, Button, FormCheck} from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert';
import { CountContext } from '../CountContext';
import OrderPage from './OrderPage';


const CartPage = () => {

    const [isOrder, setIsOrder] = useState(false);
    const [chk, setChk] = useState(0);
    const {setCount} = useContext(CountContext);
    const [total, setTotal] = useState(0);
    const [books, setBooks] = useState([]);
    const uid = sessionStorage.getItem('uid');
    //const [qnt, setQnt] = useState(book.qnt);


    useEffect(()=>{
        let checkedCount = 0;
        books.forEach(book=>book.checked && checkedCount++);
        console.log("..............", checkedCount)
        setChk(checkedCount);
    },[books])

    const callAPI = async () => {
        const res = await axios.get(`/cart/list?uid=${uid}`);
        const data = res.data.map(book=>book && {...book, sum:book.qnt*book.price, checked:false})
        setBooks(data);
        setCount(data.length);

        let totalSum = 0;
        data.forEach(book=>{
            totalSum += book.sum;
        });
        setTotal(totalSum);
    }

        //  const onClickQntPlus = (bid, qnt) => {
        //      setQnt(qnt + 1);
        //      };
        
        const onChangeQnt = (bid, e) =>{
            const result =e.target.value.replace(/[^0-9]/g,''); // 숫자만 들어가기 

            const data = books.map(book=>book.bid==bid ? {...book, qnt:result}:book);
            setBooks(data);

        }

        const onUpdateQnt = async (bid, qnt) =>{
            //if(!window.confirm(`${bid}번 도서의 수량을 ${qnt}개로 변경하시겠습니까?`))return;
            //수량수정
            const res = await axios.post("/cart/update",
                {uid:sessionStorage.getItem("uid"), bid, qnt});
            if(res.data.result===1){
                callAPI();
            }
        }

        const onClickDelete = async (bid) =>{
            //장바구니 삭제 
            if(!window.confirm("장바구니에서 삭제하시겠습니까?")) return;

            const res = await axios.post("/cart/delete",
                {uid:sessionStorage.getItem("uid"), bid});
            if(res.data.result===1){
                alert("장바구니에서 삭제하였습니다.")
                callAPI();
            }
        }

        const onChangeAll = (e) =>{
            const data = books.map(book=>book && { ...book, checked:e.target.checked});
            setBooks(data);
        }

        
        const onChangeSingle = (e, bid) =>{
            const data = books.map(book=> book.bid===bid ? {...book, checked:e.target.checked} : book)
            setBooks(data);
        }

        useEffect(()=>{
            callAPI();
        },[])
    
        const onCheckedDelete = () =>{
            if(chk===0){
                alert("삭제할 품목을 선택하세요.") 
                return;
            }
            if(!window.confirm(`${chk}개 도서를 장바구니에서 제외하시겠습니까?`)) return;
            //선택도서삭제 
            let deleted = 0;
            books.forEach(async book=>{
                if(book.checked){
                    deleted++;
                    const res = await axios.post('/cart/delete', {bid:book.bid, uid})
                }
                
            });
            if(chk===deleted){
                alert(deleted + "개의 품목을 삭제하였습니다.");
            }
            callAPI();
        }

        const onOrder = () => {
            if(chk===0){
                alert("주문할 상품을 선택하세요");
            }else{
                //window.location.href="/orders/order";
                //주문페이지 
                setIsOrder(true);
            }
        }




  return (
    <Row className='justify-content-center my-5'>
        {!isOrder ?
        <>
        <Col>
            <h1 className='text-center mb-5'>장바구니</h1>
            <Button variant='outline-primary' className='mb-2' size='sm' onClick={()=>onCheckedDelete()}>선택도서 삭제</Button>
            <Table striped bordered hover variant="dark" sizme="sm" >
                <thead className='text-center'>
                    <tr>
                        <td><FormCheck onChange={onChangeAll} checked={chk===books.length}  /></td>
                        <td>ID</td>
                        <td>제목</td>
                        <td>가격</td>
                        <td>수량</td>
                        <td>등록일</td>
                        <td>합계</td>
                        <td>삭제</td>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {books.map(book=>
                        <tr key={book.bid}>
                            <td style={{width:"2%"}} onChange={(e)=>onChangeSingle(e, book.bid)}><FormCheck checked={book.checked}/></td>
                            <td style={{width:"6%"}}>{book.bid}</td>
                            <td>
                                <img src={book.image} width="30px"/>
                                <span className='ms-1'>{book.title}</span>
                            </td>
                            <td style={{width:"10%"}}>{book.fmtprice}원</td>
                            <td style={{width:"12%"}}>
                                <input onChange={(e)=>onChangeQnt(book.bid, e)} value={book.qnt} size={2} className='text-center'></input>
                                <Button className="ms-1" size="sm"variant='outline-danger' onClick={()=>onUpdateQnt(book.bid, book.qnt)}>수정</Button>
                            </td>
                            <td style={{width:"15%"}}>{book.regDate.substring(0,10)}</td>
                            <td style={{width:"13%"}}>{book.sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</td>
                            <td  style={{width:"7%"}}><Button size="sm" variant='outline-secondary' onClick={()=>onClickDelete(book.bid)}>삭제</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <>
                {[
                    'warning',
                ].map((variant) => (
                    <Alert key={variant} variant={variant} className='text-end my-1'>
                        <sapn>총합계  = {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</sapn>
                    </Alert>
                ))}
            </> 
        </Col>
        <div className='text-end my-2'>
            <Button variant='outline-success' onClick={onOrder}>주문하기</Button>
        </div>
        <div className='text-center'>
            <Button variant='outline-primary' href='/'>로켓와우 무료체험 신청하기</Button>
        </div>
        </>
        :
        <OrderPage books={books} setBooks={setBooks}/>
        }
    </Row>
  )
}

export default CartPage