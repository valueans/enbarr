import React from 'react';
import CustomButton from './ButtonStyle';
import SendIcon from '@mui/icons-material/Send';


const SendButton = ({onClick,type,width,backgroundColor="#313033",color="#FFFFFF",title,borderRadius="30px",border="none",icon,disabled=false}) => {
  return (
    <CustomButton onClick={onClick} type={type} style={{width:width,backgroundColor:backgroundColor,color:color,borderRadius:borderRadius,border:border}} disabled={disabled}>
      <SendIcon sx={{height:"50px",width:"50px"}}/>
      </CustomButton>
  )
}

export default SendButton