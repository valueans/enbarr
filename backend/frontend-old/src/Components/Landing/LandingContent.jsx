import React,{useEffect,useState} from 'react'
import Footer from '../Footer/Footer';
import SocialLinkLanding from '../SocialLinks/SocialLinkLanding';
import StoreLinks from '../SocialLinks/StoreLinks';
import {Grid,Typography} from '@mui/material';
import Button from '../Buttons/Button';
import HeaderImageGrid from '../Header/HeaderImageGrid';
import { useNavigate } from 'react-router-dom';


const LandingContent = () => {
    const navigator = useNavigate();
    const [mobileView, setMobileView] = useState(false);

    useEffect(()=>{
        const setResponsiveness = () => {
            return window.innerWidth < 900
              ? setMobileView(true)
              : setMobileView(false);
          }
          setResponsiveness();
            window.addEventListener("resize", () => setResponsiveness());
      
            return () => {
            window.removeEventListener("resize", () => setResponsiveness());
            }
      },[])

    const buttonClick = ()=>{
        return navigator('/auth/login')
    }
  return (
    <Grid container>
            <Grid item xs={mobileView?12:8} sx={{height:mobileView?"calc(100vh - 190px)":"calc(100vh - 101px)"}}>
                {/* left side of landing page with title description and social LInks starts */}
                <Grid container sx={{height:"100%",marginTop:mobileView?"0px":"0px"}}>
                    <SocialLinkLanding mobileView={mobileView} xs={mobileView?2:1}/>
                    <Grid item xs={10} sx={{display:"flex",alignItems:"center"}}>
                        <Grid container direction="column" sx={{paddingLeft:"40px",paddingRight:"40px"}}
                            spacing={0.5}>
                            <Grid item>
                                <Typography variant='landingPageTitle' sx={{fontSize:mobileView?"50px":"70px",fontWeight:900}}>
                                    ENBARR
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='landingPageDesc' sx={{fontSize:mobileView?"20px":"40px",fontWeight:900}}>
                                    It just makes sense.
                                </Typography>
                            </Grid>
                            <Grid item sx={{mt:mobileView?0:2}}>
                                <Typography variant='landingPageTitle' sx={{fontSize:mobileView?"20px":"30px"}}>
                                    Buy, Sell, Ride
                                </Typography>
                            </Grid>
                            <Grid item sx={{mt:mobileView?0:2}} xs={12}>
                                <StoreLinks mobileView={mobileView}/>
                                <Grid item sx={{mt:mobileView?0:2}}> 
                                    <Button title="Sign up" onClick={buttonClick}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {
                            mobileView?"":<Footer mt={10}/>
                    }
                </Grid>
                {/* left side of landing page with title description and social LInks ends */}
            </Grid>

            {
                mobileView?<Footer />:""
            }
            
            {/* right side horse image starts */}
            {
                mobileView?"":<HeaderImageGrid />
            }
            {/* right side horse image ends  */}
        </Grid>
  )
}

export default LandingContent