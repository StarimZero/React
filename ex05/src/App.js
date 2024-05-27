import './App.css';
import { Container } from 'react-bootstrap';
import BottomPage from './components/BottomPage';
import TopPage from './components/TopPage';
import MenuPage from './components/MenuPage';


const App = () => {
    return (
        <Container>
           <TopPage/>
           <MenuPage/>
           <hr/>
           <BottomPage/>
        </Container>
    );
}

export default App;
