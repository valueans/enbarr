import React, { useState } from 'react'
import { Grid,Typography } from '@mui/material'
import CustomInput from '../Inputs/CustomInput';
import Button from '../Buttons/Button';
import { useFormik } from "formik";
import { loginSchema } from '../../Schemas';
import AuthService from '../../Services/AuthService';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { setAccessToken,setVerifyStatus } from '../../Constants/storage';

const SignInForm = () => {
    const navigator = useNavigate();

    const [error,setError] = useState("");

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
        onSubmit: (values, action) => {
        const response = AuthService.loginMethod(values.email,values.password);
        response.then(result =>{
            setAccessToken(result.token);
            setVerifyStatus(result.user.is_verified)
            if(result.user.is_verified){
                action.resetForm();
                return navigator('/')
            }
            else{
                return navigator('/auth/verify')
            }  
        }).catch(error=>{
            if (error.response.status === 400){
                setError("Invalid email or password")
            }
            else{
                setError("Something went wrong please try again later")
            }
            console.log(error.response.status);
        })
        },
      });


  return (
    <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
            <Grid item xs={12} sx={{width:"100%"}}>
                <Typography variant="authTitle" component="div">Login</Typography>
            </Grid>
            {
                error?<Grid item xs={12} sx={{width:"100%"}}>
                    <Alert severity="error">{error}</Alert>
                </Grid>:null
            }
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