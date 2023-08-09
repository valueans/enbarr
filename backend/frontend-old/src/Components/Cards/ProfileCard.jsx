import React from 'react'
import {Card,CardMedia} from '@mui/material';
import DefaultProfileImage from '../../assets/profileimage.png';

const ProfileCard = ({image="",width="60px",height="60px"}) => {
  return (
    <Card sx={{height:{height},width:{width},border:"2.743px solid #FFFFFF",filter: "drop-shadow(0px 7.8px 13px rgba(0, 0, 0, 0.15))",borderRadius: "13px;"}}>
        <CardMedia
        component="img"
        height="100%"
        image={image===""||image===null?DefaultProfileImage:image}
        alt="add-image"
      />
    </Card>
  )
}

export default ProfileCard