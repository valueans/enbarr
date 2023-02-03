import React from 'react'
import { TextField,InputAdornment,IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const CustomChatInput = ({type,placeholder,maxLength=100,minRows=1,maxRows=1,multiline=false,name="",value="",onChange,onBlur,border,disabled=false,readOnly=false,id,input_type}) => {
  return (
    <TextField id={id?id:""} type={type} name={name} onChange={onChange} onBlur={onBlur} value={value} className="customInput" minRows={minRows} maxRows={maxRows} multiline={multiline} placeholder={placeholder} sx={{color:"black",minHeight:"60px",pt:2,pl:3,border:border,pr:3}} InputProps={{disableUnderline:true,readOnly:readOnly,
        startAdornment: input_type==="search"?(
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ):""}} 
      inputProps={{maxLength:maxLength}} variant="standard" disabled={disabled}/>
  )
}

export default CustomChatInput