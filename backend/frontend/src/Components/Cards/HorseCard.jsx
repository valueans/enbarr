import React from 'react'
import { Card, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';


const HorseCard = ({image}) => {
  const [firstImage,setFistImage] = useState();

  useEffect(()=>{
    if (image?.length > 0){
      setFistImage(image[0])
    }
  },[])

  return (
    <Card sx={{height:"450px",width:"340px",boxShadow:"0px 10px 10px rgba(0, 0, 0, 0.1)",borderRadius:"30px",cursor:"pointer"}}>
        <CardMedia
        component={firstImage?.file_type === 'IMAGE'?'img':'video'}
        height="100%"
        image={firstImage?.file}
        alt="add-image"
        sx={{objectFit:"contain",borderRadius:"30px"}}
        loop
        autoPlay
        muted={true}
      />
    </Card>
  )
}

export default HorseCard