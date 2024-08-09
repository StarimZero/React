import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, InputGroup, Row, Table } from 'react-bootstrap'
import {app} from '../../firebaseInit'
import {getFirestore, addDoc, collection} from 'firebase/firestore'
import moment from 'moment';



const SearchPage = () => {
    const db = getFirestore(app);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [list, setList] = useState([]);

    const onInsert = async (shop) => {
        console.log(shop);
        const date = moment(new Date()).format('YYYY년MM월DD일 HH시mm분ss초')
        await addDoc(collection(db, 'shop'), {...shop, date, writer: sessionStorage.getItem('email')});
        alert("상품등록")
    }

    const callAPI = async() => {
        setLoading(true);
        const res = await axios.get(`/shop/search.json?query=${query}`)
        console.log(res.data)
        setList(res.data);
        setLoading(false);

    }

    useEffect(()=>{
        //callAPI()
    },[])

    const onSubmit= (e) => {
        e.preventDefault();
        if(query===""){
            alert("검색어")
            return;
        }
        callAPI();
    }


    if(loading) return <div className='text-center my-5'><img src='/images/loading.gif'/><h1>검색중</h1></div>
    return (
        <>
            <Row>
                <Col className='text-center my-3'>
                    <h1>상품검색</h1>
                </Col>
            </Row>
            <Row>
                <Col lg={12}>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Control placeholder='검색어' onChange={(e)=>setQuery(e.target.value)} value={query}/>
                            <Button type='submit'>검색</Button>
                        </InputGroup>
                    </form>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table>
                        <thead>
                            <th>No.</th>
                            <th>이름</th>
                            <th>가격</th>
                            <th>주소</th>
                            <th>이미지</th>
                            {sessionStorage.getItem('email') && 
                                <th>등록</th>
                            }
                            
                        </thead>
                        <tbody>
                            {list.map(shop=>
                                <tr key={shop.no}>
                                    <td>{shop.no}</td>
                                    <td>{shop.title}</td>
                                    <td>{shop.price}</td>
                                    <td>{shop.address}</td>
                                    <td><img src={shop.image} width={"50%"}/></td>
                                    <td>
                                        {sessionStorage.getItem('email') && 
                                            <Button className='sm' onClick={()=>onInsert(shop)}>등록</Button> 
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

export default SearchPage