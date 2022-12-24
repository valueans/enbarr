import React from 'react';
import CustomButton from './ButtonStyle';

const Button = (props) => {
  return (
    <CustomButton onClick={props.onClick} type={props.type} style={{width:props.width}}>{props.title}</CustomButton>
  )
}
export default Button;