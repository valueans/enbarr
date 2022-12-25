import React from 'react'
import { Box } from '@mui/system'
import horseImage from '../../assets/horse.png';

const HorseImageUploadCard = () => {
  return (
    <Box sx={{border: "2px dashed #666666",width: "70px",height: "70px",background: "#FFFFFF",backgroundImage:horseImage}}></Box>
  )
}

export default HorseImageUploadCard