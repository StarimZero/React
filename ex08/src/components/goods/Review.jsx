import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {Col, Container, Form, InputGroup, Row, Table } from 'react-bootstrap'
import {Rating} from '@mui/material'
import axios from 'axios'




const Review = ({gid}) => {

    const uid = sessionStorage.getItem("uid");
    const [rating, setRating] = useState(0);
    const [contents, setContents] = useState("");
    const [list, setList] = useState([]);


    const callAPI = async () => {
        const res = await axios.get(`/review/list/${gid}`)
        console.log(res.data);
        const data = res.data.map(review=>review && {...review, isEdit:false})
        setList(data);
    }

    useEffect(()=>{
        callAPI();
    },[])




    const onInsert = async () => {
        if(contents===""){
            alert("리뷰내용을 입력하세요");
            return;
        }
        //리뷰등록하기
        if(!window.confirm("리뷰를등록하시겠습니까?")) return;
        await axios.post(`/review/insert`, {gid, uid, contents, rating})
        alert("리뷰등록완료")
        setRating(0);
        setContents("");
        callAPI();
    }

    const onDelete = async (rid) => {
        if(!window.confirm(`${rid} 삭제?`)) return;
        axios.post(`/review/delete/${rid}`, {rid})
        alert("삭제완료")
    }

    const onUpdate = (rid) => {
        const data = list.map(r=>r.rid===rid ? {...r, isEdit:true} : r);
        setList(data);
    }

    const onChangeContents = (e, review) => {
        const  data = list.map(r=>review.rid===r.rid ? {...r, contents:e.target.value}:r);
        setList(data);
    }

    const onChageRating = (value, rid) => {
        const data = list.map(r=>r.rid===rid ? {...r, rating:value} : r);
        setList(data);
    }

    const onSave = async (review) => {
        if(!window.confirm(`수정?`)) return;
        await axios.post(`/review/update`, {contents:review.contents, rid:review.rid, rating:review.rating})
        callAPI();
    }


  return (
    <Container>
        <Row>
            <Col>
                {sessionStorage.getItem("uid") ?
                    <div>
                        <Row className='justify-content-center'>
                            <Col lg={4}>
                                <Rating
                                    name="hover-feedback"
                                    value={rating}
                                    precision={0.1}
                                    size='large'
                                    onChange={(e, newValue) => setRating(newValue)}
                                />
                            </Col>
                        </Row>
                        <Row className='justify-content-center'>
                            <Col lg={4}>
                                <Form.Control as={"textarea"} rows={10} placeholder='리뷰내용을 입력하세요' onChange={(e)=>setContents(e.target.value)}/>
                            </Col>
                        </Row>
                        <Row className='mt-2 justify-content-center'>
                            <Col lg={4}>
                                <div className='text-end'>
                                    <Button variant="contained" color="secondary" onClick={onInsert}>리뷰등록</Button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                :
                    <div>
                        <Button variant="contained" color="success">로그인하기</Button>
                    </div>
                    
                }
            </Col>
        </Row>
        <Row>
            <Col>
                {list.map(review=>
                    <Col key={review.rid}>
                        <div>작성자 : {review.uid}<span> 작성일 : {review.regDate}</span></div>
                        <Rating
                            name="hover-feedback"
                            value={review.rating}
                            precision={0.1}
                            size='large'
                            readOnly={!review.isEidt}
                            onChange={(e, newValue) =>onChageRating(newValue, review.rid)}
                        /><span> {review.rating}</span>
                            <div>
                                {uid === review.uid &&
                                    <>
                                        <Button variant="contained" color="success" onClick={()=>onUpdate(review.rid)}>수정</Button>
                                        <Button variant="outlined" color="error" onClick={()=>onDelete(review.rid)}>삭제</Button>
                                        {review.isEdit ? 
                                            <Form.Control as ='textarea' value={review.contents}    rows={5} onChange={()=>onChangeContents(review.rid)}/>
                                            :
                                            <div>{review.contents}</div>
                                        }
                                    </> 

                                }
                            </div>
                        
                        
                        
                        <hr/>
                    </Col>
                )}
            </Col>
        </Row>
    </Container>
  )
}

export default Review