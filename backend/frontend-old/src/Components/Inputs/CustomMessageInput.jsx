import React,{useState} from 'react'
import { TextField,InputAdornment,IconButton } from '@mui/material';
import ClipIcon from '../Svgs/ClipIcon';
import EmojiIcon from '../Svgs/EmojiIcon';

const CustomMessageInput = ({type,placeholder,maxLength=100,minRows=1,maxRows=1,multiline=false,name="",value="",onChange,onBlur,border,disabled=false,readOnly=false,id,file_ref,setMessageInputVal,setShowEmojis,showEmojis,onEnter}) => {

  return (
    <>
    <TextField id={id?id:""} type={type} name={name} onChange={onChange} onBlur={onBlur} value={value} className="customInput" minRows={minRows} maxRows={maxRows} multiline={multiline} placeholder={placeholder} sx={{color:"black",minHeight:"60px",pt:2,pl:3,border:border,pr:3}} InputProps={{disableUnderline:true,readOnly:readOnly,
        startAdornment: (
          <InputAdornment position="start">
            <IconButton onClick={()=>{
                file_ref.current.click();
            }}>
            <ClipIcon />
            </IconButton>
          </InputAdornment>
        ),endAdornment:(
        <InputAdornment position="end">
            <IconButton onClick={()=>{
                setShowEmojis(!showEmojis)
            }}>
            <EmojiIcon />
            </IconButton>
          </InputAdornment>
        )
    }}
      inputProps={{maxLength:maxLength}} variant="standard" disabled={disabled}
      onKeyUp={(e)=>{
          if (e.key === 'Enter' && value.length > 0) {
            onEnter();
          }
      }}
      />
    </>
  )
}

export default CustomMessageInput