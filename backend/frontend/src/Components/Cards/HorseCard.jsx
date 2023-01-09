import React from 'react'
import { Card, CardMedia } from '@mui/material';


const HorseCard = ({image}) => {

  return (
    <Card sx={{height:"450px",width:"340px",boxShadow:"0px 10px 10px rgba(0, 0, 0, 0.1)",borderRadius:"30px"}}>
        <CardMedia
        component="img"
        height="100%"
        image={image}
        alt="add-image"
      />
    </Card>
  )
}

export default HorseCard