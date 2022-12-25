import React from 'react'
import { Grid,Typography } from '@mui/material'
import CustomInput from '../Inputs/CustomInput';
import Button from '../Buttons/Button';

const SignInForm = () => {
    const submit = (e)=>{
        e.preventDefault();
    }


  return (
    <form onSubmit={submit}>
        <Grid container spacing={1}>
            <Grid item xs={12} sx={{width:"100%"}}>
                <Typography variant="authTitle" component="div">Login</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="authInputTitle" component="div">Email</Typography>
                <CustomInput type="text" placeholder="Email" />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="authInputTitle" component="div">password</Typography>
                <CustomInput type="password" placeholder="password" />
            </Grid>
            <Grid item xs={12} className="justifyContentEnd">
                <a href="http://" target="_blank" rel="noopener noreferrer" className='linkBlack'>
                    <Typography variant='authInputTitle'>Forgot password</Typography>
                </a>
            </Grid>
            <Grid item xs={12}>
                <Button title="Login" type="submit" width="100%" />
            </Grid>
        </Grid>
    </form>
  )
}

export default SignInForm