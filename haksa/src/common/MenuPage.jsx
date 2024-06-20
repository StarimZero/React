import React from 'react'
import { Link } from 'react-router-dom'
import RouterPage from '../router/RouterPage'
import { Button } from 'react-bootstrap'

const MenuPage = () => {



  return (

    <div>
        <div className='my-5 text-center'>
            <Link to ="/"><Button className='mx-3' variant='outline-primary'>홈으로</Button></Link>
            <Link to="/stu/list"><Button className='mx-3' variant='outline-warning'> 학생관리</Button></Link>
            <Link to="/stu/insert"><Button className='mx-3' variant='outline-danger'>학생등록</Button></Link>
            <Link to="/cou/list"><Button className='mx-3' variant='outline-success'>강좌관리</Button></Link>
            <hr/>
        </div>
        <RouterPage/>
    </div>


  )
}

export default MenuPage