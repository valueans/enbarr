import React from 'react'
import { Input } from '@mui/material';

const CustomInput = ({type,placeholder}) => {
  return (
    <Input type={type} className="customInput" placeholder={placeholder} sx={{color:"black"}}/>
  )
}

export default CustomInput;