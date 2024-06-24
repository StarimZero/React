import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Button, Table, Card, CardHeader, CardBody } from 'react-bootstrap'
import { BoxContext } from '../../contexts/BoxContext';

const CGVPage = () => {

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const {setBox} = useContext(BoxContext);

    const callAPI = async () => {
        setLoading(true);
        const res = await axios.get(`/crawl/cgv`);
        console.log(res.data);
        setList(res.data);
        setLoading(false);
    }


    const onClickDownload = async (url) => {
        await axios.post(`/crawl/cgv/download?image=${url}`);
        setBox({show:true, message:"이미지다운로드완료"});
    }

    useEffect(()=>{
        callAPI();
    },[])

if(loading) return <h1>로딩중</h1>
  return (
    <Container>
        <h1>무비차트</h1>
        <hr/>
        <Row>
            {list.map((cgv, index)=>
                <Col lg={4}>
                    <Card className='mt-3'>
                        <Card.Header>
                            <div className='text-center ellipsis1'>
                                <span>({index+1}위) </span>e
                                {cgv.title}
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <img src={cgv.img} width="100%" />
                            <div className='text-center mt-2'>
                                <Button size='sm' variant='outline-warning' onClick={()=>onClickDownload(cgv.img)}>포스터다운로드</Button>
                            </div>
                        </Card.Body>
                        <Card.Footer>
                            <div className='text-center'>
                                {cgv.date}
                                
                            </div>
                            <div>
                                <Button style={{width:"100%"}} >예매하기</Button>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
            )}
        </Row>
    </Container>
  )
}

export default CGVPage