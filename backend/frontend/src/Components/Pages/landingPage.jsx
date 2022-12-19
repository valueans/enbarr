import React from 'react';
import facebookImage from '../../assets/facebook.svg';
import instagramImage from '../../assets/instagram.svg';
import linkedInImage from '../../assets/linkedin.svg';
import twitterImage from '../../assets/twitter.svg';
import appleImage from '../../assets/apple.svg';
import googleImage from '../../assets/google.svg';
import verticalLineImage from '../../assets/verticalLine.svg';
import horizontalLineImage from '../../assets/horizontalLine.svg';
import {Grid,Typography} from '@mui/material';
import ButtonAppBar from "../Header/Headers";
import Button from '../Buttons/Button';
import HeaderImageGrid from '../Header/HeaderImageGrid';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';

const LandingPage = () => {
    const navigate = useNavigate();

    const buttonClick = ()=>{
        return navigate('/auth')
    }
  return (
    <>
        <ButtonAppBar />
        <Grid container>
            <Grid item xs={8} sx={{height:"86.5vh"}}>
                <Grid container sx={{height:"100%"}}>
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
                    <Grid item xs={10} sx={{display:"flex",alignItems:"center"}}>
                        <Grid container direction="column" sx={{paddingLeft:"40px",paddingRight:"40px"}}
                            spacing={0.5}>
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
                                <Grid container spacing={1}>
                                    <Grid item>
                                        <img src={googleImage} alt="google-logo" />
                                    </Grid>
                                    <Grid item>
                                        <img src={appleImage} alt="apple-logo" />
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Button title="Sign up" onClick={buttonClick}/>
                                </Grid>
                            </Grid>
                            <Footer />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <HeaderImageGrid />
        </Grid>
        </>
  )
}

export default LandingPage