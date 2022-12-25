import React from 'react'
import { TextField } from '@mui/material';

const CustomInput = ({type,placeholder,maxLength=100}) => {
  return (
    <TextField type={type} className="customInput" placeholder={placeholder} sx={{color:"black",minHeight:"60px",pt:2,pl:3}} InputProps={{disableUnderline:true}} inputProps={{maxLength:maxLength}} variant="standard"/>
  )
}

export default CustomInput;