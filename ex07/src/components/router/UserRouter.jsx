import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../user/LoginPage'
import ReadPage from '../user/ReadPage'




const BBSRouter = () => {
  return (
    <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path="/read" element={<ReadPage/>}/>
    </Routes>
  )
}

export default BBSRouter