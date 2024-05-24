import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form }from 'react-bootstrap'
import  { app } from '../../firebaseInit'
import { getStorage, uploadBytes, ref, getDownloadURL} from 'firebase/storage'
import { getFirestore, setDoc, doc} from 'firebase/firestore'

const ModalPhoto = ({setForm, setLoading, form}) => {
    const storage = getStorage(app);
    const db = getFirestore(app);
    const uid = sessionStorage.getItem("uid");
    
    const [fileName, setFileName] = useState(form.photo);
    const [file, setFile] = useState(null);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const handleClose = () => {
        setShow(false)
        setTimeout(()=>{
            setFileName(form.photo);
        }, 5000)
        
    }

    const onChangeFile = (e) =>{
      setFileName(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
    }
    
    const onClickSave = async () =>{
        if(fileName===""){
            alert("변경할 이미지를 선택하세요");
            return;
        }
        if(!window.confirm("프로필 사진을 변경하시겠습니까?")) return;
        //사진저장
        setLoading(true);
        const res=await uploadBytes(ref(storage, `photo/${Date.now()}.jpg`), file);
        const url=await getDownloadURL(res.ref);
        console.log(url);

        await setDoc(doc(db, 'users', uid), {...form, photo:url});
        setForm({...form, photo:url});

        setLoading(false);
        alert("사진 등록 완료");
    }

return (
  <>
    <img src={form.photo || "http://via.placeholder.com/200x300"}
      width="100%"
      onClick={handleShow}
    />
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>사진변경</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <img
          src={ fileName || "http://via.placeholder.com/200x200" }
          style={{ borderRadius: "50%" }}
          width="50%"
        />
        <Form.Control onChange={onChangeFile} type="file" className="mt-3" />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} >
          닫기
        </Button>
        <Button variant="primary" onClick={onClickSave}>저장</Button>
      </Modal.Footer>
    </Modal>
  </>
);
}

export default ModalPhoto