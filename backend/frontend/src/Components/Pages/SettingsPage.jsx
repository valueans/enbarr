import React, { useState,useEffect } from 'react';
import { Grid,Typography,Switch } from '@mui/material';
import Headers from '../Header/Headers';
import BlackFooter from '../Footer/BlackFooter';
import {Routes,Route } from 'react-router-dom';
import UpgradeIcon from '../Svgs/UpgradeIcon';
import UnSubscribeIcon from '../Svgs/UnSubscribeIcon';
import ProfileIcon from '../Svgs/ProfileIcon';
import NotificationIcon from '../Svgs/NotificationIcon';
import PrivacyPolicyIcon from '../Svgs/PrivacyPolicyIcon';
import TermsAndConditionIcon from '../Svgs/TermsAndConditionIcon';
import ChangePasswordIcon from '../Svgs/ChangePasswordIcon';
import FeedbackIcon from '../Svgs/FeedbackIcon';
import DeleteAccountIcon from '../Svgs/DeleteAccountIcon';
import LogoutIcon from '../Svgs/LogoutIcon';
import { useNavigate } from 'react-router-dom';
import CustomModel from '../Models/CustomModel';
import ProfilePage from '../Settings/ProfilePage';
import PrivacyPolicy from '../Settings/PrivacyPolicy';
import TermsAndCondition from '../Settings/TermsAndCondition';
import Feedback from '../Settings/Feedback';
import { clearStorage, setUserProfile } from '../../Constants/storage';
import AuthService from '../../Services/AuthService';
import CustomSnackBar from '../SnackBar/CustomSnackBar';
import { getUserProfile as getDefaultUserProfile,setUserProfile as setDefaultUserProfile } from '../../Constants/storage';
import ChangePassword from '../Settings/ChangePassword';
import StripePaymentForm from '../Forms/StripePaymentForm';
import PaymentServices from '../../Services/PaymentServices';

const SettingsPage = () => {
    const navigator = useNavigate();
    const [openSubscribeModel,setOpenSubscribeModel] = useState(false);
    const [openDeleteAccountModel,setOpenDeleteAccountModel] = useState(false);
    const [openLogoutModel,setOpenLogoutModel] = useState(false);
    const [snackBarData,setSnackBarData] = useState({open:false,message:"",severity:"error"});
    const getUserProfile = getDefaultUserProfile();

    const isAuthenticated = AuthService.checkUserAuthenticated();


    useEffect(() => {
        if (!isAuthenticated){
            navigator("/")
        }
    },[isAuthenticated,navigator])

    const [style,setStyle] = useState({background: "#FFFFFF",borderRadius:"15px",boxShadow:"1px 1px 13px 1px grey"});


    const deleteUserAccount = async ()=>{
        try{
            await AuthService.deleteUser()
            clearStorage();
            return navigator('/')

        }catch(error){
            setSnackBarData({open:true,message:"Something went wrong",severity:"error"})
            console.log(error)
        }
    }

    const upgradeSubscriptionPlan = async ()=>{
        try{
        
            const subscription_plans = await PaymentServices.getAllSubscriptionPlans();
            const response = await PaymentServices.upgradeSubscription(subscription_plans[0]?.id);
            setOpenSubscribeModel(false)
            setUserProfile(response['data'])
            setSnackBarData({open:true,message:"Your subscription plan is successfully updated",severity:"success"})
        }
        catch(error){
          if (error.response.data.message){
            setSnackBarData({open:true,message:error.response.data.message,severity:"error"})
          }
          else{
            setSnackBarData({open:true,message:"Something went wrong please try later..",severity:"error"})
          }
        }
      }

    const redirect = async (event,buttonName)=>{
        if (buttonName==="upgrade"){
            setStyle({background: "#FFFFFF",borderRadius:"15px",boxShadow:"1px 1px 13px 1px grey"});
            return navigator('/settings/upgrade')
        }
        else if (buttonName==="unsubscribed"){
            setOpenSubscribeModel(true)
        }
        else if (buttonName==="profile"){
            setStyle({background: "#FFFFFF",borderRadius:"15px",boxShadow:"1px 1px 13px 1px grey"});
            return navigator('/settings/profile')

        }
        else if (buttonName==="notification"){
            const response = await AuthService.updateNotificationStatus(event.target.checked)
            setDefaultUserProfile(response)
        }
        else if (buttonName==="privacy"){
            setStyle({});
            return navigator('/settings/privacypolicy')

        }
        else if (buttonName==="terms"){
            setStyle({});
            return navigator('/settings/terms&condition')
        }
        else if (buttonName==="changePassword"){
            setStyle({background: "#FFFFFF",borderRadius:"15px",boxShadow:"1px 1px 13px 1px grey"});
            return navigator('/settings/changepassword')
        }
        else if (buttonName==="feedback"){
            setStyle({background: "#FFFFFF",borderRadius:"15px",boxShadow:"1px 1px 13px 1px grey"});
            return navigator('/settings/feedback')
        }
        else if (buttonName==="delete-account"){
            setOpenDeleteAccountModel(true)
        }
        else if (buttonName==="logout"){
            setOpenLogoutModel(true)
        }
    }


  return (
    <>
        <CustomSnackBar snackBarData={snackBarData} setSnackBarData={setSnackBarData} />
        {/* header when the user will logged in starts */}
        <Headers headerType="home-page" currentPage='settings' />
        {/* header when the user will logged in ends */}

        {/* main container starts */}
        <Grid container sx={{p:4}} className="justifyContentBetween">
            {/* setting menu starts */}
            <Grid item lg={3} xs={12}
                sx={{minHeight:"100vh",maxHeight:"auto",p:4,background: "#FFFFFF",borderRadius:"15px",boxShadow:"1px 1px 13px 1px grey"}}>
                <Grid container>
                    {/* settings heading starts */}
                    <Grid item xs={12}>
                        <Typography variant="authTitle">Settings</Typography>
                    </Grid>

                    {/* settings heading ends */}

                    {/* settings bottom navigation starts */}
                    <Grid item xs={12}>
                        {/* upgrade button starts */}
                        <Grid container sx={{mt:2}}>
                            <Grid item xs={2} sx={{height:"100%",textAlign:"center",paddingTop:"3px"}}>
                                <Typography variant="headerLinks">
                                    <UpgradeIcon />
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="headerLinks" onClick={event => redirect(event,"upgrade")}>Upgrade</Typography>
                            </Grid>
                        </Grid>

                        {/* upgrade button ends */}

                        {/* Unsubscribe button starts */}
                        <Grid container sx={{mt:2}}>
                            <Grid item xs={2} sx={{height:"100%",textAlign:"center",paddingTop:"3px"}}>
                                <Typography variant="headerLinks">
                                    <UnSubscribeIcon />
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="headerLinks" onClick={event => redirect(event,"unsubscribed")}>Unsubscribe</Typography>
                            </Grid>
                        </Grid>

                        {/* Unsubscribe button ends */}

                        {/* Profile button starts */}
                        <Grid container sx={{mt:2}}>
                            <Grid item xs={2} sx={{height:"100%",textAlign:"center",paddingTop:"3px"}}>
                                <Typography variant="headerLinks">
                                    <ProfileIcon />
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="headerLinks" onClick={event => redirect(event,"profile")}>Profile</Typography>
                            </Grid>
                        </Grid>
                        {/* Profile button ends */}

                        {/* Notifications button starts */}
                        <Grid container sx={{mt:2}}>
                            <Grid item xs={2} sx={{height:"100%",textAlign:"center",paddingTop:"3px"}}>
                                <Typography variant="headerLinks">
                                    <NotificationIcon />
                                </Typography>
                            </Grid>
                            <Grid item xs={10} className="justifyContentBetween">
                                <Typography variant="headerLinks">Notifications</Typography>
                                <Switch color="primary" onChange={(event) => redirect(event,"notification")} defaultChecked={getUserProfile?getUserProfile.receive_notifications:false}/>
                            </Grid>
                        </Grid>
                        {/* Notifications button ends */}


                        {/* Privacy Policy button starts */}
                        <Grid container sx={{mt:2}}>
                            <Grid item xs={2} sx={{height:"100%",textAlign:"center",paddingTop:"3px"}}>
                                <Typography variant="headerLinks">
                                    <PrivacyPolicyIcon />
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="headerLinks" onClick={event => redirect(event,"privacy")}>Privacy Policy</Typography>
                            </Grid>
                        </Grid>

                        {/* Privacy Policy button ends */}



                        {/* Terms and Conditions button starts */}
                        <Grid container sx={{mt:2}}>
                            <Grid item xs={2} sx={{height:"100%",textAlign:"center",paddingTop:"3px"}}>
                                <Typography variant="headerLinks">
                                    <TermsAndConditionIcon />
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="headerLinks" onClick={event => redirect(event,"terms")}>Terms and Conditions</Typography>
                            </Grid>
                        </Grid>

                        {/* Terms and Conditions button ends */}

                        {/* Change Password button starts */}
                        <Grid container sx={{mt:2}}>
                            <Grid item xs={2} sx={{height:"100%",textAlign:"center",paddingTop:"3px"}}>
                                <Typography variant="headerLinks">
                                    <ChangePasswordIcon />
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="headerLinks" onClick={event => redirect(event,"changePassword")}>Change Password</Typography>
                            </Grid>
                        </Grid>

                        {/* Change Password button ends */}

                        {/* Feedback button starts */}
                        <Grid container sx={{mt:2}}>
                            <Grid item xs={2} sx={{height:"100%",textAlign:"center",paddingTop:"3px"}}>
                                <Typography variant="headerLinks">
                                    <FeedbackIcon />
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="headerLinks" onClick={event => redirect(event,"feedback")}>Feedback</Typography>
                            </Grid>
                        </Grid>
                        {/* Feedback button ends */}

                        {/* Delete account button starts */}
                        <Grid container sx={{mt:2}}>
                            <Grid item xs={2} sx={{height:"100%",textAlign:"center",paddingTop:"3px"}}>
                                <Typography variant="headerLinks">
                                    <DeleteAccountIcon />
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="headerLinks" onClick={event => redirect(event,"delete-account")}>Delete account</Typography>
                            </Grid>
                        </Grid>

                        {/* Delete account button ends */}

                        {/* Logout button starts */}
                        <Grid container sx={{mt:2}}>
                            <Grid item xs={2} sx={{height:"100%",textAlign:"center",paddingTop:"3px"}}>
                                <Typography variant="headerLinks">
                                    <LogoutIcon />
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="headerLinks" sx={{color:"#EA0000"}} onClick={event => redirect(event,"logout")}>Logout</Typography>
                            </Grid>
                        </Grid>
                        {/* Logout button ends */}

                    </Grid>
                    {/* settings bottom navigation ends */}
                </Grid>
            </Grid>
            {/* setting menu end*/}

            {/* menu button pages starts */}
            <Grid item xs={12} lg={8} sx={style}>
                <Routes>
                    <Route path='upgrade' element={<StripePaymentForm setSnackBarData={setSnackBarData}/>} />
                    <Route path='*' element={<StripePaymentForm setSnackBarData={setSnackBarData}/>} />
                    <Route path='profile' element={<ProfilePage setSnackBarData={setSnackBarData}/>} />
                    <Route path="privacypolicy" element={<PrivacyPolicy />}></Route>
                    <Route path="terms&condition" element={<TermsAndCondition />}></Route>
                    <Route path="changepassword" element={<ChangePassword setSnackBarData={setSnackBarData}/>}></Route>
                    <Route path="feedback" element={<Feedback setSnackBarData={setSnackBarData}/>}></Route>
                </Routes>
            </Grid>
            <CustomModel title="Unsubscribe" open={openSubscribeModel} setOpen={setOpenSubscribeModel} onClick={upgradeSubscriptionPlan}/>
            <CustomModel title="Delete this Account" open={openDeleteAccountModel} setOpen={setOpenDeleteAccountModel} onClick={deleteUserAccount}/>
            <CustomModel title="Logout" open={openLogoutModel} setOpen={setOpenLogoutModel} onClick={()=>{
                clearStorage();
                return navigator('/')
            }}/>
            {/* menu button pages ends */}
        </Grid>
        {/* main container ends */}

        {/* footer starts */}
        <BlackFooter />
        {/* footer ends */}
    </>
  )
}

export default SettingsPage