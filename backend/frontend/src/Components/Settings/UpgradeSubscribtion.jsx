import React from 'react';
import { Grid,Typography } from '@mui/material';
import SubscriptionCard from '../Cards/SubscriptionCard';

const UpgradeSubscribtion = () => {
  return (
    <Grid container sx={{p:10}}>
        <Grid item xs={12} sx={{textAlign:"center"}}>
            <Typography variant="landingPageDesc">Subscriptions</Typography>
        </Grid>
        <Grid container sx={{mt:4}} spacing={5}>
            <Grid item xs={12} lg={4} sx={{textAlign:"center"}}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="myHorseCardTitle" sx={{color:"black"}}>Basic offer</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <SubscriptionCard backgroundColor='#EEEAE7'/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} lg={4} sx={{textAlign:"center"}}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="myHorseCardTitle" sx={{color:"black"}}>Premium offer</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <SubscriptionCard title="50$" backgroundColor='#DBE2E0'/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} lg={4} sx={{textAlign:"center"}}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="myHorseCardTitle" sx={{color:"#313033"}}>Platinum offer</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <SubscriptionCard title="100$" backgroundColor='#617D86' color='#FFFFFF' buttonColor="#FFFFFF"/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
  )
}

export default UpgradeSubscribtion