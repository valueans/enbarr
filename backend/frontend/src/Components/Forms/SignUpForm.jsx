import React,{useState} from 'react'
import { Grid,Typography,FormGroup,FormControlLabel,Checkbox } from '@mui/material'
import CustomInput from '../Inputs/CustomInput';
import Button from '../Buttons/Button';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import { signUpSchema } from '../../Schemas';
import AuthService from '../../Services/AuthService';
import { setAccessToken,setVerifyStatus } from '../../Constants/storage';

const SignUpForm = ({setSnackBarData}) => {
    const navigator = useNavigate();


    const initialValues = {
        email: "",
        password: "",
        confirm_password: "",
      };

      const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
      useFormik({
        initialValues,
        validationSchema: signUpSchema,
        validateOnChange: true,
        validateOnBlur: false,
        onSubmit: async (values, action) => {
        try {
            const response = await AuthService.registerMethod(values.email,values.password);
            setAccessToken(response.token);
            setVerifyStatus(response.user.is_verified)
            return navigator('/auth/verify')
            
        } catch (error) {
            if (error.response.status === 400){
                if (error.response.data.email){
                    console.log(error.response.data);
                    setSnackBarData({open:true,message:error.response.data.email[0],severity:"error"})
                }
            }
            else{
                setSnackBarData({open:true,message:"Something went wrong please try again later",severity:"error"})
            }   
        }
        },
      });

  return (
    <form onSubmit={handleSubmit}>
    <Grid container spacing={1}> 
            <Grid item xs={12} sx={{width:"100%"}}>
                <Typography variant="authTitle" component="div">Sign up</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="authInputTitle" component="div">Email</Typography>
                <CustomInput type="text" placeholder="Email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                {touched.email && errors.email ? (
                      <span className="form-error">{errors.email}</span>
                ) : null}
            </Grid>
            <Grid item xs={6}>
                <Typography variant="authInputTitle" component="div">Create password</Typography>
                <CustomInput type="password" placeholder="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
                {touched.password && errors.password ? (
                      <span className="form-error">{errors.password}</span>
                ) : null}
            </Grid>
            <Grid item xs={6}>
                <Typography variant="authInputTitle" component="div">Confirm Create password</Typography>
                <CustomInput type="password" placeholder="password" name="confirm_password" value={values.confirm_password} onChange={handleChange} onBlur={handleBlur} />
                {touched.confirm_password && errors.confirm_password ? (
                      <span className="form-error">{errors.confirm_password}</span>
                ) : null}
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