import axios from "axios";
import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalPhoto = ({uid, photo}) => {

    const ref_photo = useRef();

    const style ={
        borderRadius : "50%",
        border : "3px solid gray",
        cursor : "pointer"
    }

    const [image, setImage] = useState({
        name: "",
        file: null,
    });
    const {name, file} = image;
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
        setImage({
            name: photo,
            file: null
        })
    }
    
    const onChangeFile = (e) => {
        setImage({name:URL.createObjectURL(e.target.files[0]),
            file : e.target.files[0]
        })
    }

    const onClickSave =async () => {
        if(!file){
            alert("변경할 프로필 이미지를 선택하세요");
            return;
        }
        if(!window.confirm(uid + " 프로필 사진을 변경하시겠습니까?"))  return;
        //이미지 업로드 
        const data = new FormData();
        data.append("file", file);
        data.append("uid", uid);
        const res = await axios.post("/users/photo", data);
        if(res.data.result==1){
            handleClose();
            window.location.reload();
        }
    }

return (
    <>
        <img onClick={handleShow} src={photo || "http://via.placeholder.com/200x200"} width="90%" style={style} />
        <Modal show={show} onHide={handleClose} animation={false} style={{top:"15%"}}>
        <Modal.Header closeButton>
            <Modal.Title>프로필사진변경</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
            <img src={name || "http://via.placeholder.com/200x200"} width={"70%"} style={style} onClick={()=>ref_photo.current.click()}/>
            <input onChange={onChangeFile} type="file" ref={ref_photo} style={{display:"none"}}/>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-danger" onClick={handleClose}> 닫기 </Button>
            <Button variant="outline-success" onClick={onClickSave}> 변경하기 </Button>
        </Modal.Footer>
        </Modal>
    </>
    );
};

export default ModalPhoto;
