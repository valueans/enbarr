import React from 'react'
import { Box } from '@mui/system'

const InputButton = ({title,marginRight}) => {
  return (
    <Box sx={{background: "#313033",borderRadius: "15px",width:"62px",textAlign:"center",height:"60px",color:"#FFFFFF",alignItems:"center",postion:"relative",top:"10px",left:"5px",marginRight:marginRight,zIndex:6,disableUnderline:true}} className="justifyContentCenter">{title}</Box>
  )
}

export default InputButton