import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LongHorizontalLineIcon from '../Svgs/LongHorizontalLineIcon'
import ShortSubscriptionCard from '../Cards/ShortSubscriptionCard'
import StripeCardForm from './StripeCardForm'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import PaymentServices from '../../Services/PaymentServices'
import Button from '../Buttons/Button'
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CardForm from './CardForm'



const StripePaymentForm = ({setSnackBarData,subscriptionPlanId,setSubscriptionPlanId}) => {
    const [setupIntent,setSetupIntent] = useState({setupIntent:"",ephemeralKey:"",customer:"",publish_key:""});
    const stripePromise = loadStripe(setupIntent.publish_key);
    const [showPaymentForm,setShowPaymentForm] = useState(false);
    const [plans,setPlans] = useState([]);

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
    const appearance = {
        theme: 'flat',
        variables: {
          fontFamily: ' "Gill Sans", sans-serif',
          fontLineHeight: '1.5',
          borderRadius: '15px',
          colorBackground: '#F4F4F4',
          colorPrimaryText: '#262626',
        spacingGridRow:"20px",
        spacingGridColumn:"20px",
        spacingAccordionItem:"20px",
        colorPrimary:"#302F32"
        },
        rules: {
          '.Block': {
            backgroundColor: 'var(--colorBackground)',
            boxShadow: 'none',
            padding: '12px',
          },
          '.Input': {
            padding: '12px',
          },
          '.Input:disabled, .Input--invalid:disabled': {
            color: 'lightgray'
          },
          '.Tab': {
            padding: '10px 12px 8px 12px',
            border: 'none',
          },
          '.Tab:hover': {
            border: 'none',
            boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)'
          },
          '.Tab--selected, .Tab--selected:focus, .Tab--selected:hover': {
            border: '1px solid black',
            backgroundColor: '#fff',
            boxShadow: '0 0 0 1.5px var(--colorPrimaryText), 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)'
          },
          '.Label': {
            fontWeight: '500'
          }
        }
      };
    const options = {
        // passing the client secret obtained from the server
        clientSecret: setupIntent.setupIntent,
        appearance:appearance,
    };

    const getSetupIntent = async ()=>{
        const response = await PaymentServices.getSetupIntent();
        setSetupIntent(response)
    }

    const styles = {
        stripePaymentWrapper: {
            padding: 10,
            '@media (max-width: 600px)': {
                padding: 2.5
            }
        },
        stripePaymentButton: {
            width: "40%",
            '@media (max-width: 600px)': {
                width: "100%"
            }
        }
    }

  return (
    <Grid container spacing={1} sx={styles.stripePaymentWrapper}>
            <Grid item xs={12} sx={{width:"100%"}}>
                <Typography variant="authTitle" component="div">Subscription</Typography>
            </Grid>
            <Grid item xs={12}>
                <LongHorizontalLineIcon />
            </Grid>
            <Grid item container xs={12} spacing={2}>
                {
                    plans.map((plan,index)=>{
                        return <Grid item xs={12} lg={4} key={plan.id}>
                        <ShortSubscriptionCard plan={plan} subscriptionPlanId={subscriptionPlanId} setSubscriptionPlanId={setSubscriptionPlanId} index={index}/>
                    </Grid>       
                    })
                }
            </Grid>
            <Grid item xs={12} className="justifyContentCenter">
                <Button title={!showPaymentForm?'Add Card':"Close Payment Form"} onClick={async ()=>{
                    if(showPaymentForm){
                        setShowPaymentForm(false)
                    }
                    else{
                        await getSetupIntent()
                        setShowPaymentForm(true)
                    }
                }} icon={<CreditCardIcon/>}/>
            </Grid>
            {
                showPaymentForm?<Grid item container xs={12}>
                <Elements stripe={stripePromise} options={options}>
                    <StripeCardForm setSnackBarData={setSnackBarData}/>
                </Elements>
            </Grid>:<CardForm subscriptionPlanId={subscriptionPlanId} setSnackBarData={setSnackBarData}/>
            }

    </Grid>
  )
}

export default StripePaymentForm