import React from 'react';
import LoginButton from './ButtonStyle';

const Button = (props) => {
  return (
    <LoginButton onClick={props.onClick} type={props.type} style={{width:props.width}}>{props.title}</LoginButton>
  )
}
export default Button;