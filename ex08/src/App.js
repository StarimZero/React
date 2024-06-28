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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomerMenuPage from './common/CustomerMenuPage';

function App() {

    const [box, setBox] = useState({
        show : false,
        message : "",
        action : null
    });

    const [user, setUser] = useState({
      uid:"",
      uname:""
    })

  return (
    <BoxContext.Provider value={{box, setBox, user, setUser}}>
        {sessionStorage.getItem("uid")==="admin" ?
            <div>
                <MenuPage/>
            </div>
            :
            <div>
                <CustomerMenuPage/>
            </div>
        }
        {box.show && <Box box={box} setBox={setBox}/>}
    </BoxContext.Provider>
  );
}

export default App;
