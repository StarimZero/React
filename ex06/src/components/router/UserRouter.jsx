import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../user/LoginPage'




const BBSRouter = () => {
  return (
    <Routes>
        <Route path='/login' element={<LoginPage/>}/>
    </Routes>
  )
}

export default BBSRouter