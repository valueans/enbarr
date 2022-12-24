import { Checkbox, FormControlLabel, FormGroup, Grid,Typography } from '@mui/material'
import React from 'react'
import CustomInput from '../Inputs/CustomInput'
import Button from '../Buttons/Button'

const AuthenticationForm = ({formType}) => {
    const submit = (e)=>{
        console.log("form submitted")
        e.preventDefault();
    }

  return (
    <form onSubmit={submit}>
        <Grid container spacing={1}> 
            <Grid item xs={12} sx={{width:"100%"}}>
                <Typography variant="authTitle" component="div">{formType}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="authInputTitle" component="div">Email</Typography>
                <CustomInput type="text" placeholder="Email"/>
            </Grid>
            {(formType==="Sign up"?
            <>
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
            </>
            :
            <>
            <Grid item xs={12}>
                <Typography variant="authInputTitle" component="div">password</Typography>
                <CustomInput type="password" placeholder="password"/>
            </Grid>
            <Grid item xs={12} className="justifyContentEnd">
                <a href="http://" target="_blank" rel="noopener noreferrer" className='linkBlack'>
                    <Typography variant='authInputTitle'>Forgot password</Typography>
                </a>
            </Grid>
            <Grid item xs={12}>
                <Button title="Login" type="submit" width="100%"/>
            </Grid>
            </>)}
        </Grid>
    </form>
  )
}

export default AuthenticationForm