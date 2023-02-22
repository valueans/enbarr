import React from 'react'
import { Grid,Typography } from '@mui/material';
import Button from '../Buttons/Button';
import CustomInput from '../Inputs/CustomInput';
import { feedbackSchema } from '../../Schemas';
import { useFormik } from 'formik';
import FeedbackService from '../../Services/FeedbackService';

const LandingFeedback = ({setSnackBarData}) => {

    const style = {background: "#FFFFFF",borderRadius:"15px",boxShadow:"1px 1px 13px 1px grey"};

    const initialValues = {
        email: "",
        message: "",
    };

    const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
      useFormik({
        initialValues,
        validationSchema: feedbackSchema,
        validateOnChange: true,
        validateOnBlur: false,
        onSubmit: async (values, action) => {
        try {
            await FeedbackService.sendFeedback(values.email,values.message);
            action.resetForm();
            setSnackBarData({open:true,message:"Your feedback is Successfully submitted.We wil get back to you shortly..",severity:"success"})
        } catch (error) {
            console.log("error",error.response.data)
        }
        },
      });

  return (
    <form onSubmit={handleSubmit} style={{display:"flex",justifyContent:"center",alignItems:"center"}} id="root">
    <Grid container sx={{p:10,borderRadius:"15px",...style,height:"calc(100vh - 101px)"}} item lg={6} xs={12} style={{background:"#FFFFFF"}} className="justifyContentCenter">
        <Grid item xs={12}>
            <Typography variant="authTitle" component="div"> Support/ Send Feedback</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="authInputTitle" component="div">Email address</Typography>
            <CustomInput type="text" placeholder="email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur}/>
            {touched.email && errors.email ? (
                      <span className="form-error">{errors.email}</span>
            ) : null}
        </Grid>
        <Grid item xs={12}>
            <Typography variant="authInputTitle" component="div">Message</Typography>
            <CustomInput type="text" minRows={10} maxRows={40} multiline={true} maxLength={2000} placeholder="enter your message here..." name="message" value={values.message} onChange={handleChange} onBlur={handleBlur}/>
            {touched.message && errors.message ? (
                      <span className="form-error">{errors.message}</span>
            ) : null}
        </Grid>
        <Grid item xs={12}>
            <Button title="Submit" width="100%" type="submit"/>
        </Grid>
    </Grid>
    </form>
  )
}

export default LandingFeedback;