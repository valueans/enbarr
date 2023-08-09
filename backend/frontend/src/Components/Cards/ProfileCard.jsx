import React from 'react'
import {Card,CardMedia} from '@mui/material';
import DefaultProfileImage from "../../../public/profileimage.png"

const ProfileCard = ({image="",width="60px",height="60px"}) => {
  const debug = import.meta.env.VITE_DEBUG;
  const base_url = import.meta.env.VITE_BASE_URL
  const defaultImage = debug=="true"?DefaultProfileImage:base_url+"static/profileimage.png";
  return (
    <Card sx={{height:{height},width:{width},border:"2.743px solid #FFFFFF",filter: "drop-shadow(0px 7.8px 13px rgba(0, 0, 0, 0.15))",borderRadius: "13px;"}}>
        <CardMedia
        component="img"
        height="100%"
        image={image===""||image===null?defaultImage:image}
        alt="add-image"
      />
    </Card>
  )
}

export default ProfileCard