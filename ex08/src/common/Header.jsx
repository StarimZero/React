import React, { useState } from 'react'
import Slider from "react-slick";
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

const Header = () => {


    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
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


    const [images, setImages] = useState([
        '/images/header01.png',
        '/images/header02.png',
        '/images/header03.png',
        '/images/header04.png',
    ]);


    const settings = {
        dots: true,
        infinite: true,
        speed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay : true,
        autoplaySpped : 2000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
      };

  return (
    <div className="slider-container">
        <Slider {...settings}>
            {images.map(img=>
                <img src={img} key={img} width={"100%"} height={"300px"}/>
            )}
        </Slider>
    </div>
  )
}

export default Header