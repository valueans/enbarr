import React from 'react'
import {Grid, Typography} from '@mui/material';
import CustomInput from '../Inputs/CustomInput';
import Button from '../Buttons/Button';

const OtpVerificationForm = ({setShowTabs}) => {
    
    setShowTabs(false);
    const submit =(event)=>{
        event.preventDefault();
    }

  return (
    <form onSubmit={submit}>
        <Grid container spacing={1}>
            <Grid item xs={12} sx={{width:"100%"}}>
                <Typography variant="authTitle" component="div">Verification</Typography>
            </Grid>
            <Grid item xs={12} sx={{textAlign:"center"}}>
                <Typography variant="authInputTitle" component="div">Verification Otp is sended to registered email
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{mt:4}}>
                <Grid container className="justifyContentCenter">
                    <Grid item xs={1} sx={{ml:2,mr:2}}>
                        <CustomInput type="text" maxLength={1} />
                    </Grid>
                    <Grid item xs={1} sx={{ml:2,mr:2}}>
                        <CustomInput type="text" maxLength={1} />
                    </Grid>
                    <Grid item xs={1} sx={{ml:2,mr:2}}>
                        <CustomInput type="text" maxLength={1} />
                    </Grid>
                    <Grid item xs={1} sx={{ml:2,mr:2}}>
                        <CustomInput type="text" maxLength={1} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{mt:4}}>
                <Button title="Verify" type="submit" width="100%" />
            </Grid>
        </Grid>
    </form>
  )
}

export default OtpVerificationForm