import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import {app} from '../../firebaseInit'
import {getFirestore, onSnapshot, collection, query, orderBy, doc, deleteDoc} from 'firebase/firestore'
import { Link } from 'react-router-dom'

const ListPage = () => {

    const db = getFirestore(app);
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)

    const  callAPI = async () => {
        setLoading(true);
        const q = query(collection(db, 'shop'), orderBy('date', 'desc'))
        onSnapshot(q, snap => {
            let rows=[];
            snap.forEach(row=>{
                rows.push({id:row.id, ...row.data()});
            });
            console.log(rows);
            setList(rows)
            setLoading(false);
        })  
    }
    
    const onDelete = async (id) => {
        if(!window.confirm(`${id}삭제?`)) return;
        await deleteDoc(doc(db,'shop', id));
        alert("삭제")
    }

    useEffect(()=>{
        callAPI();
    },[])

    if(loading) return <div className='text-center my-5'><img src='/images/loading.gif'/><h1>검색중</h1></div>
    return (
        <>
            <Row>
                <Col>
                    <h1>상품목록</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table>
                        <thead>
                            <th>ID</th>
                            <th>이름</th>
                            <th>가격</th>
                            <th>주소</th>
                            <th>이미지</th>
                            <th>삭제</th>
                        </thead>
                        <tbody>
                            {list.map(shop=>
                                <tr key={shop.id}>
                                    <td>{shop.writer}</td>
                                    <td><Link to ={`/shop/${shop.id}`}>{shop.title}</Link></td>
                                    <td>{shop.price}</td>
                                    <td>{shop.address}</td>
                                    <td><img src={shop.image} width={"50%"}/></td>
                                    <td>
                                        {sessionStorage.getItem('email') === shop.writer && 
                                        <Button size='sm' variant='outline-danger' onClick={()=>onDelete(shop.id)}>삭제</Button>
                                        }
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </>
    )
}

export default ListPage