import React from 'react'
import { Grid,Typography } from '@mui/material';
import Button from '../Buttons/Button';
import CustomInput from '../Inputs/CustomInput';
import AuthService from '../../Services/AuthService';
import { useFormik } from "formik";
import { changePasswordSchema } from '../../Schemas';
import { setVerifyStatus } from '../../Constants/storage';

const ChangePasswordForm = ({setSnackBarData}) => {

    const initialValues = {
        password: "",
        confirm_password: "",
    };

    const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: changePasswordSchema,
      validateOnChange: true,
      validateOnBlur: false,
      onSubmit: async (values, action) => {
      try {
          await AuthService.changePassword(values.password,values.confirm_password);
          action.resetForm();
          setSnackBarData({open:true,message:"Password Successfully Changed",severity:"success"})
          setVerifyStatus(true)
      } catch (error) {
          console.log("error",error.response.data)
      }
      },
    });

    const styles = {
        confirmPassword: {
            padding: '80px',
            '@media (max-width: 600px)': {
                padding: '16px',
            }
        }
    }

  return (
    <form onSubmit={handleSubmit}>
    <Grid container spacing={5} sx={styles.confirmPassword}>
        <Grid item>
            <Typography variant="authTitle" component="div">Change password</Typography>
        </Grid>
        {/* <Grid item xs={12}>
            <Typography variant="authInputTitle" component="div">Current Password</Typography>
            <CustomInput type="text" />
        </Grid> */}
        <Grid item xs={12}>
            <Typography variant="authInputTitle" component="div">New Password</Typography>
            <CustomInput type="password" placeholder="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur}/>
            {touched.password && errors.password ? (
                      <span className="form-error">{errors.password}</span>
            ) : null}
        </Grid>
        <Grid item xs={12}>
            <Typography variant="authInputTitle" component="div">Confirm Password</Typography>
            <CustomInput type="password" placeholder="password" name="confirm_password" value={values.confirm_password} onChange={handleChange} onBlur={handleBlur} />
                {touched.confirm_password && errors.confirm_password ? (
                      <span className="form-error">{errors.confirm_password}</span>
                ) : null}
        </Grid>
        <Grid item xs={12}>
            <Button title="Change Password" width="100%" type="submit"/>
        </Grid>
    </Grid>
    </form>
  )
}

export default ChangePasswordForm