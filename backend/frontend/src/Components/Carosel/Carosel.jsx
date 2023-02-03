import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import {Card,CardMedia} from '@mui/material';

const Carosel = ({images=[]}) => {
  return (
    <Carousel showArrows={true} swipeable={true} showThumbs={false} useKeyboardArrows={true} >
        {
            images.map((image)=>{
                return <Card sx={{height:"500px",width:"100%"}} key={image.id}>
                  <CardMedia
                      component={image?.file_type === 'IMAGE'?'img':'video'}
                      height="100%"
                      image={image?.file}
                      alt="add-image"
                      autoPlay
                      controls
                    />
                </Card>
            })
        }
    </Carousel>
  )
}

export default Carosel