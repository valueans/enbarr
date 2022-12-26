import React from 'react';
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
import UpgradeSubscribtion from '../Settings/UpgradeSubscribtion';
import { useNavigate } from 'react-router-dom';


const SettingsPage = () => {
    const navigator = useNavigate();

    const redirect = (event,buttonName)=>{
        if (buttonName==="upgrade"){
            console.log("upgrade")
            return navigator('/settings/upgrade')
        }
        else if (buttonName==="unsubscribed"){
            console.log("unsubscribed")

        }
        else if (buttonName==="profile"){
            console.log("profile")

        }
        else if (buttonName==="notification"){
            console.log("notifications get",event.target.checked)
        }
        else if (buttonName==="privacy"){
            console.log("privacy")

        }
        else if (buttonName==="terms"){
            console.log("terms")
        }
        else if (buttonName==="changePassword"){
            console.log("change password")
        }
        else if (buttonName==="feedback"){
            console.log("feedback")
        }
        else if (buttonName==="delete-acount"){
            console.log("delete-account")
        }
        else if (buttonName==="logout"){
            console.log("logout")
        }

    }
  return (
    <>
        {/* header when the user will logged in starts */}
        <Headers headerType="home-page" currentPage='settings' />
        {/* header when the user will logged in ends */}

        {/* main container starts */}
        <Grid container sx={{p:4}} className="justifyContentBetween">
            {/* setting menu starts */}
            <Grid item xs={3}
                sx={{minHeight:"calc(100vh - 101px)",p:4,background: "#FFFFFF",borderRadius:"15px",boxShadow:"1px 1px 13px 1px grey"}}>
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
                                <Switch color="primary" onChange={event => redirect(event,"notification")}/>
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
            <Grid item xs={8} sx={{p:4,background: "#FFFFFF",borderRadius:"15px",boxShadow:"1px 1px 13px 1px grey"}}>
                <Routes>
                    <Route path='upgrade' element={<UpgradeSubscribtion />} />
                    <Route path='*' element={<UpgradeSubscribtion />} />
                </Routes>
            </Grid>
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