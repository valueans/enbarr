import React from 'react'
import { TextField } from '@mui/material';

const CustomInput = ({type,placeholder,maxLength=100,minRows=1,maxRows=1,multiline=false,name="",value="",onChange,onBlur,border,disabled=false}) => {
  return (
    <TextField type={type} name={name} onChange={onChange} onBlur={onBlur} value={value} className="customInput" minRows={minRows} maxRows={maxRows} multiline={multiline} placeholder={placeholder} sx={{color:"black",minHeight:"60px",pt:2,pl:3,border:border}} InputProps={{disableUnderline:true}} inputProps={{maxLength:maxLength}} variant="standard" disabled={disabled}/>
  )
}

export default CustomInput;