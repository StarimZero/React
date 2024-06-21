import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Container, Row, Col, Table, Button, Card } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import EnrollList from './EnrollList'
import { BoxContext } from '../../contexts/BoxContext'
import { app } from '../../firebaseinit'
import {getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage'


const ReadPage = () => {


    const {setBox} = useContext(BoxContext);
    

    const [file, setFile] = useState({
        fileBytes : null,
        fileName : ""
    });
    const style={
        width:"60%",
        cursor:"pointer",
        border:"1px dotted gray",
        borderRadius: 50
    }

    const storage = getStorage(app);

    const refFile = useRef("");
    
    const {fileBytes, fileName} = file;

    const [course, setCourse] = useState("");
    const {lcode} = useParams();

    const{lname, room, instructor, pname, persons, capacity, photo} = course
    
    const callAPI  = async () => {
        const res= await axios.get(`/cou/${lcode}`)
        console.log(res.data);
        setCourse(res.data);
        setFile({fileBytes:null, fileName:res.data.photo});
    }

    

    useEffect(()=>{
        callAPI();
    },[])

    const onChangeFile= (e) => {
        setFile({
            fileBytes : e.target.files[0],
            fileName : URL.createObjectURL(e.target.files[0])
        })
    }

    const onUploadPhoto = async () => {
        if(!fileBytes){
            setBox({show:true, message:"업로드할 이미지를 선택하세요"});
            return;
        }
        //업로드
        const snapshot = await uploadBytes(ref(storage, `/photo/${lcode}/${Date.now().jsp}`), fileBytes);
        const url = await getDownloadURL(snapshot.ref);
        console.log(url);
        alert("사진등록완료");
        await axios.post(`/cou/update/photo`, {lcode, photo:url});
        callAPI();
    }

  return (
    <Container>
        <Row style={{height:"1rem"}}>

        </Row>
        <Row className='justify-content-center'>
            <Col lg={4}>
                <Card>
                    <Card.Header>
                        <h3 className='text-center'>{lcode} - {lname}</h3>
                        <div className='text-center'>
                            <img src={fileName || "http://via.placeholder.com/50x50" }style={style} onClick={()=>refFile.current.click()} />
                            <input type='file' ref={refFile} style={{display:"none"}} onChange={onChangeFile}/>
                        </div>
                        <div className='text-center mt-2'>
                            <Button variant='secondary' size='sm' onClick={onUploadPhoto}>사진저장하기</Button>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Table>
                            <tbody className='text-center'>
                                <tr>
                                    <td>강의번호</td>
                                    <td>{lcode}</td>
                                </tr>
                                <tr>
                                    <td>강좌이름</td>
                                    <td>{lname}</td>
                                </tr>
                                <tr>
                                    <td>강의교수</td>
                                    <td>{instructor}({pname})</td>
                                </tr>
                                <tr>
                                    <td>강의실</td>
                                    <td>{room}</td>
                                
                                </tr>
                                <tr>
                                    <td>현재인원</td>
                                    <td>{persons}</td>                                
                                </tr>
                                <tr>
                                    <td>지도교수</td>
                                    <td>{capacity}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Card.Footer>
                        <Link to={`/cou/update/${lcode}`}><Button variant='outline-info' style={{width:"100%"}}>정보수정</Button></Link>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
        <hr/>
        <Row>
            <Col>
                <EnrollList lcode={lcode}/>
            </Col>
        </Row>
    </Container>
  )
}

export default ReadPage