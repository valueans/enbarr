import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

const Carosel = () => {
    const url = "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80";
  return (
    <Carousel showArrows={true} swipeable={true} showThumbs={false} useKeyboardArrows={true}>
        <div>
            <img alt="" src={url} style={{height:"600px"}}/>
        </div>
        <div>
        <img alt="" src={url} style={{height:"600px"}}/>
        </div>
        <div>
            <img alt="" src={url} style={{height:"600px"}}/>
        </div>
        <div>
            <img alt="" src={url} style={{height:"600px"}}/>
        </div>
    </Carousel>
  )
}

export default Carosel