import React, { useEffect, useState } from 'react';
import { Grid,Typography } from '@mui/material';
import SubscriptionCard from '../Cards/SubscriptionCard';
import PaymentServices from '../../Services/PaymentServices';
import Button from '../Buttons/Button';
import { Link } from 'react-router-dom';
import HorseImage from '../Svgs/HorseImage';
import AuthService from '../../Services/AuthService';

const UpgradeSubscribtion = ({setSnackBarData}) => {
    

    const [plans,setPlans] = useState([]);

    const isAuthenticated = AuthService.checkUserAuthenticated();

    useEffect(() => {
      if (!isAuthenticated){
        navigator("/")   
      }
    },[isAuthenticated,navigator])


    useEffect(()=>{
        const getAllSubscriptionPlans = async ()=>{
            try {
                const response = await PaymentServices.getAllSubscriptionPlans();
                setPlans(response)   
            } catch (error) {
                setSnackBarData({open:true,message:"Something went wrong please try again later",severity:"error"})
            }
        }
        getAllSubscriptionPlans()
    },[])




  return (
    <Grid container sx={{p:10}}>
        <Grid item xs={12} sx={{textAlign:"center"}}>
            <Typography variant="landingPageDesc">Subscriptions</Typography>
        </Grid>
        <Grid container item xs={12}  className="justifyContentCenter" sx={{zIndex:10}}>
            {
            
            plans.map((plan,index)=>{
                return <Grid item xs={12} lg={4} sx={{textAlign:"center"}}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="myHorseCardTitle" sx={{color:"black"}}>{plan.title} offer</Typography>
                    </Grid>
                    <Grid item xs={12} className="justifyContentCenter">
                        <SubscriptionCard backgroundColor={index===0?'#EEEAE7':index===1?'#DBE2E0':'#617D86'} color={index===0||index===1?'#2F3C4C':'#FFFFFF'} buttonColor={index===2?"#FFFFFF":""} title={plan.price} description={plan.description} description_features={plan.description_features}/>
                    </Grid>
                </Grid>
            </Grid>
            })
            }
        </Grid>
        <Grid item xs={12} sx={{mt:6}} className="justifyContentCenter">
            <Link to="/home/seller" style={{textDecoration:"none",width:"30%"}}>
            <Button title="Close" width="100%" />
            </Link>
        </Grid>
        <HorseImage />
    </Grid>
  )
}

export default UpgradeSubscribtion