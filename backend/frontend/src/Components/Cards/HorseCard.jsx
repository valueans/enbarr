import React from 'react'
import { Card } from '@mui/material';
import horse from '../../assets/horse.png'


const HorseCard = () => {
  return (
    <Card sx={{backgroundImage:`url(${horse})`,objectFit:"fit",height:"450px",width:"340px",backgroundRepeat:"no-repeat",boxShadow:"0px 10px 10px rgba(0, 0, 0, 0.1)",borderRadius:"30px"}}>
        
    </Card>
  )
}

export default HorseCard