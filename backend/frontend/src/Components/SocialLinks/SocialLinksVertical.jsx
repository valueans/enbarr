import React from 'react'
import { Grid } from '@mui/material';
import InstagramSocialIcon from '../Svgs/InstagramSocialIcon'
import FacebookSocialIcon from '../Svgs/FacebookSocialIcon';
import TwitterSocialIcon from '../Svgs/TwitterSocialIcon';
import LinkedInSocialIcon from '../Svgs/LinkedInSocialIcon';
import VerticalLineIcon from '../Svgs/VerticalLineIcon';

const SocialLinksVertical = () => {
  return (
    <>
    <Grid item xs={2} sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <Grid container direction="column" sx={{display:"flex",alignContent:"center"}}
            spacing={3}>
            <Grid item xs={2} style={{display:"flex",justifyContent:"center"}}>
                <InstagramSocialIcon />
            </Grid>
            <Grid item xs={2} style={{display:"flex",justifyContent:"center"}}>
                <TwitterSocialIcon />
            </Grid>
            <Grid item xs={2} style={{display:"flex",justifyContent:"center"}}>
                <FacebookSocialIcon />
            </Grid>
            <Grid item xs={2} style={{display:"flex",justifyContent:"center"}}>
                <LinkedInSocialIcon />
            </Grid>
            <Grid item xs={2} style={{display:"flex",justifyContent:"center"}}>
                <VerticalLineIcon />
            </Grid>
        </Grid>
    </Grid>
    </>
  )
}

export default SocialLinksVertical