import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { Link } from 'react-router-dom';
import Slider from "react-slick";


const Recently = ({goods}) => {



    function SampleNextArrow(props) {
        const { className, onClick } = props;
        return (
        <div
            className={className}
            style={{ color:"yellow" }}
            onClick={onClick}>
            <BiChevronRight/>
        </div>
        );
      }
      
      function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
        <div
            className={className}
            style={{color:'yellow'}}
            onClick={onClick}>
            <BiChevronLeft/>
        </div>
        );
      }

      const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay : true,
        autoplaySpped : 500,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
      };






  return (
    <Container>
        <Row>
            <Col className='text-center'>
                <div>
                    
                </div>
            </Col>
        </Row>
        <Row>
            <Slider {...settings}>
                {goods.map(good=>
                <Col key={good.gid}>
                    <Card>
                        <Card.Body className='text-center'>
                            <Link to ={`/goods/read/${good.gid}`}>
                                <img src={good.image} width="100%"/>
                            </Link>
                            <div>{good.title}</div>
                            <div>{good.fmtprice}원</div>
                        </Card.Body>
                    </Card>
                </Col>
                )}
            </Slider>
        </Row>
    </Container>
  )
}

export default Recently