import React from 'react'
import {Grid} from '@mui/material';
import GoogleStoreSocialIcon from '../Svgs/GoogleStoreSocialIcon';
import AppleStoreSocialIcon from '../Svgs/AppleStoreSocialIcon';
import { useSelector } from 'react-redux';

const StoreLinks = ({color="#313033",className}) => {
  const socialLinks = useSelector(state=>state.SocialLinks);
  return (
    <Grid container spacing={1} className={className}>
      <Grid item>
        <a href={socialLinks?.appleStoreLink} target="_blank" rel="noopener noreferrer">
          <AppleStoreSocialIcon color={color} />
        </a>
      </Grid>
      <Grid item>
        <a href={socialLinks?.googleStoreLink} target="_blank" rel="noopener noreferrer">
          <GoogleStoreSocialIcon color={color} />
        </a>
      </Grid>
    </Grid>
  )
}

export default StoreLinks