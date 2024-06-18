import React from 'react'
import { Container } from 'react-bootstrap'
import { Link, Route, Routes } from 'react-router-dom'
import HomePage from './HomePage'
import BBSRouter from './router/BBSRouter'
import UserRouter from './router/UserRouter'
import MessageRouter from './router/MessageRouter'
import MessagePage from './message/MessagePage'

const MenuPage = () => {

    const uid = sessionStorage.getItem("uid");
    const uname = sessionStorage.getItem("uname");
    

    
    const onLogout = (e) => {
        e.preventDefault();
        if(!window.confirm("로그아웃하시겠습니까?")) return;
        sessionStorage.clear();
        window.location.reload();
        window.location.href="/";
    }


  return (
    <Container >
        <div className='mt-3'>
            <Link to ="/" className='me-3' style={{ textDecoration: 'none', color: 'dodgerblue' }}>홈으로가기</Link>
            <Link to ="/bbs/list" className='me-3' style={{ textDecoration: 'none', color: 'green' }}>게시판으로가기</Link>
            {uid ?
                <>
                    <Link to ="/message" className='me-3' style={{ textDecoration: 'none', color: 'orange' }}>메세지</Link>
                    <Link to ="/user/read" className='me-3' style={{ textDecoration: 'none', color: 'red' }}>{uname}님 반갑습니다.</Link>
                    <Link to ="#" onClick={onLogout} style={{ textDecoration: 'none', color: 'purple' }}>로그아웃하기</Link>
                    
                </>
                :
                <>
                    <Link to ="/user/login" style={{ textDecoration: 'none', color: 'black' }}>로그인하기</Link>
                </>
                }
            <hr/>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/bbs/*' element={<BBSRouter/>}/>
                <Route path='/user/*' element={<UserRouter/>}/>
                <Route path='/message/*' element={<MessagePage/>}/>
            </Routes>
        </div>
    </Container>
  )
}

export default MenuPage