import React from 'react';
import CustomButton from './ButtonStyle';

const Button = ({onClick,type,width,backgroundColor="#313033",color="#FFFFFF",title}) => {
  return (
    <CustomButton onClick={onClick} type={type} style={{width:width,backgroundColor:backgroundColor,color:color}}>{title}</CustomButton>
  )
}
export default Button;