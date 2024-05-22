import './App.css';
import { Container } from 'react-bootstrap';
import Header from './Header';
import Bottom from './Bottom';
import Menu from './Menu';

const App = () => {
    return (
        <Container>
            <Header/>
            <Menu/>
            <hr/>
            <Bottom/>
        </Container>
    );
}

export default App;
