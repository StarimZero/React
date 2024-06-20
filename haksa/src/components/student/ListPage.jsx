import React, {useEffect, useState, useContext} from 'react'
import { Button, Table, Row, Col, Container} from 'react-bootstrap'
import axios from 'axios'
import Pagination from 'react-js-pagination'
import '../../common/Paging.css'
import Box from '../../common/Box'
import { BoxContext } from '../../contexts/BoxContext'
import { Link } from 'react-router-dom'



const ListPage = () => {
    const {setBox} = useContext(BoxContext);
   
    const [list, setList] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);


    const callAPI = async () => {
        const url =`/stu?page=${page}&size=${size}&key=dept&word=`;
        const res =await axios.get(url);
        console.log(res.data)
        setList(res.data.list);
        setCount(res.data.total);
    }

    const onClickDelete = (scode) => {
        setBox({
            show : true,
            message:`${scode}학생의 정보를 삭제하시겠습니까?`,
            action : ()=>onDelete(scode)
        });
    }

    const onDelete = async (scode) => {
        if(!window.confirm("진짜삭제합니다잉?")) return;
        //삭제하기
        await axios.post(`/stu/delete/${scode}`)
                .then(()=>{
                    setPage(1)
                    callAPI();
                    alert("삭제했는데용?")
                })
                .catch(err=>{
                    alert("삭제할수없는데용?")
                    console.log(err)
                });
    }

    useEffect(()=>{
        callAPI();
    },[page])
    

  return (
    <Container>
        <div>
            <h1>학생목록</h1>
            <Table>
                
                {list.map(stu=>
                    <tr key={stu.scode}> 
                        <td><Link to={`/stu/read/${stu.scode}`}>{stu.scode}</Link></td>
                        <td>{stu.sname}</td>
                        <td>{stu.year}</td>
                        <td>{stu.dept}</td>
                        <td>{stu.pname && `${stu.pname}(${stu.advisor})`}</td>
                        <td>{stu.birthday}</td>
                        <td><Button size='sm' variant='outline-danger' onClick={()=>onClickDelete(stu.scode)}>삭제</Button></td>
                    </tr>
                )}

            </Table>
        </div>
        {count > size && 
        <Pagination
        activePage={page}
        itemsCountPerPage={size}
        totalItemsCount={count}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={(e)=>setPage(e)}/>
        }
    </Container>
  )
}

export default ListPage