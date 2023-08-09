import React from 'react'
import { Avatar } from '@mui/material'

const CustomAvatar = ({image,name,height=65,width=65}) => {
  return (
    <Avatar alt={name} src={image} sx={{ width:width, height:height ,cursor:"pointer"}}/>
  )
}

export default CustomAvatar