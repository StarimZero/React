import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Recently from './Recently'
import axios from 'axios';

const HomePage = () => {

  const [goods, setGoods] = useState([]);


    const callAPI = async () => {
        const res = await axios.get(`/goods/list?page=1&size=10`);
        console.log(res.data);
        setGoods(res.data.list);
    }

    useEffect(()=>{
        callAPI();
    },[])

  return (
    <Container>
        <Row>
            <Col>
                <Recently goods={goods}/>
            </Col>
        </Row>    
    </Container>
  )
}

export default HomePage