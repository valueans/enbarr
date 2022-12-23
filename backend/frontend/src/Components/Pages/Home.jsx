import React from 'react'
import Headers from '../Header/Headers'
import { Grid,Typography } from '@mui/material'
import homeImage from '../../assets/homeImage.png'
import SocialLinks from '../SocialLinks/SocialLinksVertical'
import Button from '../Buttons/Button'
import HorseCardList from '../Cards/HorseCardList'
import BlackFooter from '../Footer/BlackFooter'

const Home = () => {
  return (
    <>
        {/* header when the user will logged in starts */}
        <Headers headerType="home-page" />
        {/* header when the user will logged in ends */}

        {/* Loggedin user Landing page starts */}
        <Grid container sx={{height:"calc(100vh - 101px)"}}>
            {/* left side contains title description socialLinks icons and buyer/seller buttons starts */}
            <Grid item xs={6}>
                <Grid container sx={{height:"100%"}}>
                    <SocialLinks />
                    <Grid item xs={10} sx={{display:"flex",alignItems:"center"}}>
                        <Grid container direction="column" sx={{paddingLeft:"40px",paddingRight:"40px"}} spacing={0.2}>
                            <Grid item>
                                <Typography variant='authTitle' sx={{fontSize:"50px"}}>
                                    BUY an enbarr horse
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='authTitle' sx={{fontSize:"149.403px",lineHeight:"179px"}}>
                                    TODAY!
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='landingPageSubDesc'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque in mattis risus
                                    nam vitae.
                                </Typography>
                            </Grid>
                            <Grid item sx={{mt:4}}>
                                <Grid container spacing={0.2}>
                                    <Grid item xs={5}>
                                        <Button title="A Buyer" />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Button title="A Seller" />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/* left side contains title description socialLinks icons and buyer/seller buttons ends */}
            {/* right side 3 horse images starts */}
            <Grid item xs={6} sx={{height:"100%"}}>
                <img src={homeImage} alt=""
                    style={{position:"absolute",right:"5px",objectFit:"cover",width:"55vw",top:"40px"}} />
            </Grid>
            {/* right side 3 horse images ends */}
        </Grid>
        {/* Loggedin user Landing page end */}
        {/* Recentely Added starts */}
        <HorseCardList title="Recently added" numberOfCards={3} />
        {/* Recentely Added ends */}
        {/* Tops Adds starts */}
        <HorseCardList title="Top Adds" numberOfCards={6} />
        {/* Tops Adds ends */}
        {/* Trending Adds starts */}
        <HorseCardList title="Trending Adds" numberOfCards={6} />
        {/* Trending Adds ends */}

        {/* footer starts */}
            <BlackFooter />
        {/* footer ends */}

    </>
  )
}

export default Home