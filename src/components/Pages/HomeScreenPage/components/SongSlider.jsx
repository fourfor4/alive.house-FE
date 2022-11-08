import React from 'react'
import Slider from "react-slick";
import right from '../../../../assets/SongHomePage/slideArrorRight.svg'
import left from '../../../../assets/SongHomePage/slideArrowLeft.svg'


const SongSlider = ({children}) => {
  const settings = {

    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: "60px",
    nextArrow: <img src={right}  className='h-[3rem]'/>,
    prevArrow: <img src={left}  className='h-[3rem]'/>
  };

  return (
    <div className='w-[90vw]'>
      <Slider {...settings}>
         {children}
      </Slider>
    </div>
  )
}

export default SongSlider