import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SearchPage from '../components/goods/SearchPage'
import ListPage from '../components/goods/ListPage'
import UpdatePage from '../components/goods/UpdatePage'

const GoodsRouter = () => {




  return (
    <Routes>
        <Route path='search' element={<SearchPage/>}></Route>
        <Route path='list' element={<ListPage/>}/>
        <Route path='list/update/:gid' element={<UpdatePage/>}/>
    </Routes>
  )
}

export default GoodsRouter