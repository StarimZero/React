import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DaumPostcodeEmbed from 'react-daum-postcode';

const ModalAddress = ({form, setForm,}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onComplete = (e) =>{
        console.log(e)
        const add = e.buildingName ? `${e.address}(${e.buildingName})` : e.address;
        setForm({
            ...form,
            add1:add
        })
        handleClose();
    }
return (
    <>
      <Button variant="primary" onClick={handleShow} size="sm">
        주소검색
      </Button>

      <Modal
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