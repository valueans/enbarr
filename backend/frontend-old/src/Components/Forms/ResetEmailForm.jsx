import React,{useState} from 'react'
import {Grid, Typography} from '@mui/material';
import CustomInput from '../Inputs/CustomInput';
import Button from '../Buttons/Button';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import AuthService from '../../Services/AuthService';
import { resetEmailSchema } from '../../Schemas';
import { setAccessToken } from '../../Constants/storage';


const ResetEmailForm = ({setShowTabs,setSnackBarData}) => {
    const navigator = useNavigate();

    setShowTabs(false)
    const initialValues = {
        email: "",
        password: "",
    };
    const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
      useFormik({
        initialValues,
        validationSchema: resetEmailSchema,
        validateOnChange: true,
        validateOnBlur: false,
        onSubmit: async (values, action) => {
        try{
            const response = await AuthService.resetEmail(values.email);
            setAccessToken(response.token)
            return navigator('/auth/verify',{
                state:{
                    verificationType:"reset-email"
                }
            })
        }
        catch(error){
            setSnackBarData({open:true,message:error.response.data.message,severity:"error"})
        }
        },
      });
  return (
    <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
            <Grid item xs={12} sx={{width:"100%"}}>
                <Typography variant="authTitle" component="div">Reset Email</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="authInputTitle" component="div">Email</Typography>
                <CustomInput type="text" placeholder="email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                {touched.email && errors.email ? (
                      <span className="form-error">{errors.email}</span>
                ) : null}
            </Grid>
            <Grid item xs={12} sx={{mt:4}}>
                <Button title="Reset email" type="submit" width="100%" />
            </Grid>
        </Grid>
    </form>
  )
}

export default ResetEmailForm