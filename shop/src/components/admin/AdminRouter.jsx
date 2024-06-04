import React from 'react'
import { Routes, Route } from 'react-router-dom'
import OrderList from './OrderList'
import HomePage from '../HomePage'

const AdminRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path='/admin/orders' element={<OrderList/>}/>
    </Routes>
  )
}

export default AdminRouter