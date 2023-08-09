import React from 'react';
import CustomButton from './ButtonStyle';
import { CircularProgress } from '@mui/material';

const Button = ({onClick,type,width,backgroundColor="#313033",color="#FFFFFF",title,borderRadius="30px",border="none",icon,disabled=false,loading=false}) => {
  return (
    <CustomButton onClick={onClick} type={type} style={{width:width,backgroundColor:backgroundColor,color:color,borderRadius:borderRadius,border:border}} disabled={disabled}>
      {
        icon?<span style={{marginRight:"10px"}}>{icon}</span>:null
      }
      {
       loading? 
        <CircularProgress sx={{height:"20px",width:"20px",color:"#FFFFFF"}}/>:title
      }
      </CustomButton>
  )
}
export default Button;