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
        if (profile.user_subscription?.title === 'Basic'){
            return navigator('/home/upgradeSubscription')
        }
        else{
            return navigator('/home/seller')
        }
    }

    const styles = {
        title: {
            fontSize:"40px",
            fontWeight:800,

            '@media (max-width: 600px)': {
                textAlign: 'center',
                width: '100%',
                display: 'inline-block',
                marginBottom: '12px',
            },
        },
        typeButton: {
            marginBottom: 0,
            '@media (max-width: 600px)': {
                textAlign: 'center',
                width: '100%',
                display: 'inline-block'
            },
        },
        extraSettingsBuyer: {
            height:"60px",
            marginBottom: '12px',
            '@media (max-width: 600px)': {
                marginLeft: '48px',
            },
        },
        extraSettingsSeller: {
            height:"60px",
            '@media (max-width: 600px)': {
                marginLeft: '48px',
            },
        },
        extraSocial: {
            pt: '32px',
            '@media (max-width: 600px)': {
                marginLeft: '12px',
            },
        }
    }

  return (
    <>
    <Grid container direction="row">
        <Grid item xs={1} sx={styles.extraSocial}>
            <SocialLinks />
        </Grid>
        <Grid container item xs={10} sx={{height:"calc(100vh - 101px)",backgroundImage:`url(${homeImage})`,backgroundSize:"contain",backgroundRepeat:"no-repeat",backgroundPosition:"right",display:"flex",alignContent:"start"}}>
            <Grid item xs={12} sx={{mt:4,height:"60px", mb: 1.5}}>
                <Typography variant='landingPageTitle' sx={styles.title}>
                    Buy, Sell, Ride.
                </Typography>
            </Grid>
            <Grid item xs={7} md={2} sx={styles.extraSettingsBuyer} >
                <Button width='100%' title="A Buyer" onClick={buyerClicks}/>
            </Grid>
            <Grid item xs={7} lg={2} sx={styles.extraSettingsSeller} >
                <Button width='100%' title="A Seller" onClick={sellerClicks}/>
            </Grid>
        </Grid>
        <Grid container sx={{position:"absolute",top:"320px"}}>
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