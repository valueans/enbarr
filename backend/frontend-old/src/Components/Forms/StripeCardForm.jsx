import React from 'react'
import Button from '../Buttons/Button'
import {PaymentElement,useStripe, useElements} from '@stripe/react-stripe-js';
import { Grid } from '@mui/material';

const StripeCardForm = ({setSnackBarData}) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e)=>{
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const {error} = await stripe.confirmSetup({elements,confirmParams: {
            return_url: window.location.href,
          },});
        
          if (error) {
            setSnackBarData({open:true,message:error.message,severity:"error"});
          }
    }

  return (
        <form style={{width:"100%"}} onSubmit={handleSubmit}>
            <Grid item xs={12}>
                    <PaymentElement/>
            </Grid>
            <Grid item xs={12} sx={{mt:3}}>
                <Button title="Add Card" type="submit" width="100%" disabled={!stripe}/>
            </Grid>
        </form>
  )
}

export default StripeCardForm