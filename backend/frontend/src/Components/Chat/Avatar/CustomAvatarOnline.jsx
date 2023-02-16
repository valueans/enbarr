import React from 'react'
import { styled } from '@mui/material/styles';
import {Badge,Grid,Typography } from '@mui/material';
import CustomAvatar from './CustomAvatar';
import { useDispatch } from 'react-redux';
import { setSelectedChannelId,setSelectedChannel } from '../../../store/actions';
import clip from "text-clipper";


const CustomAvatarOnline = ({image,name,online=false,channel}) => {

    const dispatch = useDispatch();

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          backgroundColor: online?'#44b700':'#ff9800',
          color: online?'#44b700':'#ff9800',
          boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
          '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
          },
        },
        '@keyframes ripple': {
          '0%': {
            transform: 'scale(.8)',
            opacity: 1,
          },
          '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
          },
        },
      }));

  return (
    <Grid item xs={2} sx={{ml:2,mr:2,textAlign:"center"}} onClick={()=>{
      dispatch(setSelectedChannelId(channel))
      dispatch(setSelectedChannel({user_two_profile:{profile_photo:image,user:{email:name}}}))
    }}> 
        <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
            >
            <CustomAvatar name={name} image={image}/>
        </StyledBadge>
        <Typography variant='chatUsersTitle'>{clip(name,10)}</Typography>      
    </Grid>
  )
}

export default CustomAvatarOnline