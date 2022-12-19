import React from 'react'
// import {TextField} from '@mui/material';

const CustomInput = ({type,placeholder}) => {
  return (
    <input type={type} placeholder={placeholder} style={{height:"60px",background: "#F4F4F4",borderRadius: "15px",width:"100%",border:"none",padding:"10px"}}/>
  )
}

export default CustomInput;