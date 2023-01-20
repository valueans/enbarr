import React from 'react';
import { TextField} from '@mui/material';
import InputButton from '../Buttons/InputButton';

const CustomInputBox = ({title,type="text",placeholder="",maxLength=4,direction="start",paddingLeft="0px",marginRight="5%",onChange,value}) => {
  return (
    <TextField
        className="customInput"
        variant="standard"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        inputProps={{maxLength:maxLength}}
        sx={{paddingLeft:paddingLeft}}
        InputProps={direction==="start"?{disableUnderline:true,startAdornment:<InputButton title={title} marginRight={marginRight}/>}:{disableUnderline:true,endAdornment: <InputButton title={title} marginRight={marginRight}/>}}
    />
  )
}

export default CustomInputBox