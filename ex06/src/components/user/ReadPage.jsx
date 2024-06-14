import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Button, Container, Row, Col, Card, InputGroup, Form} from 'react-bootstrap'
import AddressModal from '../common/AddressModal';
import PassModal from './PassModal';

const ReadPage = () => {

    const uid = sessionStorage.getItem("uid");
    const [user, setUser] = useState('');
    const {uname, address1, address2, phone, photo,} = user;
    const refFile = useRef();

    const photoStyle ={
        borderRadius : "10px",
        cursor: "pointer",
        border : "10px groove gray"
    }


    const [image, setImage] = useState({
        fileName : "",
        file : null
    })
    const onChangeFile = (e) => {
        setImage({fileName:URL.createObjectURL(e.target.files[0]), file:e.target.files[0]})
    }
    const {file, fileName} = image;



    const callAPI = async () => {
        const res = await axios.get(`/users/${uid}`);
        console.log(res.data)
        setUser(res.data);
        setImage({...image, fileName:res.data.photo && `/display?file=${res.data.photo}`});
    }

    useEffect(()=>{
        callAPI();
    },[])

    const onChangeForm = (e) => {
        setUser({...user, [e.target.name]:e.target.value});
    }    

    const onInsert = async () => {
        if(!window.confirm("정보를 수정하시겠습니까?")) return;
        await axios.post(`/users/update`, user)
        alert("정보수정 완료")
    }

    const onUploadImage =async () => {
        if(file){
            if(!window.confirm("변경된 이미지를 저장하시겠습니까?")) return;
            //사진저장하기
            const formData = new FormData();
            formData.append("file", file);
            const config={
                Headers:{"content-type":"multipart/form-data"}
            };
            await axios.post(`/users/photo/${uid}`, formData, config)
            alert("사진을 변경하였습니다.")
            setImage({file:null, fileName:""});
            callAPI();
        }else{
            alert("사진을 변경해주세요")
        }
    }

  return (
    <Container>
        <Row className='justify-content-center my-5'>
            <Col lg={8}>
                <Card >
                    <Card.Header>
                        <Row>
                            <Col>
                                <div>
                                    <b>{uname}</b>님의 개인정보 수정페이지입니다. 　　　　　　　　　　　　　　가입일 : {user.regDate}
                                </div>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col lg={4}>
                                <img src={fileName || "http://via.placeholder.com/250x260"} style={photoStyle} width="100%" onClick={()=>refFile.current.click()}  />
                                <input ref={refFile} type='file' onChange={onChangeFile} style={{display:"none"}}/>
                                <Button variant='outline-success' size='sm' className='mt-1 w-100' onClick={onUploadImage}>이미지 저장</Button>
                            </Col>
                            <Col className='mt-3'>
                                <InputGroup className='mb-1'>
                                    <InputGroup.Text>이름</InputGroup.Text>
                                    <Form.Control value={uname}  />
                                    <PassModal/>
                                </InputGroup>
                                <InputGroup className='mb-1'>
                                    <InputGroup.Text>전화</InputGroup.Text>
                                    <Form.Control value={phone} onChange={onChangeForm} name="phone" />
                                </InputGroup>
                                <InputGroup className='mb-1'>
                                    <InputGroup.Text>주소</InputGroup.Text>
                                    <Form.Control value={address1} onChange={onChangeForm} name="address1"  />
                                    <AddressModal setForm={setUser} form={user}/>
                                </InputGroup>
                                <InputGroup className='mb-1'>
                                    <Form.Control value={address2} onChange={onChangeForm} name="address2" />
                                </InputGroup>
                                <hr/>
                                <div className='text-end'>
                                    <Button size="sm" className='me-2' variant='outline-danger'>수정취소</Button>
                                    <Button size="sm" variant='outline-primary' onClick={onInsert}>수정하기</Button>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        <h1>발</h1>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    </Container>
  )
}

export default ReadPage