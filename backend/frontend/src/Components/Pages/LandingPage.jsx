import React,{ useEffect } from 'react';
import {Grid,Typography} from '@mui/material';
import ButtonAppBar from "../Header/Headers";
import Button from '../Buttons/Button';
import HeaderImageGrid from '../Header/HeaderImageGrid';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import SocialLinksVertical from '../SocialLinks/SocialLinksVertical';
import StoreLinks from '../SocialLinks/StoreLinks';
import HorizontalLineIcon from '../Svgs/HorizontalLineIcon';
import AuthService from '../../Services/AuthService';

const LandingPage = () => {
    const navigator = useNavigate();
    const isAuthenticated = AuthService.checkUserAuthenticated();


    useEffect(() => {
        if (isAuthenticated){
         navigator("/home")   
        }
    },[isAuthenticated,navigator])

    const buttonClick = ()=>{
        return navigator('/auth')
    }
    
  return (
    <>
        {/* LandingPage header starts */}
        <ButtonAppBar headerType="landing"/>
        {/* LandingPage header ends */}

        {/* LandingPage content starts */}
        <Grid container>
            <Grid item xs={8} sx={{height:"calc(100vh - 101px)"}}>
                {/* left side of landing page with title description and social LInks starts */}
                <Grid container sx={{height:"100%"}}>
                    <SocialLinksVertical />
                    <Grid item xs={10} sx={{display:"flex",alignItems:"center"}}>
                        <Grid container direction="column" sx={{paddingLeft:"40px",paddingRight:"40px"}}
                            spacing={0.5}>
                            <Grid item>
                                <Typography variant='landingPageTitle'>
                                    ENBARR HORSES
                                </Typography>
                                <HorizontalLineIcon />
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
                                <StoreLinks/>
                                <Grid item>
                                    <Button title="Sign up" onClick={buttonClick}/>
                                </Grid>
                            </Grid>
                            <Footer />
                        </Grid>
                    </Grid>
                </Grid>
                {/* left side of landing page with title description and social LInks ends */}
            </Grid>
            {/* right side horse image starts */}
            <HeaderImageGrid />
            {/* right side horse image ends  */}
        </Grid>
        {/* LandingPage content ends */}
        </>
  )
}

export default LandingPage