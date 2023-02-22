import React from 'react'
import Footer from '../Footer/Footer';
import SocialLinkLanding from '../SocialLinks/SocialLinkLanding';
import StoreLinks from '../SocialLinks/StoreLinks';
import HorizontalLineIcon from '../Svgs/HorizontalLineIcon';
import {Grid,Typography} from '@mui/material';
import Button from '../Buttons/Button';
import HeaderImageGrid from '../Header/HeaderImageGrid';
import { useNavigate } from 'react-router-dom';


const LandingContent = () => {
    const navigator = useNavigate();


    const buttonClick = ()=>{
        return navigator('/auth/login')
    }
  return (
    <Grid container>
            <Grid item xs={8} sx={{height:"calc(100vh - 101px)"}}>
                {/* left side of landing page with title description and social LInks starts */}
                <Grid container sx={{height:"100%"}}>
                    <SocialLinkLanding />
                    <Grid item xs={10} sx={{display:"flex",alignItems:"center"}}>
                        <Grid container direction="column" sx={{paddingLeft:"40px",paddingRight:"40px"}}
                            spacing={0.5}>
                            <Grid item>
                                <Typography variant='landingPageTitle'>
                                    ENBARR
                                </Typography>
                                <HorizontalLineIcon />
                            </Grid>
                            <Grid item>
                                <Typography variant='landingPageDesc'>
                                    It just makes sense.
                                </Typography>
                            </Grid>
                            <Grid item sx={{mt:2}}>
                                <Typography variant='landingPageSubDesc'>
                                    Buy, Sell, Ride
                                </Typography>
                            </Grid>
                            <Grid item sx={{mt:2}}>
                                <StoreLinks/>
                                <Grid item sx={{mt:2}}> 
                                    <Button title="Sign up" onClick={buttonClick}/>
                                </Grid>
                            </Grid>
                            <Footer mt={10}/>
                        </Grid>
                    </Grid>
                </Grid>
                {/* left side of landing page with title description and social LInks ends */}
            </Grid>
            {/* right side horse image starts */}
            <HeaderImageGrid />
            {/* right side horse image ends  */}
        </Grid>
  )
}

export default LandingContent