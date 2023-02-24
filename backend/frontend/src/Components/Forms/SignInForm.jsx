import React, { useState } from 'react'
import { Grid,Typography } from '@mui/material'
import CustomInput from '../Inputs/CustomInput';
import Button from '../Buttons/Button';
import { useFormik } from "formik";
import { loginSchema } from '../../Schemas';
import AuthService from '../../Services/AuthService';
import { Link, useNavigate } from 'react-router-dom';
import { setAccessToken,setVerifyStatus } from '../../Constants/storage';

const SignInForm = ({setSnackBarData}) => {
    const navigator = useNavigate();

    const initialValues = {
        email: "",
        password: "",
      };


      const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
      useFormik({
        initialValues,
        validationSchema: loginSchema,
        validateOnChange: true,
        validateOnBlur: false,
        onSubmit: async (values, action) => {
        try {
            const response = await AuthService.loginMethod(values.email,values.password);
            setAccessToken(response.token);
            setVerifyStatus(response.user.is_verified)
            if(response.user.is_verified){
                action.resetForm();
                return navigator('/')
            }
            else{
                return navigator('/auth/verify')
            } 
        } catch (error) {
            if (error.response.status === 400){
                setSnackBarData({open:true,message:"Invalid email or password",severity:"error"})
            }
            else{
                setSnackBarData({open:true,message:"Something went wrong please try again later",severity:"error"})
            }
        }
        },
      });


  return (
    <form onSubmit={handleSubmit}>
        <Grid container item xs={12} spacing={1}>
            <Grid item xs={12} sx={{width:"100%"}}>
                <Typography variant="authTitle" component="div">Login</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="authInputTitle" component="div">Email</Typography>
                <CustomInput type="text" placeholder="Email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                {touched.email && errors.email ? (
                      <span className="form-error">{errors.email}</span>
                ) : null}
            </Grid>
            <Grid item xs={12}>
                <Typography variant="authInputTitle" component="div">password</Typography>
                <CustomInput type="password" placeholder="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
                {touched.password && errors.password ? (
                      <span className="form-error">{errors.password}</span>
                ) : null}
            </Grid>
            <Grid item xs={12} className="justifyContentEnd">
                <Link to='/auth/reset-email' className='linkBlack'>Forgot password</Link>
            </Grid>
            <Grid item xs={12}>
                <Button title="Login" type="submit" width="100%" />
            </Grid>
        </Grid>
    </form>
  )
}

export default SignInForm