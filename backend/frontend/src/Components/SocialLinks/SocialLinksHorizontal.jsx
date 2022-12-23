import { Grid } from '@mui/material';
import React from 'react'
import InstagramSocialIcon from '../Svgs/InstagramSocialIcon'
import FacebookSocialIcon from '../Svgs/FacebookSocialIcon';
import TwitterSocialIcon from '../Svgs/TwitterSocialIcon';
import LinkedInSocialIcon from '../Svgs/LinkedInSocialIcon';
import HorizontalLineIcon from '../Svgs/HorizontalLineIcon';
const SocialLinksVertical = () => {
  return (
    <>
    <Grid container>
        <Grid item xs={2}>
            <HorizontalLineIcon color='#FFFFFF'/>
        </Grid>
        <Grid item xs={1}>
            <InstagramSocialIcon color='#FFFFFF'/>
        </Grid>
        <Grid item xs={1}>
            <TwitterSocialIcon color='#FFFFFF'/>
        </Grid>
        <Grid item xs={1}>
            <FacebookSocialIcon color='#FFFFFF'/>
        </Grid>
        <Grid item xs={1}>
            <LinkedInSocialIcon color='#FFFFFF'/>
        </Grid>
    </Grid>
    </>
  )
}

export default SocialLinksVertical