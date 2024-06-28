import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/users/Login'
import JoinPage from '../components/users/JoinPage'

const UserRouter = () => {
  return (
    <Routes>
        <Route path='login' element={<Login/>}/>
        <Route path='join' element={<JoinPage/>}/>
    </Routes>
  )
}

export default UserRouter