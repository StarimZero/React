import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const ModalBook = ({book1}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {title, publisher, contents, isbn, price, authors, status} = book1; //비구조할당
    return (
        <>
          <img onClick={handleShow} 
          src={book1.thumbnail || "/images/dummy.png"} width="100%"/>
    
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false} 
          >
            <Modal.Header closeButton>
              <Modal.Title className='ellipsis1'>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>저자 : {authors}</div>
                <div>가격 : {price}</div>
                <div>출판사 : {publisher}</div>
                <div>상태 : {status}</div>
                <div>ISBN : {isbn}</div>
                <hr/>
                <div>{contents || '내용없음'}</div>
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

export default ModalBook