import './App.css';
import BottomPage from './components/BottomPage';
import MenuPage from './components/MenuPage';
import TopPage from './components/TopPage';
import { Container } from 'react-bootstrap';

function App() {
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