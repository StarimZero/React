import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import RouterPage from './RouterPage';
import { useLocation, useNavigate } from 'react-router-dom';

const MenuPage = () => {

    const navi = useNavigate();
    const {pathname}= useLocation()
    console.log(pathname)

    const onLogout = (e) => {
        e.preventDefault();
        if(!window.confirm("로그아웃?")) return;
        sessionStorage.clear()
        navi('/');
    }
    return (
        <>
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/shop/search" className={pathname==='/shop/search' && 'active'}>
                            상품검색
                        </Nav.Link>
                        <Nav.Link href="/shop" className={pathname==='/shop' && 'active'}>
                            상품목록
                        </Nav.Link>
                    </Nav>

                    {sessionStorage.getItem('email') ?
                    <Nav>
                        <Nav.Link href="/mypage">
                            {sessionStorage.getItem('email')}님
                        </Nav.Link>
                        <Nav.Link href="#" onClick={onLogout}>
                            로그아웃
                        </Nav.Link>
                    </Nav>
                    :
                    <Nav>
                        <Nav.Link href="/login" className={pathname==='/login' && 'active'}>
                            로그인
                        </Nav.Link>
                    </Nav>
                    }
                </Container>
            </Navbar>
            <RouterPage/>
        </>
    )
}

export default MenuPage