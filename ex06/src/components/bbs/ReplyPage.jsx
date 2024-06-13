import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Button, Row, Col, Form } from 'react-bootstrap'
import Pagination from 'react-js-pagination';
import { useLocation } from 'react-router-dom';

const ReplyPage = ({bid}) => {
    
    const uid = sessionStorage.getItem('uid');

    const {pathname} = useLocation();
    const [contents, setContents] = useState("");
    const [list, setList] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(4);



    const callAPI = async () =>{
        const url = `/reply/list.json/${bid}?page=${page}&size=${size}`;
        const res = await axios.get(url);
        console.log(res.data)
        const data=res.data.documents.map(doc=>doc && {...doc, isEllip:true, text:doc.contents});
        setList(data);
        setCount(res.data.total);
    }

    useEffect(()=>{
        callAPI();
    },[page])


    const onClickToLogin = () => {
        console.log(pathname);
        sessionStorage.setItem('target', pathname)
        window.location.href="/user/login";
    }

    const onClickInsert = async () => {
        if(contents==""){
            alert("내용을 입력하세요")
            return;
        }
        if(!window.confirm("댓글을 등록하시겠습니까?")) return;

        await axios.post(`/reply/insert`, {bid, uid:sessionStorage.getItem("uid"), contents});
        setContents("");
        callAPI();
    }

    const onClickContents = (rid) => {
        const data = list.map(reply => reply.rid===rid ? {...reply, isEllip:!reply.isEllip, isEdit:false} : reply);
        setList(data);
    }

    const onClickDelete = async (rid) => {
        if(!window.confirm(`${rid}번 댓글을 삭제하실래요?`)) return;
        //삭제하기
        axios.post(`/reply/delete/${rid}`)
        callAPI();
    }

    const onClickUpdate = (rid) => {
        const data=list.map(reply=>reply.rid===rid ? {...reply, isEdit:true} : reply);
        setList(data);     
    }

    const onChangeContent = (e, rid) => {
        const data = list.map(reply=>reply.rid===rid ? {...reply, contents:e.target.value} : reply);
        setList(data);
    }

    const onClickSave = async (reply) => {
        if(reply.contents===reply.text){
            alert("수정된 내용이없습니다.")
        }else{
            if(!window.confirm(`${reply.rid}번 댓글을 수정하시겠습니까?`)) return;
            await axios.post('/reply/update', {rid:reply.rid, contents:reply.contents});
            callAPI();
        }
    }

    const onClickCancle = () => {
        if(!window.confirm("댓글수정을 취소하시겠습니까?")) return;
        callAPI();
    }

  return (
    <Container className='mb-5'>
        <div>
            
            {sessionStorage.getItem("uid") ?
                    <div className='mt-1'>
                        <Row>
                            <Col>
                                <h5>[{bid}번글] 댓글쓰기</h5>
                            </Col>
                            <Col className='text-end'>
                                <span>총댓글수 : {count}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Control as = "textarea" rwos={5} value={contents} onChange={(e)=>setContents(e.target.value)}/>
                                <div className='text-end mt-2 mb-4'>
                                    <Button size='sm' variant='outline-warning' onClick={onClickInsert}>등록</Button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                        
                    :
                    <div className='mt-1'>
                        <h5>[{bid}번글] 댓글쓰기</h5>
                        
                        <div className='text-end mb-4'>
                            <Button size='sm' onClick={onClickToLogin}>로그인하러가기</Button>
                        </div>
                    </div>
            }
            <Row>
                <Col>
                    {list.map(reply=>
                        <div key={reply.rid}>
                            <Row>
                                <Col className='text-muted' lg={6}>
                                    <span>{reply.uid}({reply.uname}) </span>                                    
                                    <span>{reply.fmtdate}</span>
                                </Col>
                                <Col className='text-end'>
                                    {reply.fmtupdate && <span>!!수정된 댓글입니다!! {reply.fmtupdate}</span>}
                                </Col>
                                {uid === reply.uid && !reply.isEdit &&
                                <Col className='text-end' lg={2}>
                                    <Button size='sm' variant='outline-danger' onClick={()=>onClickDelete(reply.rid)}>삭제</Button>
                                    <Button size='sm' variant='outline-info' className='ms-1' onClick={()=>onClickUpdate(reply.rid)}>수정</Button>
                                </Col>
                                }

                                {uid === reply.uid && reply.isEdit &&
                                <Col className='text-end'  lg={2}>
                                    <Button size='sm' variant='outline-danger' onClick={onClickCancle}>취소</Button>
                                    <Button size='sm' variant='outline-info' className='ms-1' onClick={()=>onClickSave(reply)} >저장</Button>
                                </Col>
                                }
                            </Row>
                            <Row>
                                {reply.isEdit? 
                                    <div>
                                        <Form.Control as="textarea" rows={5} value={reply.contents} onChange={(e)=>onChangeContent(e, reply.rid)}/>
                                    </div>
                                :
                                <div className={reply.isEllip && 'ellipsis1'} style={{whiteSpace:"pre-wrap", cursor:"pointer"}} onClick={()=>onClickContents(reply.rid)} >
                                    {reply.contents}
                                </div>
                                }
                                <hr/>
                            </Row>
                        </div>
                    )}
                </Col>
            </Row>
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

export default ReplyPage