import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage'
import BBSListPage from './bbs/BBSListPage'
import LoginPage from './users/LoginPage'
import InsertPage from './bbs/InsertPage'
import ReadPage from './bbs/ReadPage'
import UpdatePage from './bbs/UpdatePage'
import SearchPage from './shop/SearchPage'
import ShopListPage from './shop/ShopListPage'
import ShopReadPage from './shop/ShopReadPage'


const RouterPage = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/bbs" element={<BBSListPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path='/bbs/insert' element={<InsertPage/>}/>
      <Route path='/bbs/:bbs_id' element={<ReadPage/>}/>
      <Route path='/bbs/update/:bbs_id' element={<UpdatePage/>}/>
      <Route path='/shop/search' element={<SearchPage/>}/>
      <Route path='/shop' element={<ShopListPage/>}/>
      <Route path='/shop/:id' element={<ShopReadPage/>}/>
    </Routes>
  )
}

export default RouterPage