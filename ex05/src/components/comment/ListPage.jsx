import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Form } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { app } from '../../firebaseInit';
import { deleteDoc, doc, getDoc, setDoc, getFirestore, addDoc, collection, orderBy, where, onSnapshot, query } from 'firebase/firestore';
import '../Paging.css';
import Pagination from "react-js-pagination";


const ListPage = ({id}) => {

    const [comments, setComments] = useState([]);
    const db = getFirestore(app);
    const navi = useNavigate();
    const {pathname} = useLocation();
    const [content, setContent] = useState("");
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [total, setTotal] = useState(100);

    const onClickInsert = async () => {
        if(sessionStorage.getItem("email")){
            if(content === ""){
                alert("댓글내용을 입력하세요")
            }
            //댓글저장하기
            alert(content);
            const email = sessionStorage.getItem("email");
            const date = moment(new Date).format("YY년MM월DD일 HH시mm분ss초")
            const comment = {id, email, date, content};
            console.log(comment);
            await addDoc(collection(db, 'commnets'), comment)
            alert("댓글등록하였습니다.")
            setContent("");
            setPage(1);
        }else{
            console.log(pathname);
            sessionStorage.setItem("target", pathname)
            navi('/user/login');
        }
    }

    const onClickContent = (cid) =>{
        const rows=comments.map(c=>c.cid === cid? {...c,isEllip: ! c.isEllip}:c);
        setComments(rows);
    }

    const onClickDelete = async (cid) => {
        if(!window.confirm(`${cid}의 댓글을 삭제할래요?`)) return;
        //삭제하기
        await deleteDoc(doc(db, `commnets/${cid}`));
        alert("삭제되었습니다.")
    }

    const onClickUpdate = (cid) => {
        const rows=comments.map(c=>c.cid==cid ? {...c,isEdit:true} : c);
        setComments(rows);
    }

    const onClickCancel = (cid, content, text) => {
        if(content !== text){
            if(!window.confirm("작성을 취소하시겠습니까?")) return;
        }
        const rows = comments.map(c => c.cid === cid ? {...c, isEdit:false, content:text}: c);
        setComments(rows);
    }

    const onChangeContent = (e, cid) => {
        const rows=comments.map(c => c.cid === cid ? {...c, content:e.target.value} : c);
            setComments(rows);
    }
    
    const oncClickSave = (comment)=>{
        //if(comment.content===comment.text) return;
        if(!window.confirm("수정하시겠습니까?")) return;
        //수정저장하기
        console.log(comment);
        const rows = comments.map(c => c.cid === comment.cid ? {...c, isEdit:false}: c);
        setComments(rows);
        const date = moment(new Date()).format("YY년MM월DD일 HH시mm분ss초");
        setDoc(doc(db, `commnets/${comment.cid}`), {...comment, edit_date:date});
        
    }

    const callAPI = async () => {
        const q=query(collection(db, 'commnets'), where("id", "==", id), orderBy('date', 'desc'));
        onSnapshot(q, res=>{
            let rows=[];
            let count=0;
            res.forEach(row=>{
                count++;
                rows.push({
                    no:count, 
                    cid: row.id, 
                    ...row.data(),
                    isEllip:true,
                    isEdit:false,
                    text:row.data().content
                })
            });
            //console.log(rows);
            setTotal(count);
            const start = (page-1)*size +1;
            const end=(page*size);
            rows = rows.filter(row=>row.no>=start && row.no<=end);
            setComments(rows)
        });
    }

    useEffect(()=>{
        callAPI();
    }, [page])
    
  return (
    <Row className='justify-content-center my-5'>
        <Col xs={12} lg={8}>
            <h1>댓글</h1>
            {sessionStorage.getItem("email") &&
                <div className='text-end'>
                    <Form.Control value={content} onChange={(e)=>setContent(e.target.value)} as="textarea" rows={5} placeholder='댓글을 입력하세요 '/>
                </div>
            }
            <div className='text-end'>
                <Button className='px-4 my-2' variant='outline-secondary' onClick={onClickInsert}>댓글등록</Button>
            </div>
            <div className='commnets'>
                {comments.map(c=>
                    <div key={c.cid}>
                        <Row className='mb-2 content'>
                            <Col className='text-muted' lg={8}>
                                <span>{c.email}</span>
                                <span className='mx-2'>{c.date}</span>
                                <br/>
                                {c.edit_date && <span>수정날짜 : {c.edit_date}</span>}
                                
                            </Col>
                            {(c.email===sessionStorage.getItem("email")) && !c.isEdit &&
                            <Col className='text-end'>
                                <Button size="sm" variant='outline-success' className='mx-2' onClick={()=>{onClickUpdate(c.cid)}}>수정</Button>
                                <Button size="sm" variant='outline-danger' onClick={()=>{onClickDelete(c.cid)}}>삭제</Button>
                            </Col>
                            }
                            {(c.email===sessionStorage.getItem("email")) && c.isEdit &&
                            <Col className='text-end'>
                                <Button size="sm" variant='outline-success' className='mx-2' onClick={()=>oncClickSave(c)}>저장</Button>
                                <Button size="sm" variant='outline-danger' onClick={()=>{onClickCancel(c.cid, c.content, c.text)}} >취소</Button>
                            </Col>
                            }
                        </Row>
                        {c. isEdit ?
                        <div>
                            <Form.Control onChange={(e) => onChangeContent(e, c.cid)} value={c.content} as="textarea" rows={10}/>
                        </div>
                        : 
                        <div onClick={()=>onClickContent(c.cid)} className={c.isEllip ? 'ellipsis2' : ""} style={{ whiteSpace: "pre-wrap", cursor:"pointer"}}>{c.content}</div>
                        }
                        <hr/>
                    </div>
                )}
            </div>
            <Pagination
            activePage={page}
            itemsCountPerPage={size}
            totalItemsCount={total}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={(e)=>setPage(e)}/>
        </Col>
    </Row>
  )
}

export default ListPage