import axios from 'axios';
import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalImage = ({bigimage, callAPI, bid}) => {
    
    const refImage = useRef(null);

    const style = {
        cursor : "pointer"
    }

    const [bigImage, setBigImage] = useState({
        fileName:'',
        file:null
      });
      const {fileName, file} = bigImage;
      const onChangeFile = (e) => {
        setBigImage({
          fileName:URL.createObjectURL(e.target.files[0]),
          file:e.target.files[0]
        });
      }
    const [show, setShow] = useState(false);
    const handleClose = () => {
       setShow(false);
    }
    const handleShow = () => {
        setShow(true);
        setBigImage({
            file:null,
            fileName:bigimage
        })
    }

    const onClickSave = async () =>{
        if(file===null){
            alert("변경하실 이미지를 선택하세요");
            return;
        }
        if(!window.confirm("이미지를 변경하시겠습니까?")) return;
        //사진저장
        const formData = new FormData();
        formData.append("file", file);
        formData.append("bid", bid);
        const res = await axios.post("/books/upload", formData);
        if(res.data.result===1){
            alert("이미지를 변경하였습니다.")
            callAPI();
            handleClose();
        }
    }


  return (
    <>
        <img style={style} src={bigimage || '/images/book.png'} width="100%" onClick={handleShow}/>
 

      <Modal style={{top:"1%"}}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>이미지변경</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
            <img  style={style} src={fileName || '/images/book.png'} width="100%" onClick={()=>refImage.current.click()}/>
            <input ref={refImage} type='file' onChange={onChangeFile} style={{display:"none"}} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}> 닫기 </Button>
          <Button variant="primary" onClick={onClickSave}>변경</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalImage