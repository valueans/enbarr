import React from 'react'
import { Grid } from '@mui/material';
import InstagramSocialIcon from '../Svgs/InstagramSocialIcon'
import FacebookSocialIcon from '../Svgs/FacebookSocialIcon';
import TwitterSocialIcon from '../Svgs/TwitterSocialIcon';
import LinkedInSocialIcon from '../Svgs/LinkedInSocialIcon';
import VerticalLineIcon from '../Svgs/VerticalLineIcon';
import { instagramLink,facebookLink,linkedinLink,twitterLink } from '../../Constants/urls';

const SocialLinksVertical = () => {
  return (
    <>
        <Grid item xs={2} sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <Grid container direction="column" sx={{display:"flex",alignContent:"center"}} spacing={3}>
                <Grid item xs={2} style={{display:"flex",justifyContent:"center"}}>
                    <a href={instagramLink} target="_blank" rel="noreferrer">
                        <InstagramSocialIcon />
                    </a>
                </Grid>
                <Grid item xs={2} style={{display:"flex",justifyContent:"center"}}>
                    <a href={twitterLink} target="_blank" rel="noreferrer">
                        <TwitterSocialIcon />
                    </a>
                </Grid>
                <Grid item xs={2} style={{display:"flex",justifyContent:"center"}}>
                    <a href={facebookLink} target="_blank" rel="noreferrer">
                        <FacebookSocialIcon />
                    </a>
                </Grid>
                <Grid item xs={2} style={{display:"flex",justifyContent:"center"}}>
                    <a href={linkedinLink} target="_blank" rel="noreferrer">
                        <LinkedInSocialIcon />
                    </a>
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