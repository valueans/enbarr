import React from 'react'
import { TextField,InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const CustomInput = ({type,placeholder,maxLength=100,minRows=1,maxRows=1,multiline=false,name="",value="",onChange,onBlur,border,disabled=false,readOnly=false,id,onKeyUp,input_type}) => {
  return (
    <TextField id={id?id:""} type={type} name={name} onChange={onChange} onBlur={onBlur} value={value} className="customInput" minRows={minRows} maxRows={maxRows} multiline={multiline} placeholder={placeholder} sx={{color:"black",minHeight:"60px",pt:2,pl:3,border:border}} InputProps={{disableUnderline:true,readOnly:readOnly}} 
    inputProps={{maxLength:maxLength}} variant="standard" disabled={disabled} onKeyUp={onKeyUp}/>
  )
}

export default CustomInput;