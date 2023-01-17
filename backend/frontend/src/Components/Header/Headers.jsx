import React, { useState } from 'react';
import {Toolbar,Box,AppBar,Typography,Grid,Avatar} from '@mui/material';
import Button from '../Buttons/Button.jsx';
import logo from '../../assets/logo.svg';
import SearchIcon from '@mui/icons-material/Search';
import { Link,useNavigate } from 'react-router-dom';
import NotificationMenu from '../Menu/NotificationMenu.jsx';
import { getUserProfile } from '../../Constants/storage.js';
import ProfileCard from '../Cards/ProfileCard.jsx';


export default function ButtonAppBar({headerType="landing",currentPage="home"}) {
    const navigator = useNavigate();

    const currentLoginUserProfile = getUserProfile();

    const buttonClick = ()=>{
        return navigator('/auth/login')
    }

    const [homeActive,setHomeActive] = useState(currentPage==="home"?true:false);
    const [messageActive,setMessageActive] = useState(currentPage==="message"?true:false);
    const [myHorseActive,setMyHorseActive] = useState(currentPage==="my-horse"?true:false);
    const [settingsActive,setSettingsActive] = useState(currentPage==="settings"?true:false);


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
    
  return (
    <Grid container>
        <Grid item xs={12}>
            <Box sx={{ flexGrow: 1}}>
                <Grid item xs={12}>
                    <AppBar position="relative"
                        sx={{height:"101px",background: "rgba(0, 0, 0, 0.1)",backdropFilter:"blur(15px)",zIndex:10}}>
                        <Grid item xs={12}>
                            <Toolbar style={{paddingLeft:"100px",paddingRight:"100px"}}>
                                <Grid item lg={1} sx={{textAlign:"center"}}>
                                    <Link to="/" variant="logo">
                                    <img src={logo} alt="logo"
                                        style={{height:"85px",width:"35.36px",marginTop:"7px"}} />
                                    </Link>
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography variant="logo" component="div">
                                        <Link to="/" className='linkBlack'>Enbarr</Link>
                                    </Typography>
                                </Grid>
                                {
                                headerType === "landing"?
                                (
                                <>
                                    <Grid container item xs={6} direction="row">
                                        <Grid item xs={4}>
                                            <Typography variant="headerLinks" component="div">
                                                Contact us
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography variant="headerLinks" component="div">
                                                FAQ
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography variant="headerLinks" component="div">
                                                About us
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={4} className="justifyContentEnd">
                                        <Button title="Sign up/Login" onClick={buttonClick} />
                                    </Grid>
                                </>
                                ):(<>
                                    <Grid container item xs={6} direction="row">
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
                                                    My Horse
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
                                                    settings
                                                </Typography>
                                                {
                                                settingsActive?
                                                <div className='linkBar' />:""
                                                }
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Grid container>
                                            <Grid item xs={4} className="justifyContentEndAlignCenter">
                                                <SearchIcon className="headerIcons" />
                                            </Grid>
                                            <Grid item xs={4} className="justifyContentEndAlignCenter">
                                                <NotificationMenu />
                                            </Grid>
                                            <Grid item xs={4} className="justifyContentEndAlignCenter">
                                                <ProfileCard image={currentLoginUserProfile && currentLoginUserProfile.profile_photo?currentLoginUserProfile.profile_photo:""} height="50px" width='50px'/>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </>)
                                }
                            </Toolbar>
                        </Grid>
                    </AppBar>
                </Grid>
            </Box>
        </Grid>
    </Grid>
  );
}