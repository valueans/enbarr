import React,{useState} from 'react'
import {Grid, Typography,Alert} from '@mui/material';
import CustomInput from '../Inputs/CustomInput';
import Button from '../Buttons/Button';
import { useNavigate } from 'react-router-dom';
import { verifyOtpSchema } from '../../Schemas';
import { useFormik } from "formik";
import AuthService from '../../Services/AuthService';
import { setVerifyStatus } from '../../Constants/storage';

const OtpVerificationForm = ({setShowTabs}) => {

    const navigator = useNavigate();
    setShowTabs(false)
    const initialValues = {
        otp1: "",
        otp2: "",
        otp3: "",
        otp4: "",
      };
    const [error,setError] = useState("");

    const { values, handleBlur, handleChange, handleSubmit} =
      useFormik({
        initialValues,
        validationSchema: verifyOtpSchema,
        validateOnChange: true,
        validateOnBlur: false,
        onSubmit: (values, action) => {
        const response = AuthService.verifyOtpMethod(`${values.otp1}${values.otp2}${values.otp3}${values.otp4}`);
        response.then(result =>{
            setVerifyStatus(true)
            action.resetForm();
            return navigator('/')
        })
        .catch(error=>{
            if (error.response.status === 400){
                setError(error.response.data.message);
            }
        })
        },
      });

  return (
    <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
            <Grid item xs={12} sx={{width:"100%"}}>
                <Typography variant="authTitle" component="div">Verification</Typography>
            </Grid>
            <Grid item xs={12} sx={{textAlign:"center"}}>
                <Typography variant="authInputTitle" component="div">Verification Otp is sended to registered email
                </Typography>
            </Grid>
            {
                error?<Grid item xs={12} sx={{width:"100%"}}>
                    <Alert severity="error">{error}</Alert>
                </Grid>:null
            }
            <Grid item xs={12} sx={{mt:4}}>
                <Grid container className="justifyContentCenter">
                    <Grid item xs={1} sx={{ml:2,mr:2}}>
                        <CustomInput type="text" maxLength={1} value={values.otp1} name="otp1" onChange={handleChange} onBlur={handleBlur}/>
                    </Grid>
                    <Grid item xs={1} sx={{ml:2,mr:2}}>
                        <CustomInput type="text" maxLength={1} value={values.otp2} name="otp2" onChange={handleChange} onBlur={handleBlur}/>
                    </Grid>
                    <Grid item xs={1} sx={{ml:2,mr:2}}>
                        <CustomInput type="text" maxLength={1} value={values.otp3} name="otp3" onChange={handleChange} onBlur={handleBlur}/>
                    </Grid>
                    <Grid item xs={1} sx={{ml:2,mr:2}}>
                        <CustomInput type="text" maxLength={1} value={values.otp4} name="otp4" onChange={handleChange} onBlur={handleBlur}/>
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