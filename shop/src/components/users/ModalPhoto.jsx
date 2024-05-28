import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const ModalPhoto = ({uid, photo, callAPI }) => {
    
    const [fileName, setFileName] = useState(photo);
    const [file, setFile] = useState(null);
    const refPhoto = useRef(null);
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setFileName(photo);
    }

    const handleShow = () => setShow(true);

    const style={
        width : "150px",
        borderRadius : "50%",
        cursor : "pointer",
        border : "5px solid gray"
    }

   

    const onChangeFile =(e) =>{
        setFileName(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }

    const onClickSave = async () => {
        if(!file){
            alert("변경할 이미지를 선택해주세요")
            return;
        }
        if(!window.confirm("선택한 이미지로 변경하시겠습니까?")) return;
        //이미지업로드. 
        const formData = new FormData();
        formData.append("file", file);
        formData.append("uid", uid);
        const res = await axios.post("/users/photo", formData);

        if(res.data.result==1){
            alert("프로필 사진을 변경하였습니다.")
            callAPI();
            handleClose();
        }
    }


    useEffect(()=>{
        setFileName(photo);
    },[photo]);

  return  (
    <>
        <img src={photo || "http://via.placeholder.com/300x300"} onClick={handleShow} width="300px" />
        
      <Modal
        style={{top:"20%"}}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>프로필 사진 변경</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
            <img onClick={()=>refPhoto.current.click()} src={fileName || "http://via.placeholder.com/300x300"} style={style} />
            <input ref={refPhoto} type="file" style={{display:'none'}} onChange={onChangeFile} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleClose}>
            취소
          </Button>
          <Button variant="outline-primary" onClick={onClickSave}>저장</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalPhoto