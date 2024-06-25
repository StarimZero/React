import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SearchPage from '../components/goods/SearchPage'
import ListPage from '../components/goods/ListPage'

const GoodsRouter = () => {




  return (
    <Routes>
        <Route path='search' element={<SearchPage/>}></Route>
        <Route path='list' element={<ListPage/>}/>
    </Routes>
  )
}

export default GoodsRouter