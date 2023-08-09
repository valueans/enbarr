import React,{useState} from 'react'
import {Grid, Typography} from '@mui/material';
import CustomInput from '../Inputs/CustomInput';
import Button from '../Buttons/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { verifyOtpSchema } from '../../Schemas';
import { useFormik } from "formik";
import AuthService from '../../Services/AuthService';
import { setVerifyStatus } from '../../Constants/storage';

const OtpVerificationForm = ({setShowTabs,setSnackBarData,verificationType="normal"}) => {

    const navigator = useNavigate();
    const location = useLocation();
    setShowTabs(false)

    const initialValues = {
        otp1: "",
        otp2: "",
        otp3: "",
        otp4: "",
      };


    const onKeyUp = (e)=>{
        let id = parseInt(e.target.id)
        var key = e.keyCode || e.charCode;
        
        if(id > 1 && id <= 4 && key === 8){
            const prev_field = document.querySelector(`input[name=otp${id-1}]`)
            prev_field.focus();
        }
        if (id <= 3 && key !== 8 ){
            const next_field = document.querySelector(`input[name=otp${id+1}]`)
            next_field.focus();
        }
    }

    const resendVerificationOtp = async () => {
        try {
            const response = await AuthService.sendOtp();
            setSnackBarData({open:true,message:"Verification otp is sended",severity:"success"})
        } catch (error) {
            
        }
    }

    const { values, handleBlur, handleChange, handleSubmit} =
      useFormik({
        initialValues,
        validationSchema: verifyOtpSchema,
        validateOnChange: true,
        validateOnBlur: false,
        onSubmit: async (values, action) => {
        try {
            const response = await AuthService.verifyOtpMethod(`${values.otp1}${values.otp2}${values.otp3}${values.otp4}`);   
            
            action.resetForm();
            if (location.state && location.state.verificationType === "reset-email"){
                return navigator('/auth/change-password')
            }
            else{
                setVerifyStatus(true)
                return navigator('/')
            }
        } catch (error) {
            if (error.response.status === 400){
                setSnackBarData({open:true,message:error.response.data.message,severity:"error"})
            }   
        }
        },
      });

  return (
    <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
            <Grid item xs={12} sx={{width:"100%"}}>
                <Typography variant="authTitle" component="div">Verification</Typography>
            </Grid>
            <Grid item xs={12} sx={{textAlign:"center"}}>
                <Typography variant="authInputTitle" component="div">Verification Otp is sent to registered email
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{mt:4}}>
                <Grid xs={12} container sx={{gap:2}} className="justifyContentCenter">
                    <Grid item xs={2} md={1}>
                        <CustomInput type="text" maxLength={1} value={values.otp1} name="otp1" onKeyUp={onKeyUp} onChange={handleChange} onBlur={handleBlur} id={1}/>
                    </Grid>
                    <Grid item xs={2} md={1}>
                        <CustomInput type="text" maxLength={1} value={values.otp2} name="otp2" onKeyUp={onKeyUp} onChange={handleChange} onBlur={handleBlur} id={2}/>
                    </Grid>
                    <Grid item xs={2} md={1}>
                        <CustomInput type="text" maxLength={1} value={values.otp3} name="otp3" onKeyUp={onKeyUp} onChange={handleChange} onBlur={handleBlur} id={3}/>
                    </Grid>
                    <Grid item xs={2} md={1}>
                        <CustomInput type="text" maxLength={1} value={values.otp4} name="otp4" onKeyUp={onKeyUp} onChange={handleChange} onBlur={handleBlur} id={4}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className="justifyContentEnd">
                <button className='linkBlack' style={{border:"none",cursor:"pointer"}} onClick={resendVerificationOtp}>Resend OTP</button>
            </Grid>
            <Grid item xs={12} sx={{mt:4}}>
                <Button title="Verify" type="submit" width="100%" />
            </Grid>
        </Grid>
    </form>
  )
}

export default OtpVerificationForm