import React from 'react'
import { Col, Container, Row, Card, InputGroup, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import Detail from './Detail';

const UpdatePage = () => {

    const {gid} = useParams();
    const refFile = useRef();
    const [file, setFile] = useState({
        name:"",
        byte:null
    });
    const [good, setGood] = useState("");
    const [form, setForm] = useState({
        title : "",
        price : 0,
        image:"",
        maker:"",
        brand:""
    });
    const {title, price, image, maker, brand} = form;
    
    const callAPI = async () => {
        const res = await axios.get(`/goods/read/${gid}`);
        console.log(res.data);
        const data={...res.data, price:res.data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), contents:res.data.contents || ""}
        setForm(data);
        setGood(data);
        setFile({name:res.data.image, byte:null})
    }

    useEffect(()=>{
        callAPI();
    },[])

    const onChangeForm = (e) => {
        if(e.target.name==='price'){
            let price=e.target.value.replace(/[^0-9]/g,''); //숫자만입력
            price=price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); //세자리 컴마
            setForm({...form, price});
        }else{
            setForm({...form, [e.target.name]:e.target.value});
        }
    }

    const onClickReset = () => {
        if(JSON.stringify(good)===JSON.stringify(form)) return;
        if(!window.confirm("수정사항이 취소됩니다.")) return;
        callAPI();
    }

    const onClickUpdate = async () => {
        if(JSON.stringify(good)===JSON.stringify(form)){
            alert("변경된 사항이 없습니다.")
            return;
        }else{
            if(!window.confirm("제품정보를 수정하시겠습니까?")) return;
            await axios.post('/goods/update/:gid', {...form, price:price.replace(',','')});
            callAPI();
            alert("상품수정완료")
        }
    }

    const onChangeFile = (e) => {
        setFile({
            name:URL.createObjectURL(e.target.files[0]),
            byte:e.target.files[0]
        });
    }

    const onClickImageSave = async () => {
        if(file.byte===null) {
            alert("변경하실 이미지를 선택해주세요")
        }else{
            if(!window.confirm("변경된 이미지로 저장하시겠습니까?")) return;
            //이미지저장
            const formData = new FormData();
            formData.append("byte", file.byte);
            await axios.post(`/goods/update/image/${gid}`, formData);
            alert("이미지 변경 완료")
            callAPI();
        }
    }

  return (
    <Container>
        <Row className='mb-5'>
            <Col className='text-center'>
                <h1>상품수정페이지입니다.</h1>
            </Col>
        </Row>
        <Row className='justify-content-center'>
            <Col lg={7}>
                <Card>
                    <Card.Header>
                        상품코드 : {gid}
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col lg={4}>
                                <img src={file.name || "http://via.placeholder.com/150x170"} width={"100%"} style={{cursor:"pointer"}} onClick={()=>refFile.current.click()}/>
                                <div className='text-center'>
                                    <Button size='small' variant="contained" color='primary' className='mt-1' onClick={onClickImageSave}>이미지저장</Button>
                                    <input type="file" onChange={onChangeFile} style={{display:'none'}} ref={refFile}/>
                                </div>
                            </Col>
                            <Col className='mt-4'>
                                <InputGroup className='mb-2'>
                                    <InputGroup.Text>상품이름</InputGroup.Text>
                                    <Form.Control value={title} name='title' onChange={onChangeForm}/>
                                </InputGroup>
                                <InputGroup className='mb-2'>
                                    <InputGroup.Text>상품가격</InputGroup.Text>
                                    <Form.Control value={price} name='price' onChange={onChangeForm}/>
                                </InputGroup>
                                <InputGroup className='mb-2'>
                                    <InputGroup.Text>제조사명</InputGroup.Text>
                                    <Form.Control value={maker} name='maker' onChange={onChangeForm}/>
                                </InputGroup>
                                <InputGroup className='mb-2'>
                                    <InputGroup.Text>브랜드명</InputGroup.Text>
                                    <Form.Control value={brand} name='brand' onChange={onChangeForm}/>
                                </InputGroup>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        <div className='text-end'>
                            <Button color="error" variant="contained" className='me-3' onClick={onClickReset}>취소하기</Button>
                            <Button color="secondary" variant="contained" onClick={onClickUpdate}>수정하기</Button>
                        </div>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
        <Row className='justify-content-center mt-3' >
            <Col lg={7}>
                {form && form.gid && (
                <Detail form={form} setForm={setForm} callAPI={callAPI} good={good}/>
                )}
            </Col>
        </Row>
    </Container>
  )
}

export default UpdatePage