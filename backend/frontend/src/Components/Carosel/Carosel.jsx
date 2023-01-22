import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

const Carosel = ({images=[]}) => {
  return (
    <Carousel showArrows={true} swipeable={true} showThumbs={false} useKeyboardArrows={true} >
        {
            images.map((image)=>{
                return <div key={image.id}>
                  {
                    image.file_type === 'IMAGE'?
                    <img alt="" src={image.file} style={{height:"600px"}}/>:
                    <video width="100%" height="100%" controls="controls autoplay">
                        <source src={image.file} type="video/mp4" />
                    </video>
                  }
                    </div>
            })
        }
    </Carousel>
  )
}

export default Carosel