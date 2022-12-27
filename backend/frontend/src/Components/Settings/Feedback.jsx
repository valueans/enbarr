import React from 'react'
import { Grid,Typography } from '@mui/material';
import Button from '../Buttons/Button';
import CustomInput from '../Inputs/CustomInput';

const Feedback = () => {
  return (
    <Grid container spacing={5} sx={{p:10}}>
        <Grid item xs={6}>
            <Typography variant="authTitle" component="div"> Support/ Send Feedback</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="authInputTitle" component="div">Email address</Typography>
            <CustomInput type="text" />
        </Grid>
        <Grid item xs={12}>
            <Typography variant="authInputTitle" component="div">Message</Typography>
            <CustomInput type="text" minRows={10} maxRows={40} multiline={true} maxLength={2000}/>
        </Grid>
        <Grid item xs={12}>
            <Button title="Submit" width="100%"/>
        </Grid>
    </Grid>
  )
}

export default Feedback