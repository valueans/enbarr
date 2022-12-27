import React from 'react'
import { Grid,Typography } from '@mui/material';
import Button from '../Buttons/Button';
import CustomInput from '../Inputs/CustomInput';

const ChangePassword = () => {
  return (
    <Grid container spacing={5} sx={{p:10}}>
        <Grid item>
            <Typography variant="authTitle" component="div">Change password</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="authInputTitle" component="div">Current Password</Typography>
            <CustomInput type="text" />
        </Grid>
        <Grid item xs={12}>
            <Typography variant="authInputTitle" component="div">New Password</Typography>
            <CustomInput type="text" />
        </Grid>
        <Grid item xs={12}>
            <Typography variant="authInputTitle" component="div">Confirm Password</Typography>
            <CustomInput type="text" />
        </Grid>
        <Grid item xs={12}>
            <Button title="Change Password" width="100%"/>
        </Grid>
    </Grid>
  )
}

export default ChangePassword