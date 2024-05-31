import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Container, Form } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import '../Paging.css';
import Pagination from 'react-js-pagination';


const ReviewPage = ({bid}) => {


    const [page, setPage] = useState(1);
    const [size, setSize] = useState(3);
    const [count, setCount] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [contents, setContents] = useState("");
    const navi = useNavigate();
    const uid = sessionStorage.getItem("uid")
    const {pathname} = useLocation();

    const callAPI = async () =>{
        const res = await axios.get(`/review/list/${bid}?page=${page}&size=${size}`);
        console.log(res.data);
        //리뷰가 없는경우
        if(!res.data.documents){
            setReviews([]);
        }else{
            setCount(res.data.count);
        }
        setCount(res.data.count);
        if(page>Math.ceil(res.data.count/size)) setPage(page-1);
        const data = res.data.documents.map(doc=>doc && {...doc, ellip:true, isEdit:false, text:doc.contents})
        setReviews(data);
    }
    
    
    const onClickRegister = () => {
        sessionStorage.setItem("target", pathname)
        navi("/users/login")
    }

    const onClickInsert = async () => {
        if(contents===""){
            alert("리뷰내용을 입력하세요")
        }else{
            //리뷰등록하기 
            const res=await axios.post('/review/insert', {bid, uid, contents});
            if(res.data.result===1){
                alert("리뷰등록성공");
                setContents("");
                callAPI();
            }
        }
    }
    
    const onCilckContents = (rid) =>{
        const data = reviews.map(doc=>doc.rid===rid ? {...doc, ellip:!doc.ellip}: doc);
        setReviews(data);
    }


    const onClickDelete = async (rid) =>{
        if(!window.confirm(`${rid}번 댓글을 삭제하시겠씁니까?`)) return;
        //삭제하기
        const res = await axios.post(`/review/delete/${rid}`);
        if(res.data.result===1){
            alert("댓글을 삭제하였습니다.")
            callAPI();
        }
    }


    const onClickUpdate = async (rid) => {
        const data = reviews.map(doc=>doc.rid===rid ? {...doc, isEdit:true} : doc);
        setReviews(data);
        //수정하기
        
    }

    const onChangeForm = (e, rid) =>{
        const data = reviews.map(doc=>doc.rid===rid ? {...doc, contents:e.target.value} : doc);
        setReviews(data);
    }

    const onClickCancel = (rid) =>{
        const data = reviews.map(doc=>doc.rid===rid ? {...doc, isEdit:false, contents:doc.text} : doc);
        setReviews(data);
    }

    const onClickSave = async (rid, contents) => {
        if(contents===""){
            alert("내용을 입력하세요.")
            return;
        }
        if(!window.confirm(`${rid}번 리뷰를 수정하시겠습니까?`)) return;
        //수정하기
        const res = await axios.post("/review/update", {rid, contents})
        if(res.data.result===1){
            alert("수정되었습니다.")
            callAPI();
        }
    }

    useEffect(()=>{
        callAPI();
    },[page])




  return (
    <Container>
        <Row>
            <div className='text-end mb-2'>
                <Button size='sm' variant='outline-secondary' className='me-1 active'>전체리뷰보기</Button>
                <Button size='sm' variant='outline-secondary '>구매리뷰만보기</Button>
            </div>
        </Row>
        <Row>
            <Form.Control as="textarea" rows={5} placeholder='내용을 입력하세요' value={contents} onChange={(e)=>setContents(e.target.value)}/>
            <div>
                {!uid ?
                    <div className='text-end my-2'>
                        <Button size='sm' variant='outline-danger' onClick={onClickRegister}>리뷰작성에는 로그인이 필요합니다.</Button>
                    </div>
                :
                    <div className='text-end'>
                        <Button size="sm" variant='outline-primary' className='mt-2' onClick={onClickInsert}>리뷰쓰기</Button>
                    </div>
                }
            </div>
        </Row>
        <div className='my-5'>
            {reviews.map(r=>
                <div key={r.rid}>
                    <Row>
                        <Col className='text-muted' style={{fontSize:"12px"}}>
                            <img src={r.photo || "http://via.placeholder.com/250x250"} width="50px" height="50px" style={{borderRadius:"50%"}}/>
                            <span className='me-3'>{r.uname}({r.uid})</span>
                            <span>{r.fmtdate}</span>
                        </Col>
                        {(uid===r.uid && !r.isEdit) &&
                            <Col className='text-end'>
                                <Button size="sm" className='me-2' variant='outline-info' onClick={()=>onClickUpdate(r.rid)}>수정</Button>
                                <Button size="sm" onClick={()=>onClickDelete(r.rid)} variant='outline-danger'>삭제</Button>
                            </Col>
                        }
                        {(uid===r.uid && r.isEdit) &&
                            <Col className='text-end'>
                                <Button size="sm" className='me-2' variant='outline-info' onClick={()=>onClickSave(r.rid, r.contents)}>수정등록</Button>
                                <Button size="sm" onClick={()=>onClickCancel(r.rid)} variant='outline-danger'>다시쓰기</Button>
                            </Col>
                        }
                    </Row>
                    {r.isEdit ?
                    <div>
                        <Form.Control as="textarea" rows={10} value={r.contents} onChange={(e)=>onChangeForm(e, r.rid)} />
                    </div>
                    :
                    <div className={r.ellip && "ellipsis2"} style={{whiteSpace:"pre-wrap", cursor:"pointer"}} onClick={()=>onCilckContents(r.rid)}> 
                            {r.rid}:{r.contents}
                    </div>
                    }

                    <hr/>
                </div>
            )}
        </div>
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

export default ReviewPage