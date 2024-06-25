import { Button, Row, Col } from 'react-bootstrap'
import React from 'react'
import { Link } from 'react-router-dom'
import RouterPage from '../routers/RouterPage'
import { FaHome } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";



const MenuPage = () => {
  return (
    <>
        <Row className='mt-2' >
            <Col lg={1} className='text-center'>
                <Link to="/"><FaHome style={{color:"black"}} size={40}/></Link>
            </Col>
            <Col>
                <Link to="goods/search"><Button size='sm' variant='outline-primary' className='me-4'>상품검색</Button></Link>
                <Link to="goods/list"><Button size='sm' variant='outline-danger'>상품목록</Button></Link>
            </Col>
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

export default MenuPage