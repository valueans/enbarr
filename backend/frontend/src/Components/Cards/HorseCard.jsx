import React from 'react'
import { Card, CardMedia } from '@mui/material';


const HorseCard = ({image}) => {

  return (
    <Card sx={{height:"450px",width:"340px",boxShadow:"0px 10px 10px rgba(0, 0, 0, 0.1)",borderRadius:"30px"}}>
        <CardMedia
        component={image?.file_type === 'IMAGE'?'img':'video'}
        height="100%"
        image={image?.file}
        alt="add-image"
      />
    </Card>
  )
}

export default HorseCard