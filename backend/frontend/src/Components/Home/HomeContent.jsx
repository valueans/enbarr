import React,{useState,useEffect} from 'react';
import { Grid,Typography } from '@mui/material';
import homeImage from '../../assets/homeImage.png';
import SocialLinks from '../SocialLinks/SocialLinksVertical';
import Button from '../Buttons/Button';
import HorseCardList from '../Cards/HorseCardList';
import { useNavigate } from 'react-router-dom';
import HorseService from '../../Services/HorseService';
import AuthService from '../../Services/AuthService';
import { setUserProfile,getUserProfile } from '../../Constants/storage';
import BlackFooter from '../Footer/BlackFooter'

const HomeContent = () => {
    const navigator = useNavigate();
    const isAuthenticated = AuthService.checkUserAuthenticated();

    const [recentlyAddedHorses,setRecentlyAddedHorses] = useState([]);
    const [topHorses,setTopHorses] = useState([]);
    const [trendingHorses,setTrendingHorses] = useState([]);

    useEffect(() => {
        if (!isAuthenticated){
          navigator("/")   
        }
    },[isAuthenticated,navigator])

    useEffect(() => {
        const fetchData = async () => {
            const recentlyAddedAdds = await HorseService.getRecentlyAddedHorses();
            const topAdds = await HorseService.getTopHorses();
            const trendingAdds = await HorseService.getTrendingHorses();
            setRecentlyAddedHorses(recentlyAddedAdds.results)
            setTopHorses(topAdds.results)
            setTrendingHorses(trendingAdds.results)
        }
        const getUserProfile = async ()=>{
            const response = await AuthService.getUserProfile();
            setUserProfile(response)
        }
        getUserProfile()
        fetchData()
    },[])

    const buyerClicks = ()=>{
        return navigator('/home/buyer')
    }
    const sellerClicks = ()=>{
        const profile = getUserProfile();
        if (profile.user_subscription.title === 'Basic'){
            return navigator('/home/upgradeSubscription')
        }
        else{
            return navigator('/home/seller')
        }
    }

  return (
    <>
    <Grid container direction="row">
        <Grid item xs={1} sx={{pt:4}}>
            <SocialLinks />
        </Grid>
        <Grid container item xs={11} sx={{height:"calc(100vh - 101px)",backgroundImage:`url(${homeImage})`,backgroundSize:"contain",backgroundRepeat:"no-repeat",backgroundPosition:"right",display:"flex",alignContent:"start"}}>
            <Grid item xs={12} sx={{mt:4,height:"80px"}}>
                <Typography variant='landingPageTitle' sx={{fontSize:"40px",fontWeight:800}}>
                    Buy, Sell, Ride.
                </Typography>
            </Grid>
            <Grid item xs={2} sx={{height:"60px"}} >
                <Button title="A Buyer" onClick={buyerClicks}/>
            </Grid>
            <Grid item xs={2} sx={{height:"60px"}} >
                <Button title="A Seller" onClick={sellerClicks}/>
            </Grid>
        </Grid>
        <Grid container sx={{position:"absolute",top:"300px"}}>
            <Grid item xs={12}>
                <HorseCardList title="Recently added" adds={recentlyAddedHorses}/>
            </Grid>
            <Grid item xs={12}>
                <HorseCardList title="Top Adds" adds={topHorses}/>
            </Grid>
            <Grid item xs={12}>
                <HorseCardList title="Trending Adds" adds={trendingHorses} />
            </Grid>
            <Grid item xs={12}>
                <BlackFooter />
            </Grid>
        </Grid>
    </Grid>
    </>
  )
}

export default HomeContent