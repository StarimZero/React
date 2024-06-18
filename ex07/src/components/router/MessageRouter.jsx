import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MessagePage from '../message/MessagePage'
import InsertPage from '../message/InsertPage'
import SendPage from '../message/SendPage'
import ReceivePage from '../message/ReceivePage'
import ReadSend from '../message/ReadSend'
import ReadReceivePage from '../message/ReadReceivePage'
import DeletePage from '../message/DeletePage'

const MessageRouter = () => {




  return (
    <Routes>
        <Route path='/insert' element={<InsertPage/>}/>
        <Route path='/send' element={<SendPage/>}/>
        <Route path='/receive' element={<ReceivePage/>}/>
        <Route path='/send/:mid' element={<ReadSend/>}/>
        <Route path='/receive/:mid' element={<ReadReceivePage/>}/>
        <Route path='/delete' element={<DeletePage/>}/>
    </Routes>
  )
}

export default MessageRouter