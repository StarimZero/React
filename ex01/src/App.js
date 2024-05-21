import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Row, Col, Container} from 'react-bootstrap';


import BookSearch from './components2/BookSearch';

const App = () => {
  return (
    <Container>
      <hr/>
      <BookSearch/>
    </Container>
  );
}

export default App; 

// app을 export하는거임 그래야 다른곳에서 import가능 //
