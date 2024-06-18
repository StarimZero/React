import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DaumPostcodeEmbed from 'react-daum-postcode'


const AddressModal = ({setForm, form}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onComplete =(e) => {
        console.log(e)
        const address=e.buildingName ? `${e.address}(${e.buildingName})` : e.address;
        setForm({...form, address1:address});
        handleClose();
    }

  return  (

    <>
      <Button variant="primary" onClick={handleShow}> 주소검색 </Button>

      <Modal show={show} onHide={handleClose} animation={false} style={{top:"10%"}}>
        <Modal.Header closeButton>
          <Modal.Title>주소찾기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <DaumPostcodeEmbed onComplete={onComplete}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>닫기</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddressModal