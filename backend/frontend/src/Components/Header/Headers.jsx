import React, { useEffect, useState } from 'react';
import {
    Toolbar,
    Box,
    AppBar,
    Typography,
    Grid,
    Avatar,
    IconButton,
    MenuItem,
    Menu,
    Drawer,
    Switch
} from '@mui/material';
import Button from '../Buttons/Button.jsx';
import { Link,useNavigate } from 'react-router-dom';
import NotificationMenu from '../Menu/NotificationMenu.jsx';
import {
    clearStorage, getUserProfile as getDefaultUserProfile,
    getUserProfile,
    setUserProfile,
    setUserProfile as setDefaultUserProfile
} from '../../Constants/storage.js';
import ProfileCard from '../Cards/ProfileCard.jsx';
import SearchMenu from '../Menu/SearchMenu.jsx'
import MenuIcon from "@mui/icons-material/Menu";
import UpgradeIcon from "../Svgs/UpgradeIcon";
import UnSubscribeIcon from "../Svgs/UnSubscribeIcon";
import ProfileIcon from "../Svgs/ProfileIcon";
import NotificationIcon from "../Svgs/NotificationIcon";
import PrivacyPolicyIcon from "../Svgs/PrivacyPolicyIcon";
import TermsAndConditionIcon from "../Svgs/TermsAndConditionIcon";
import ChangePasswordIcon from "../Svgs/ChangePasswordIcon";
import FeedbackIcon from "../Svgs/FeedbackIcon";
import DeleteAccountIcon from "../Svgs/DeleteAccountIcon";
import LogoutIcon from "../Svgs/LogoutIcon";
import AuthService from "../../Services/AuthService";
import CustomModel from "../Models/CustomModel";
import PaymentServices from "../../Services/PaymentServices";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../../../public/logo.svg"

export default function ButtonAppBar({headerType="landing",currentPage="home"}) {
    const debug = import.meta.env.VITE_DEBUG
    const base_url = import.meta.env.VITE_BASE_URL
    const navigator = useNavigate();

    const currentLoginUserProfile = getUserProfile();

    const buttonClick = ()=>{
        return navigator('/auth/login')
    }

    const [homeActive,setHomeActive] = useState(currentPage==="home"?true:false);
    const [messageActive,setMessageActive] = useState(currentPage==="message"?true:false);
    const [myHorseActive,setMyHorseActive] = useState(currentPage==="my-horse"?true:false);
    const [settingsActive,setSettingsActive] = useState(currentPage==="settings"?true:false);
    const [mobileView, setMobileView] = useState({mobileView: false,});
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const [style,setStyle] = useState({background: "#FFFFFF",borderRadius:"15px",boxShadow:"1px 1px 13px 1px grey"});
    const [openSubscribeModel,setOpenSubscribeModel] = useState(false);
    const [openDeleteAccountModel,setOpenDeleteAccountModel] = useState(false);
    const [openLogoutModel,setOpenLogoutModel] = useState(false);
    const [snackBarData,setSnackBarData] = useState({open:false,message:"",severity:"error"});

    const [subscriptionPlanId, setSubscriptionPlanId] = useState(null);

    useEffect(() => {
        const userProfile = getUserProfile();
        if (userProfile) {
            setSubscriptionPlanId(userProfile.subscription_plan);
        }
    }, []);

    const isAuthenticated = AuthService.checkUserAuthenticated();


    useEffect(() => {
        if (!isAuthenticated){
            navigator("/")
        }
    },[isAuthenticated,navigator])


    useEffect(()=>{
        const setResponsiveness = () => {
            return window.innerWidth < 900
              ? setMobileView(true)
              : setMobileView(false);
          }
          setResponsiveness();
            window.addEventListener("resize", () => setResponsiveness());

            return () => {
            window.removeEventListener("resize", () => setResponsiveness());
            }
    },[])

    const setActiveLink = (clickedButton)=>{
        if (clickedButton==="home"){
            setHomeActive(true)
            setMessageActive(false)
            setMyHorseActive(false)
            setSettingsActive(false)
            return navigator('/home')
        }
        if (clickedButton==="message"){
            setHomeActive(false)
            setMessageActive(true)
            setMyHorseActive(false)
            setSettingsActive(false)
            return navigator('/messages')
        }
        if (clickedButton==="my-horse"){
            setHomeActive(false)
            setMessageActive(false)
            setMyHorseActive(true)
            setSettingsActive(false)
            return navigator('/myhorse/favorites?page=1')
        }
        if (clickedButton==="settings"){
            setHomeActive(false)
            setMessageActive(false)
            setMyHorseActive(false)
            setSettingsActive(true)
            return navigator('/settings')
        }
    }

    const deleteUserAccount = async ()=>{
        try{
            await AuthService.deleteUser()
            clearStorage();
            return navigator('/')

        }catch(error){
            setSnackBarData({open:true,message:"Something went wrong",severity:"error"})
        }
    }

    const handleBurgerClick = (event) => {
        setIsBurgerOpen(!isBurgerOpen);
    };

    const handleBurgerClose = () => {
        setIsBurgerOpen(false);
    };

    const handleMenuItemClick = (clickedButton) => {
        setActiveLink(clickedButton);
        handleBurgerClose();
    };

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

    const ubsubscribeSubscriptionPlan = async ()=>{
        try{
            const response = await PaymentServices.unsubscribeSubscription();
            setOpenSubscribeModel(false)
            setUserProfile(response['data'])
            setSubscriptionPlanId(response['data']['subscription_plan'])
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
    
  return (
    <Grid container>
        <Grid item xs={12}>
            <Box sx={{ flexGrow: 1}}>
                <Grid item xs={12}>
                    <AppBar position="relative"
                        sx={{height:"101px",background: "rgba(0, 0, 0, 0.1)",backdropFilter:"blur(15px)",zIndex:10}}>
                        <Grid sx={{paddingLeft:`${mobileView ? '10px' : "100px"}`, paddingRight:`${mobileView ? '10px' : "100px"}`,
                            width: '100%' }} item xs={12}>
                            <Toolbar sx={{paddingLeft:`${mobileView ? '10px' : "100px"}`, paddingRight:`${mobileView ? '10px' : "100px"}`,
                                width: '100%' }}>
                                <Grid item lg={1} sx={{textAlign:"center", marginLeft: mobileView ? '32px' : '0'}}>
                                    <Link to="/" variant="logo">
                                    <img src={debug=="true"?logo:base_url+"static/logo.svg"} alt="logo"
                                        style={{height:"85px",width:"35.36px",marginTop:"7px"}} />
                                    </Link>
                                </Grid>
                                <Grid item xs={1} sx={{ml:2}}>
                                    <Typography variant="logo" component="div">
                                        <Link to="/" className='linkBlack'>ENBARR</Link>
                                    </Typography>
                                </Grid>
                                {
                                headerType === "landing"?
                                (
                                <>
                                    {!mobileView ? <Grid container item xs={8}>
                                        <Grid item xs={4}>
                                            <Link to='/aboutus' style={{textDecoration:"none"}}>
                                            <Typography variant="headerLinks" component="div">
                                                About us
                                            </Typography>
                                            </Link>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Link to='/faq' style={{textDecoration:"none"}}>
                                            <Typography variant="headerLinks" component="div">
                                                FAQ
                                            </Typography>
                                            </Link>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Link to='/contactus' style={{textDecoration:"none"}}>
                                            <Typography variant="headerLinks" component="div">
                                                Contact us
                                            </Typography>
                                            </Link>
                                        </Grid>
                                    </Grid>:""
                                    }
                                    <Grid item xs={mobileView?11:2} className="justifyContentEnd">
                                        <Button title="Sign up/Login" onClick={buttonClick} width={mobileView?"150px":"200px"}/>
                                    </Grid>
                                </>
                                ):( <>{!mobileView ? (
                                            <Grid container item xs={6} md={8} direction="row">
                                                <Grid item xs={3}>
                                                    <div className='flexColumn'>
                                                        <Typography variant="headerLinks" component="div" onClick={()=>
                                                        {setActiveLink("home")}}>
                                                            Home
                                                        </Typography>
                                                        {
                                                            homeActive?
                                                                <div className='linkBar' />:""
                                                        }
                                                    </div>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <div className='flexColumn'>
                                                        <Typography variant="headerLinks" component="div" onClick={()=>
                                                        {setActiveLink("message")}}>
                                                            Messages
                                                        </Typography>
                                                        {
                                                            messageActive?
                                                                <div className='linkBar' />:""
                                                        }
                                                    </div>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <div className='flexColumn'>
                                                        <Typography variant="headerLinks" component="div" onClick={()=>
                                                        {setActiveLink("my-horse")}}>
                                                            My Horses
                                                        </Typography>
                                                        {
                                                            myHorseActive?
                                                                <div className='linkBar' />:""
                                                        }
                                                    </div>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <div className='flexColumn'>
                                                        <Typography variant="headerLinks" component="div" onClick={()=>
                                                        {setActiveLink("settings")}}>
                                                            Settings
                                                        </Typography>
                                                        {
                                                            settingsActive?
                                                                <div className='linkBar' />:""
                                                        }
                                                    </div>
                                                </Grid>
                                            </Grid>

                                        ) : (<Grid sx={{position: 'absolute', left: '8px', top: "32px" }}>
                                            <IconButton
                                                edge="start"
                                                color="#000"
                                                aria-label="menu"
                                                onClick={handleBurgerClick}
                                            >
                                                <MenuIcon />
                                            </IconButton>
                                            <Drawer
                                                anchor="left"
                                                open={isBurgerOpen}
                                                onClose={handleBurgerClose}
                                                PaperProps={{ style: { width: '80%' } }}
                                            >
                                                <div>
                                                    <Grid container>
                                                        <Grid item lg={1} sx={{textAlign:"center", marginLeft: mobileView ? '32px' : '0'}}>
                                                            <Link to="/" variant="logo">
                                                                <img src={debug=="true"?logo:base_url+"static/logo.svg"} alt="logo"
                                                                     style={{height:"85px",width:"35.36px",marginTop:"7px"}} />
                                                            </Link>
                                                        </Grid>
                                                        <Grid item xs={3} sx={{ml:3, alignItems: 'center'}} className='justifyContentCenter'>
                                                            <Typography variant="logo" component="div">
                                                                <Link to="/" className='linkBlack'>ENBARR</Link>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={5} sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                                                            <CloseIcon onClick={handleBurgerClose} />
                                                        </Grid>
                                                    </Grid>
                                                    <MenuItem onClick={() => handleMenuItemClick("home")}>Home</MenuItem>
                                                    <MenuItem onClick={() => handleMenuItemClick("message")}>Messages</MenuItem>
                                                    <MenuItem onClick={() => handleMenuItemClick("my-horse")}>My Horses</MenuItem>
                                                    <MenuItem onClick={() => handleMenuItemClick("settings")}>Settings</MenuItem>
                                                    {mobileView && isAuthenticated && (
                                                        <Grid item lg={3} xs={12}
                                                              sx={{maxHeight:"auto",p:2,background: "#FFFFFF"}}>
                                                            <Grid container>

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
                                                                    <Grid container sx={{ mt: 2 }}>
                                                                        <Grid item xs={2} sx={{ height: "100%", textAlign: "center", paddingTop: "3px" }}>
                                                                            <Typography variant="headerLinks">
                                                                                <NotificationIcon />
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid item xs={10} className="justifyContentBetween">
                                                                            <Typography variant="headerLinks" onClick={(event) => event.preventDefault()}>
                                                                                Notifications
                                                                            </Typography>
                                                                            <Switch
                                                                                color="primary"
                                                                                onChange={(event) => redirect(event, "notification")}
                                                                                defaultChecked={getUserProfile ? getUserProfile.receive_notifications : false}
                                                                            />
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
                                                    )}
                                                </div>
                                            </Drawer>
                                        </Grid>)}
                                        <Grid item xs={9} md={2}>
                                            <Grid sx={{justifyContent: 'flex-end'}} container>
                                                <Grid item xs={4} className="justifyContentEndAlignCenter">
                                                    <SearchMenu mobile={mobileView}/>
                                                </Grid>
                                                <Grid item xs={2} lg={4} className="justifyContentEndAlignCenter">
                                                    <NotificationMenu mobile={mobileView}/>
                                                </Grid>
                                                <Grid item xs={3} lg={4} className="justifyContentEndAlignCenter">
                                                    <Link to='/settings/profile'>
                                                        <ProfileCard image={currentLoginUserProfile && currentLoginUserProfile.profile_photo?currentLoginUserProfile.profile_photo:""} height="50px" width='50px'/>
                                                    </Link>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </>
                                    )
                                }
                            </Toolbar>
                        </Grid>
                    </AppBar>
                </Grid>
            </Box>
            <CustomModel title="Unsubscribe" open={openSubscribeModel} setOpen={setOpenSubscribeModel} onClick={ubsubscribeSubscriptionPlan}/>
            <CustomModel title="Delete this Account" open={openDeleteAccountModel} setOpen={setOpenDeleteAccountModel} onClick={deleteUserAccount}/>
            <CustomModel title="Logout" open={openLogoutModel} setOpen={setOpenLogoutModel} onClick={()=>{
                clearStorage();
                return navigator('/')
            }}/>
        </Grid>
    </Grid>
  );
}