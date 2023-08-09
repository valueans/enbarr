import { Grid } from '@mui/material';
import React from 'react'
import InstagramSocialIcon from '../Svgs/InstagramSocialIcon'
import FacebookSocialIcon from '../Svgs/FacebookSocialIcon';
import TwitterSocialIcon from '../Svgs/TwitterSocialIcon';
import LinkedInSocialIcon from '../Svgs/LinkedInSocialIcon';
import HorizontalLineIcon from '../Svgs/HorizontalLineIcon';
import { useSelector } from 'react-redux';


const SocialLinksVertical = () => {
    const socialLinks = useSelector(state=>state.SocialLinks);

    const styles = {
        socialIcons: {
            justifyContent: 'start',
            display: 'flex',
            alignItems: 'start',
            flexDirection: 'row',
            gap: 3,

            '@media (max-width: 600px)': {
                flexDirection: 'row',
                justifyContent: 'start',
                marginTop: 2
            },
        },
    };
  return (
    <>
        <Grid container>
            <Grid item xs={12} lg={2}>
                <HorizontalLineIcon color='#FFFFFF' />
            </Grid>
            <Grid lg={10} container sx={styles.socialIcons}>
                <Grid item>
                    <a href={socialLinks?.instagram} target="_blank" rel="noreferrer">
                        <InstagramSocialIcon color='#FFFFFF' />
                    </a>
                </Grid>
                <Grid item>
                    <a href={socialLinks?.twitter} target="_blank" rel="noreferrer">
                        <TwitterSocialIcon color='#FFFFFF' />
                    </a>
                </Grid>
                <Grid item>
                    <a href={socialLinks?.facebook} target="_blank" rel="noreferrer">
                        <FacebookSocialIcon color='#FFFFFF' />
                    </a>
                </Grid>
                <Grid item>
                    <a href={socialLinks?.linkedIn} target="_blank" rel="noreferrer">
                        <LinkedInSocialIcon color='#FFFFFF' />
                    </a>
                </Grid>
            </Grid>

        </Grid>
    </>
  )
}

export default SocialLinksVertical