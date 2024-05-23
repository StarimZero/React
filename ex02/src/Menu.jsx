import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import RouterPage from './components/RouterPage';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
    const navi = useNavigate();
    const onClicklogout = (e) => {
        e.preventDefault();
        if(window.confirm("로그아웃 하시겠습니까?")){
            sessionStorage.clear();
            navi('/');
        }
    }
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand href="/">Starim</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Nav.Link href="/local/search">지역검색</Nav.Link>
                    <Nav.Link href="/book/search">도서검색</Nav.Link>
                    <Nav.Link href="#action3">예비3</Nav.Link>
                    <Nav.Link href="#action4">예비4</Nav.Link>
                    <Nav.Link href="#action5">예비5</Nav.Link>
                    <Nav.Link href="#action6">예비6</Nav.Link>
                </Nav>
                {sessionStorage.getItem("email") ?
                    <>
                        <Nav>
                            <Nav.Link href="/">{sessionStorage.getItem("email")}</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/" onClick={onClicklogout}>로그아웃</Nav.Link>
                        </Nav>
                    </>
                    :
                    <Nav>
                        <Nav.Link href="/user/login">로그인</Nav.Link>
                    </Nav>
                }
                </Navbar.Collapse>
            </Container>
            </Navbar>
            <RouterPage/>
        </>
      );
}

export default Menu