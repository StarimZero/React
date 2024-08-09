import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import {app} from '../../firebaseInit'
import {getFirestore, onSnapshot, collection, query, orderBy, doc, deleteDoc, getDoc} from 'firebase/firestore'

const ShopReadPage = () => {

    const [shop, setShop] = useState('')
    const {id} = useParams();
    const db = getFirestore(app);
    const callAPI = async () => {
        const snap = await getDoc(doc(db, 'shop', id));
        console.log(snap.data())
        setShop(snap.data());
    }

    useEffect(()=>{
        callAPI();
    },[])


    return (
        <Row className='justify-content-center my-5'>
            <Col lg={6}>
                <Card>
                    <Card.Header>
                        <h1>{shop.title}({shop.price})</h1>
                    </Card.Header>
                    <Card.Body>
                        <div className='text-center'><img src={shop.image} width={"100%"}/></div>
                    </Card.Body>
                    <Card.Footer>
                        <div>
                            <h5>{shop.address}</h5>
                            <h5>{shop.date}</h5>
                        </div>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
        
    )
}

export default ShopReadPage