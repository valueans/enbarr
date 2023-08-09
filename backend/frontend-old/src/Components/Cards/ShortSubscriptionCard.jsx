import { FormControlLabel, Grid, Radio, Typography } from '@mui/material'
import React from 'react'

const ShortSubscriptionCard = ({plan,subscriptionPlanId,setSubscriptionPlanId,index}) => {

    const handleChange = (e)=>{
        setSubscriptionPlanId(e.target.value)
    }
  return (
    <Grid container direction="column" sx={{borderRadius:"15px",backgroundColor:index===0?"#EEEAE7":index===1?"#DBE2E0":"#617D86",p:1}}>
        <Grid item container xs={3} sx={{width:"100%"}} className="justifyContentEnd">
        <FormControlLabel control={<Radio checked={parseInt(subscriptionPlanId) === parseInt(plan.id)} handle/>} value={plan.id} onChange={handleChange}/>
        </Grid>
        <Grid item container xs={6} sx={{width:"100%"}}>
            <Grid item xs={12}>
                <Typography variant="imageDescriptions" component="div" sx={{color:index<=1?"#2F3C4C":"#FFFFFF"}}>{plan.title}</Typography>
            </Grid>
            <Grid item xs={12} className="alignContentTop" >
                <Typography variant="landingPageTitle" component="div" sx={{color:index<=1?"#2F3C4C":"#FFFFFF"}}>{plan.price>0?`$ ${plan.price}`:"Free"}</Typography>
            </Grid>
        </Grid>
    </Grid>
  )
}

export default ShortSubscriptionCard