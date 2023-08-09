import React from 'react'
import { Grid } from '@mui/material';
import InstagramSocialIcon from '../Svgs/InstagramSocialIcon'
import FacebookSocialIcon from '../Svgs/FacebookSocialIcon';
import TwitterSocialIcon from '../Svgs/TwitterSocialIcon';
import LinkedInSocialIcon from '../Svgs/LinkedInSocialIcon';
import VerticalLineIcon from '../Svgs/VerticalLineIcon';
import { useSelector } from 'react-redux';

const SocialLinksVertical = () => {
    const socialLinks = useSelector(state=>state.SocialLinks);
  return (
    <>
            <Grid container direction="column" sx={{display:"flex",alignContent:"center"}} spacing={3}>
                <Grid item xs={2} style={{display:"flex",justifyContent:"center"}}>
                    <a href={socialLinks?.instagram} target="_blank" rel="noreferrer">
                        <InstagramSocialIcon />
                    </a>
                </Grid>
                <Grid item xs={2} style={{display:"flex",justifyContent:"center"}}>
                    <a href={socialLinks?.twitter} target="_blank" rel="noreferrer">
                        <TwitterSocialIcon />
                    </a>
                </Grid>
                <Grid item xs={2} style={{display:"flex",justifyContent:"center"}}>
                    <a href={socialLinks?.facebook} target="_blank" rel="noreferrer">
                        <FacebookSocialIcon />
                    </a>
                </Grid>
                <Grid item xs={2} style={{display:"flex",justifyContent:"center"}}>
                    <a href={socialLinks?.linkedIn} target="_blank" rel="noreferrer">
                        <LinkedInSocialIcon />
                    </a>
                </Grid>
                <Grid item xs={2} style={{display:"flex",justifyContent:"center"}}>
                    <VerticalLineIcon />
                </Grid>
            </Grid>
    </>
  )
}

export default SocialLinksVertical