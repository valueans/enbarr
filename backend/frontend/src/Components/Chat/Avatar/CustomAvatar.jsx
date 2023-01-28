import React from 'react'
import { Avatar } from '@mui/material'

const CustomAvatar = ({image,name}) => {
  return (
    <Avatar alt={name} src={image} sx={{ width: 65, height: 65 ,cursor:"pointer"}}/>
  )
}

export default CustomAvatar