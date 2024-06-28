import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Button, Row, Col, Form, InputGroup, Card, Container, Badge, Table } from 'react-bootstrap';
import axios from 'axios'
import { useEffect, useState, useRef } from 'react';
import ModalRealated from './ModalRealated';

const Detail = ({form, setForm, callAPI, good}) => {



    const [files, setFiles] = useState([]);
    const [attaches, setAttaches] = useState([]);
    const [related, setRelated] = useState([]);


    const callAttach = async () => {
        const res = await axios.get(`/goods/attach/${form.gid}`);
        //console.log(res.data);
        setAttaches(res.data);
    }

    const callRelated = async () => {
        const res1=await axios.get(`/goods/related/list/${form.gid}`);
        const data = res1.data.map(goods=>goods && {...goods, gid:goods.rid});
        console.log("관련상품등록한거" + data);
        setRelated(data);
    }
    

    useEffect(()=>{
        callAttach();
        callRelated();
    },[])



    const onClickSave = async () => {
        if(good.contents===form.contents) return;
        console.log(form.gid, form.contents);
        if(!window.confirm("상세정보를 저장하시겠습니까?")) return;
        await axios.post(`/goods/update/contents`, {gid:form.gid, contents:form.contents});
        alert("상세정보를 저장하였습니다.")
        callAPI();
    }



    const onChangeFile = (e) => {
        let selFiles=[]
        for(let i=0; i<e.target.files.length; i++){
            console.log("..........................");
            const file = {
                name:URL.createObjectURL(e.target.files[i]),
                byte:e.target.files[i]
            }
            selFiles.push(file);
        }
        setFiles(selFiles);
        console.log(files);
    }

    const onClickAttach = async () => {
        if(files.length === 0){
            alert("업로드할 사진을 선택하십시오.")
        }else{
            if(!window.confirm(`${files.length}개 파일을 업로드 하시겠습니까?`)) return;
            //파일업로드하기            //파일을 넘길려면 폼데이터가필요
            
            const formData = new FormData();
            for(let i=0; i<files.length; i++){
                formData.append("bytes", files[i].byte);
            }
            await axios.post(`/goods/attach/${form.gid}`, formData);
            alert("업로드완료")
            setFiles([]);
            callAttach();
        }
    }

    const onClickDelete = async (att) => {
        if(!window.confirm(`${att.aid}번 이미지를 삭제하시겠습니까?`)) return;
        //삭제하기
        await axios.post(`/goods/attach/delete`, att);
        alert("파일을 삭제하였습니다.");
        callAttach();
    }


    const onClickRelatedDelete = async (rid) => {
        if(!window.confirm(`${form.gid}-${rid} 삭제?`)) return;
        //관련상품삭제
        axios.post(`/goods/related/delete`, {gid : form.gid, rid})
        alert("삭제완료")
        callRelated();
    }




  return (
    <Tabs
      defaultActiveKey="home"
      id="fill-tab-example"
      className="mb-3"
      fill
    >
      <Tab eventKey="home" title={`${form.gid}상세정보`}>
        
        <CKEditor editor={ClassicEditor} data={form.contents} onChange={(e, editor)=>setForm({...form, contents:editor.getData()})}/>
        <Button onClick={onClickSave}>정보저장</Button>
      </Tab>
      <Tab eventKey="profile" title="첨부파일">
        <InputGroup>
            <Form.Control type="file" multiple={true} onChange={onChangeFile} />
            <Button onClick={onClickAttach}>첨부파일저장</Button>
        </InputGroup>
        <Row className='mt-3'>
            {files.map(file=>
            <Col>
                <img src={file.name} width={"100%"}/>
            </Col>
            )}
        </Row>
      </Tab>
      <Tab eventKey="photo" title="관련상품">
            <Row className='justify-content-center'>
                {attaches.map(att=>
                    <Col lg={11} className='text-center mb-3'key={att.adi}>
                        <div style={{position:"relative"}}>
                            <Badge bg='danger' style={{position:"absolute", left:"96%", cursor:"pointer"}} onClick={()=>onClickDelete(att)}>X</Badge>
                            <img src={att.filename} width={"100%"} style={{border:"1px solid gray"}}/>
                        </div>
                    </Col>
                )}
            </Row>
      </Tab>
      <Tab eventKey="rel" title="관련상품등록">
            <Row>
                <Col>
                    <ModalRealated gid={form.gid}/>
                    <Table>
                        <tbody>
                            {related.map(goods=>
                                <tr key={goods.rid}>
                                    <td>{goods.rid}</td>
                                    <td>{goods.title}</td>
                                    <td>{goods.fmtprice}</td>
                                    <td><Button size='sm' variant='outline-danger' onClick={()=>onClickRelatedDelete(goods.rid)}>삭제</Button></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
      </Tab>
    </Tabs>
  );
}

export default Detail