import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Button, Row, Col, Form, InputGroup} from 'react-bootstrap';
import axios from 'axios'
import { useEffect, useState, useRef } from 'react';

const Detail = ({form, setForm, callAPI, good}) => {



    const [files, setFiles] = useState([]);




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
            <Form.Control type="file" multiple={true} onChange={onChangeFile}/>
            <Button>첨부파일저장</Button>
        </InputGroup>
        <Row className='mt-3'>
            {files.map(file=>
            <Col>
                <img src={file.name} width={"100%"}/>
            </Col>
            )}
        </Row>
      </Tab>
    </Tabs>
  );
}

export default Detail