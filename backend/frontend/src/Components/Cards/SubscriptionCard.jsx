import React from 'react'
import { Grid,Typography } from '@mui/material';
import LongHorizontalLineIcon from '../Svgs/LongHorizontalLineIcon';
import Button from '../Buttons/Button';

const SubscriptionCard = ({title="",description="",description_features=[],backgroundColor="#DBE2E0",color="#2F3C4C",buttonColor}) => {
  return (
    <Grid container
        sx={{minWidth:"100%",minHeight:"500px",background:backgroundColor,boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.1)",borderRadius: "30px",p:5}}>
        <Grid item xs={12}>
            <Typography variant="subscriptionCardTitle" sx={{color:color}}>{title<1?"Freee":`$ ${title}`}</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="" sx={{color:color}}>{description}</Typography>
        </Grid>
        <Grid item xs={12}>
            <LongHorizontalLineIcon color={color} />
        </Grid>
        {
            description_features.map((feature)=>{
                return <Grid item xs={12}>
                    <Typography variant="authInputTitle" sx={{color:color}}>{feature}</Typography>
                </Grid>
            })
        }
        <Grid item xs={12}>
            <Button title="Get Started" width="100%" backgroundColor={color} color={color==="#FFFFFF"?"#313033":"#FFFFFF"}/>
        </Grid>
    </Grid>
  )
}

export default SubscriptionCard