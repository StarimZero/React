import React, { useEffect, useState } from 'react'
import {app} from '../../firebaseInit'
import { getDatabase, ref, onValue, remove} from 'firebase/database'
import Spinner from 'react-bootstrap/Spinner';
import { Table, Row, Col, Tab, Button } from 'react-bootstrap'
import ModalMap from './ModalMap'

const FavoritePage = () => {
  const [loading, setLoading] = useState(false);
  const [locals, setLocals] = useState([]);
  const db = getDatabase(app);
  const uid = sessionStorage.getItem("uid");

  const callAPI = () =>{
    setLoading(true);
    onValue(ref(db, `favorite/${uid}`), res=>{
        let rows = [];
        let count = 0;
        res.forEach(row=>{
            count++;
            rows.push({no:count, key:row.key, ...row.val()});
        });
        console.log(rows);
        setLocals(rows);
        setLoading(false);
    })
  }

  useEffect(()=>{
    callAPI();
  }, []);
  const onClickDelete = (local) =>{
    if(window.confirm(`"${local.place_name}" 즐겨찾기에서 제외하시겠습니까?`)){
        remove(ref(db, `favorite/${uid}/${local.key}`));
    }
  }

  if(loading) return <div>
    <>
            <Spinner animation="border" variant="primary" />
            <Spinner animation="border" variant="secondary" />
            <Spinner animation="border" variant="success" />
            <Spinner animation="border" variant="danger" />
            <Spinner animation="border" variant="warning" />
            <Spinner animation="border" variant="info" />
            <Spinner animation="border" variant="light" />
            <Spinner animation="border" variant="dark" />
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="warning" />
            <Spinner animation="grow" variant="info" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="dark" />
        </>
  </div>
  return (
    <div className='my-5'>
      <h1 className='my-5 text-center'>즐겨찾기</h1>
      <Table>
        <thead>
            <tr className='text-center'>
                <td>No.</td>
                <td>장소명</td>
                <td>전화번호</td>
                <td>주소</td>
                <td>지도보기</td>
                <td>삭제</td>
            </tr>
        </thead>
        <tbody className='text-center'>
            {locals.map(local=>
                <tr key={local.key}>
                    <td>{local.no}</td>
                    <td>{local.place_name}</td>
                    <td>{local.phone}</td>
                    <td>{local.address_name}</td>
                    <td><ModalMap local={local}/></td>
                    <td>
                        <Button onClick={()=>onClickDelete(local)} variant='danger' size='sm'>삭제</Button>
                    </td>
                </tr>
            )}
        </tbody>
      </Table>
    </div>
  )
}

export default FavoritePage