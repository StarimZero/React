import React, {useEffect, useState} from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import GoodsInfo from './GoodsInfo'
import Recently from '../../common/Recently'

const ReadPage = () => {
    


    const [related, setRelated] = useState([]);
    const {gid} = useParams();
    const [goods, setGoods] = useState("");
    const {title, image, brand, maker, price, regDate, content, fmtprice } = goods;

    const callAPI = async () => {
        const res = await axios.get(`/goods/read/${gid}`)
        console.log(res.data);
        const data = {...res.data, fmtprice:res.data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        setGoods(data);
        console.log(data)
    }


    
    const callRelated = async () => {
        const res1=await axios.get(`/goods/related/list/${gid}`);
        console.log("관련상품등록한거" + res1.data);
        setRelated(res1.data);
    }
    

    useEffect(()=>{
        callAPI();
        callRelated();
    },[])
    

  return (
    <Container style={{marginBottom:"500px"}}>
        <Row>
            <Col className='mb-5'>
                <Card>
                    <Card.Header>
                        <h1>{title}</h1>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col>
                                <img src={image} width={"100%"}/>
                            </Col>
                            <Col>
                                <div>가격 : {fmtprice}원</div>
                                <div>제조사 : {maker}</div>
                                <div>등록일 : {regDate}</div>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        <div>제품번호 : {gid}</div>
                    </Card.Footer>
                </Card>
                {related.length >= 5&&
                <div className='text-center mb-3 mt-3'>
                    <h3 >관련상품</h3>
                    <Recently goods={related}/>
                </div>
                }
                <GoodsInfo goods={goods} />
            </Col>
        </Row>
    </Container>
  )
}

export default ReadPage