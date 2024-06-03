import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import RouterPage from './RouterPage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { RiShoppingBag2Fill } from "react-icons/ri";
import Badge from 'react-bootstrap/Badge';
import { CountContext } from './CountContext';



const MenuPage = () => {
    
    const navi = useNavigate();
    const uid = sessionStorage.getItem("uid");
    const [user, setUser] = useState("");
    const {count} = useContext(CountContext);
    
    const callAPI = async () => {
        const url = `/users/read/${uid}`;
        const res = await axios.get(url);
        setUser(res.data);
    }

    const onClickLogout = (e) =>{
        e.preventDefault();
        if(window.confirm("로그아웃 하시겠습니까?")){
            sessionStorage.clear();
            navi("/");
        }
            
    }

    
    useEffect(() => {
        if(uid) callAPI();
    }, [uid])
    
    return (
        <>
            <Navbar expand="lg" className="bg-success">
            <Container fluid>
                <Navbar.Brand href="/">📔📕📖📗📘📙📚📓📒</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Nav.Link href="/books/search">도서검색</Nav.Link>
                    <Nav.Link href="/books/list">도서목록</Nav.Link>
                    <Nav.Link href="/books/temp">예비</Nav.Link>
                </Nav>
               

                {uid ?
                <>
                <Nav>
                    <Nav.Link href="/orders/cart" className='active'>
                        {count === 0 ?
                           <RiShoppingBag2Fill style={{fontSize:"40px"}} />
                        :
                        <>
                            <RiShoppingBag2Fill style={{fontSize:"40px", position:"absolute"}} />
                            <Badge bg="danger" style={{position:"relative", top:"-10px", left:"25px"}}>
                                {count}
                            </Badge>
                        </>
                        }
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="/users/mypage" className='active' style={{color:"white"}}>{uid}({user.uname})님 환영합니다.</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="#" onClick={onClickLogout}>로그아웃</Nav.Link>
                </Nav>
                </>
                :
                <Nav>
                    <Nav.Link href="/users/login">로그인</Nav.Link>
                </Nav>
                }
                </Navbar.Collapse>
            </Container>
            </Navbar>
            <RouterPage/>
        </>
      );
}

export default MenuPage