import React,{useState,useEffect} from 'react';
import { Grid,Typography } from '@mui/material';
import homeImage from '../../assets/homeImage.png';
import SocialLinks from '../SocialLinks/SocialLinksVertical';
import Button from '../Buttons/Button';
import HorseCardList from '../Cards/HorseCardList';
import { useNavigate } from 'react-router-dom';
import HorseService from '../../Services/HorseService';

const HomeContent = () => {
    const navigator = useNavigate();

    const [recentlyAddedHorses,setRecentlyAddedHorses] = useState([]);
    const [topHorses,setTopHorses] = useState([]);
    const [trendingHorses,setTrendingHorses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const recentlyAddedAdds = await HorseService.getRecentlyAddedHorses();
            const topAdds = await HorseService.getTopHorses();
            const trendingAdds = await HorseService.getTrendingHorses();
            setRecentlyAddedHorses(recentlyAddedAdds.results)
            setTopHorses(topAdds.results)
            setTrendingHorses(trendingAdds.results)
        }
        fetchData()
    },[])

    const buyerClicks = ()=>{
        return navigator('/home/buyer')
    }
    const sellerClicks = ()=>{
        return navigator('/home/seller')
    }

  return (
    <>
    {/* Loggedin user Landing page starts */}
    <Grid container sx={{height:"calc(100vh - 101px)"}}>
            {/* left side contains title description socialLinks icons and buyer/seller buttons starts */}
            <Grid item xs={12} lg={6}>
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
                                        <Button title="A Buyer" onClick={buyerClicks} />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Button title="A Seller" onClick={sellerClicks} />
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
        <HorseCardList title="Recently added" adds={recentlyAddedHorses}/>
        {/* Recentely Added ends */}
        {/* Tops Adds starts */}
        <HorseCardList title="Top Adds" adds={topHorses}/>
        {/* Tops Adds ends */}
        {/* Trending Adds starts */}
        <HorseCardList title="Trending Adds" adds={trendingHorses} />
        {/* Trending Adds ends */}
    </>
  )
}

export default HomeContent