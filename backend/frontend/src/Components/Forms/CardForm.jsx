import { Alert, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PaymentServices from '../../Services/PaymentServices'
import CustomInput from '../Inputs/CustomInput'
import Button from '../Buttons/Button'
import { getUserProfile as DefaultUserProfile, setUserProfile } from '../../Constants/storage'

const CardForm = ({subscriptionPlanId,setSnackBarData}) => {
  const [paymentMethodDetails,setPaymentMethodDetails] = useState({id:"",last_4:"",exp_month:"",exp_year:"",message:""})

  const subscriptionPlan  = DefaultUserProfile().subscription_plan;

  useEffect(()=>{
    const getPaymentMethod = async ()=>{
      try {
        const response = await PaymentServices.getPaymentMethods();
        setPaymentMethodDetails(response)
      } catch (error) {
        setSnackBarData({open:true,message:"Something went wrong please try later..",severity:"error"})
      }
    }
    getPaymentMethod()
  },[])


  const upgradeSubscriptionPlan = async ()=>{
    try{
      const response = await PaymentServices.upgradeSubscription(subscriptionPlanId);
      setUserProfile(response['data'])
      setSnackBarData({open:true,message:"Your subscription plan is successfully updated",severity:"success"})
    }
    catch(error){
      if (error.response.data.message){
        setSnackBarData({open:true,message:error.response.data.message,severity:"error"})
      }
      else{
        setSnackBarData({open:true,message:"Something went wrong please try later..",severity:"error"})
      }
    }
  }

  return (
    <Grid container spacing={2}>
        {
          paymentMethodDetails.message && paymentMethodDetails.message.length > 0?
          <Grid item xs={12} sx={{mt:2}}>
            <Alert severity="error">{paymentMethodDetails.message}</Alert>
          </Grid>:paymentMethodDetails.last_4.length ===0?<Grid item xs={12} sx={{mt:2}}>
            <Alert severity="warning">"No payment method found please Add Payment method to upgrade your subscription"</Alert>
          </Grid>:""
        }
        <Grid item xs={12}>
            <Typography variant="authInputTitle" component="div">Card number</Typography>
            <CustomInput type="text" placeholder="**** **** **** 4242" value={`**** **** **** ${paymentMethodDetails.last_4.length>0?paymentMethodDetails.last_4:"****"}`} readOnly={true}/>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="authInputTitle" component="div">Expiration date</Typography>
            <CustomInput type="text" placeholder="03/22" value={`${paymentMethodDetails.exp_month<10&&paymentMethodDetails.exp_month.length>0?'0'+paymentMethodDetails.exp_month:paymentMethodDetails.exp_month}/${paymentMethodDetails.exp_year}`} readOnly={true}/>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="authInputTitle" component="div">CVV</Typography>
            <CustomInput type="text" placeholder="***" value="***" readOnly={true}/>
        </Grid>
        {
          paymentMethodDetails.id?
          <>
          <Grid item xs={12}>
          <Button title="Upgrade subscription" width="100%" disabled={subscriptionPlan===subscriptionPlanId || paymentMethodDetails.last_4===""} onClick={upgradeSubscriptionPlan}/>
          </Grid>
          </>:null
        }
    </Grid>
  )
}

export default CardForm