import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaQuestionCircle } from "react-icons/fa";
import { BsQuestionCircleFill } from "react-icons/bs";
import { BsPatchExclamationFill } from "react-icons/bs";




const Box = ({box, setBox}) => {


//예버튼
const onAction = () => {
    box.action();
    onClose();
}
//알아따
const onClose = () => {
  if(box.action2) {
    box.action2();
  }
  setBox({...box, show:false});
}

//아니어
const onCancel = () => {
  setBox({...box,show:false});
}




  return (
    <>
      <Modal
        style={{top:"20%"}}
        show={box.show}
        onHide={onClose}
        backdrop="static"
        keyboard={false}
        size="sm"
      >
        <Modal.Header closeButton>
            {box.action ?
                <>
                    <Modal.Title><BsQuestionCircleFill /><BsQuestionCircleFill /><BsQuestionCircleFill /><BsQuestionCircleFill /></Modal.Title>
                </>
                :
                <>
                    <Modal.Title><h1>알림 <BsPatchExclamationFill size={10}/></h1></Modal.Title>
                </>
            }
        </Modal.Header>
        <Modal.Body>
          {box.message}
        </Modal.Body>
        <Modal.Footer>
            {box.action ? 
                <>
                    <Button variant="outline-secondary" onClick={onCancel}>아니오?</Button>
                    <Button variant="outline-primary" className='px-4' onClick={onAction}>예?</Button>
                </>

            :    
                <>
                    <Button variant="outline-warning" onClick={onClose}>알아따</Button>
                </>
            }
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Box