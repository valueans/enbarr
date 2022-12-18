import React from 'react';
import landingImage from '../../assets/landingImage.png';
import facebookImage from '../../assets/facebook.svg';
import instagramImage from '../../assets/instagram.svg';
import linkedInImage from '../../assets/linkedin.svg';
import twitterImage from '../../assets/twitter.svg';
import appleImage from '../../assets/apple.svg';
import googleImage from '../../assets/google.svg';
import verticalLineImage from '../../assets/verticalLine.svg';
import horizontalLineImage from '../../assets/horizontalLine.svg';
import {Grid,Typography} from '@mui/material';
import ButtonAppBar from "../Header/headers";
import Button from '../Buttons/button';

const LandingPage = () => {
  return (
    <>
        <ButtonAppBar />
        <Grid container xs={12}>
            <Grid item xs={8} sx={{height:"86.5vh"}}>
                <Grid container xs={12} sx={{height:"100%"}}>
                    <Grid item xs={2} sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <Grid container direction="column" xs={12} sx={{display:"flex",alignContent:"center"}}
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
                    <Grid item xs={10} sx={{display:"flex",alignItems:"center"}}>
                        <Grid container xs={12} direction="column" sx={{paddingLeft:"40px",paddingRight:"40px"}}
                            spacing={1}>
                            <Grid item>
                                <Typography variant='landingPageTitle'>
                                    ENBARR HORSES
                                </Typography>
                                <img src={horizontalLineImage} alt="horizontal-logo" />
                            </Grid>
                            <Grid item>
                                <Typography variant='landingPageDesc'>
                                    The history of mankind is carried on the back of a horse.
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='landingPageSubDesc'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque in mattis risus
                                    nam vitae. Facilisis morbi purus vitae in quisque habitant ipsum, sollicitudin
                                    lacinia.
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Grid container xs={12} spacing={1}>
                                    <Grid item>
                                        <img src={googleImage} alt="google-logo" />
                                    </Grid>
                                    <Grid item>
                                        <img src={appleImage} alt="apple-logo" />
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Button title="Sign up" />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={4} sx={{display:"flex",justifyContent:"center",height:"86.5vh"}}>
                <div
                    style={{height:"80%",width: "100%",backdropFilter:"blur(2px)",background:"linear-gradient(180deg, rgba(49, 48, 51, 0.25) 0%, rgba(0, 0, 0, 0.25) 100%)",alignSelf:"center",position:"relative",left: "34px",zIndex:5}}>
                </div>
                <div
                    style={{height:"95%",width: "100%",backdropFilter:"blur(7.5px)",background:"linear-gradient(180deg, rgba(49, 48, 51, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%)",alignSelf:"center",zIndex:7,position:"relative",left:"16px"}}>
                </div>
                <img src={landingImage} alt="landing-img" style={{height:"100vh",zIndex:8,position:"relative",top:"-102px"}} />
            </Grid>
        </Grid>
        </>
  )
}

export default LandingPage