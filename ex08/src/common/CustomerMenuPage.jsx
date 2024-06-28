import { Row, Col, Button } from 'react-bootstrap'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import RouterPage from '../routers/RouterPage'
import { FaHome } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import Header from './Header';

const CustomerMenuPage = () => {

    const onClickLogout = (e) => {
        e.preventDefault();
        if(!window.confirm("로그아웃 하시겠습니까?")) return;
        sessionStorage.clear();
        window.location.reload();
    }



  return (
    <>
        <Row>
            <Col lg={1} style={{background:"black"}}>
            </Col>
            <Col lg={10} style={{background:"black"}}>
                <Header/>
            </Col>
            <Col lg={1} style={{background:"black"}}>
            </Col>
        </Row>
        <Row className='mt-2' >
            <Col lg={1} className='text-center'>
                <Link to="/"><FaHome style={{color:"black"}} size={40}/></Link>
            </Col>
            
            {sessionStorage.getItem("uid") ?
                <>
                    <Col>
                        <Link to="/goods/cart"><Button size='sm' variant='outline-primary' className='me-4'>주문목록</Button></Link>
                        <Link to="/orders/list"><Button size='sm' variant='outline-danger'>장바구니</Button></Link>
                    </Col>
                    <Col className='text-end me-5'>
                        <Link to="/"><Button size='sm' variant='outline-danger' onClick={onClickLogout} className='me-3'>로그아웃</Button></Link>
                        <Link to='/users/mypage' className='me-3' style={{ textDecoration: "none", color: "black" }}> {sessionStorage.getItem('uid')}님 </Link>
                    </Col>
                    
                </>
            :
                <Col className='text-end me-5'><Link to="users/login"><Button size='sm' variant='outline-danger'>로그인</Button></Link></Col>
            }
        </Row>
        <hr/>
        <Row className='mt-5'>
            <Col lg={1} className='text-center'>
                <FaInstagramSquare size={50} />
            </Col>
            <Col>
            
            </Col>
        </Row>
        <RouterPage/>
    </>
  )
}

export default CustomerMenuPage