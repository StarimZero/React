import logo from './logo.svg';
import './App.css';
import MenuPage from './common/MenuPage';
import {useState} from 'react'
import { BoxContext } from './common/BoxContext';
import Box from './common/Box';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {

    const [box, setBox] = useState({
        show : false,
        message : "",
        action : null
    });

  return (
    <BoxContext.Provider value={{box, setBox}}>
        <div>
            <MenuPage/>
        </div>
        {box.show && <Box box={box} setBox={setBox}/>}
    </BoxContext.Provider>
  );
}

export default App;
