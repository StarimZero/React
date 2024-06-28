import React, {useState, useEffect} from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from 'axios'
import { Card, Col, Row } from 'react-bootstrap';
import Review from './Review';



const GoodsInfo = ({goods}) => {

    const {contents, gid} = goods;
    const [attaches, setAttaches] = useState([]);


    // const callAPI = async () => {
    //     const res = await axios.get(`/goods/attach/${gid}`);
    //     console.log(res.data);
    //     setAttaches(res.data);
    //     console.log({gid})
    // }

    useEffect(() => {
        axios.get('/goods/attach/' + gid)
          .then(res => setAttaches(res.data))
      }, [gid]);
      
      console.log(attaches);
    

  return (
    <Tabs
      defaultActiveKey="home"
      id="fill-tab-example"
      className="mb-3"
      fill
    >
        <Tab eventKey="home" title="상세설명">
            <div dangerouslySetInnerHTML={{__html:contents}}></div>
        </Tab>
        <Tab eventKey="profile" title="리뷰">
            <Review gid={gid}/>
        </Tab>
        <Tab eventKey="longer-tab" title="추가">
            <Row>
                {attaches.map(att=>
                    <Col>
                        <Card.Body>
                            <img src ={att.filename} width={"100%"}/>
                        </Card.Body>
                    </Col>
                )}
            </Row>
        </Tab>
    </Tabs>
  );
}

export default GoodsInfo