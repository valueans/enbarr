import { Grid } from '@mui/material';
import React from 'react'
import InstagramSocialIcon from '../Svgs/InstagramSocialIcon'
import FacebookSocialIcon from '../Svgs/FacebookSocialIcon';
import TwitterSocialIcon from '../Svgs/TwitterSocialIcon';
import LinkedInSocialIcon from '../Svgs/LinkedInSocialIcon';
import HorizontalLineIcon from '../Svgs/HorizontalLineIcon';
import { instagramLink,facebookLink,linkedinLink,twitterLink } from '../../Constants/urls';

const SocialLinksVertical = () => {
  return (
    <>
        <Grid container>
            <Grid item xs={2}>
                <HorizontalLineIcon color='#FFFFFF' />
            </Grid>
            <Grid item xs={1}>
                <a href={instagramLink} target="_blank" rel="noreferrer">
                    <InstagramSocialIcon color='#FFFFFF' />
                </a>
            </Grid>
            <Grid item xs={1}>
                <a href={twitterLink} target="_blank" rel="noreferrer">
                    <TwitterSocialIcon color='#FFFFFF' />
                </a>
            </Grid>
            <Grid item xs={1}>
                <a href={facebookLink} target="_blank" rel="noreferrer">
                    <FacebookSocialIcon color='#FFFFFF' />
                </a>
            </Grid>
            <Grid item xs={1}>
                <a href={linkedinLink} target="_blank" rel="noreferrer">
                    <LinkedInSocialIcon color='#FFFFFF' />
                </a>
            </Grid>
        </Grid>
    </>
  )
}

export default SocialLinksVertical