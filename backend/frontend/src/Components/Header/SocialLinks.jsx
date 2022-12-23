import { Grid } from '@mui/material';
import React from 'react'
import facebookImage from '../../assets/facebook.svg';
import instagramImage from '../../assets/instagram.svg';
import linkedInImage from '../../assets/linkedin.svg';
import twitterImage from '../../assets/twitter.svg';
import verticalLineImage from '../../assets/verticalLine.svg';

const SocialLinks = () => {
  return (
    <>
    <Grid item xs={2} sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <Grid container direction="column" sx={{display:"flex",alignContent:"center"}}
            spacing={3}>
            <Grid item xs={2} style={{display:"flex",justifyContent:"center"}}>
                <img src={instagramImage} alt="insta-logo" />
            </Grid>
            <Grid item xs={2} style={{display:"flex",justifyContent:"center"}}>
                <img src={twitterImage} alt="twitter-logo" />
            </Grid>
            <Grid item xs={2} style={{display:"flex",justifyContent:"center"}}>
                <img src={facebookImage} alt="facebook-logo" />
            </Grid>
            <Grid item xs={2} style={{display:"flex",justifyContent:"center"}}>
                <img src={linkedInImage} alt="linkedin-logo" />
            </Grid>
            <Grid item xs={2} style={{display:"flex",justifyContent:"center"}}>
                <img src={verticalLineImage} alt="verticalLine-logo" />
            </Grid>
        </Grid>
    </Grid>
    </>
  )
}

export default SocialLinks