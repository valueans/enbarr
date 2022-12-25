import React from 'react'
import { Grid,Typography,FormGroup,FormControlLabel,Checkbox } from '@mui/material'
import CustomInput from '../Inputs/CustomInput';
import Button from '../Buttons/Button';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
    const navigator = useNavigate();

    const submit = (e)=>{
        e.preventDefault();
        return navigator('/auth/verify')
    }
  return (
    <form onSubmit={submit}>
    <Grid container spacing={1}> 
            <Grid item xs={12} sx={{width:"100%"}}>
                <Typography variant="authTitle" component="div">Sign up</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="authInputTitle" component="div">Email</Typography>
                <CustomInput type="text" placeholder="Email"/>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="authInputTitle" component="div">Create password</Typography>
                <CustomInput type="password" placeholder="password"/>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="authInputTitle" component="div">Confirm Create password</Typography>
                <CustomInput type="password" placeholder="password"/>
            </Grid>
            <Grid item xs={12}>
            <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="I have read Terms and Conditions and Privacy Policy" />
            </FormGroup>
            </Grid>
            <Grid item xs={12}>
            <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
            </FormGroup>
            </Grid>
            <Grid item xs={12}>
                <Button title="Sign up" type="submit" width="100%"/>
            </Grid>
    </Grid>
    </form>
  )
}

export default SignUpForm