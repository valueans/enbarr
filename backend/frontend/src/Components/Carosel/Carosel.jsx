import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

const Carosel = ({images=[]}) => {
  return (
    <Carousel showArrows={true} swipeable={true} showThumbs={false} useKeyboardArrows={true} >
        {
            images.map((image)=>{
                return <div key={image.id}>
                        <img alt="" src={image.file} style={{height:"600px"}}/>
                    </div>
            })
        }
    </Carousel>
  )
}

export default Carosel