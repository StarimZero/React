import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DaumPostcodeEmbed from 'react-daum-postcode';


const ModalAddress = (props) => {
    const {form, setForm} = props;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onComplete = (e) =>{
        console.log(e);
        //주소클릭하면 주소에 넣기
        const address = e.buildingName ? `${e.address}(${e.buildingName})` : e.address;
        setForm({...form, add1:address});
        handleClose();
    }


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        주소검색
      </Button>
        
      <Modal style={{top:"20%"}}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>주소검색</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DaumPostcodeEmbed onComplete={onComplete}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddress