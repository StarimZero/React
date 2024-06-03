import axios from 'axios';
import './App.css';
import BottomPage from './components/BottomPage';
import MenuPage from './components/MenuPage';
import TopPage from './components/TopPage';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { CountContext } from './components/CountContext';

function App() {
  const [count, setCount] = useState(0);
  const callAPICount = async () => {
    const res=await axios.get(`/cart/list?uid=${sessionStorage.getItem('uid')}`);
    setCount(res.data.length);
  }

  useEffect(()=>{
    callAPICount();
  },[])

  return (
    <CountContext.Provider value={{count, setCount, callAPICount}}>
      <Container>
          <TopPage/>
          <MenuPage/>
          <hr/>
          <BottomPage/>
      </Container>
    </CountContext.Provider>
  );
}

export default App;