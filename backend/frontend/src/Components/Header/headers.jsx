import React, { useState } from 'react';
import {Toolbar,Box,AppBar,Typography,Grid,Avatar,Badge} from '@mui/material';

import Button from '../Buttons/Button.jsx';
import logo from '../../assets/logo.svg';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import profilePic from '../../assets/profile.png';
import { Link,useNavigate } from 'react-router-dom';


export default function ButtonAppBar({headerType="landing"}) {
    const navigate = useNavigate();

    const buttonClick = ()=>{
        return navigate('/auth')
    }

    const [homeActive,setHomeActive] = useState(true);
    const [messageActive,setMessageActive] = useState(false);
    const [myHorseActive,setMyHorseActive] = useState(false);
    const [settingsActive,setSettingsActive] = useState(false);


    const setActiveLink = (clickedButton)=>{
        if (clickedButton==="home"){
            setHomeActive(true)
            setMessageActive(false)
            setMyHorseActive(false)
            setSettingsActive(false)
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
        }
        if (clickedButton==="settings"){
            setHomeActive(false)
            setMessageActive(false)
            setMyHorseActive(false)
            setSettingsActive(true)
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
                                                <Typography variant="headerLinks" component="div" onClick={()=>{setActiveLink("home")}}>
                                                    Home
                                                </Typography>
                                                {
                                                    homeActive?
                                                    <div className='linkBar'/>:""
                                                }
                                            </div>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <div className='flexColumn'>
                                                <Typography variant="headerLinks" component="div" onClick={()=>{setActiveLink("message")}}>
                                                    Messages
                                                </Typography>
                                                {
                                                    messageActive?
                                                    <div className='linkBar' />:""
                                                }
                                            </div>
                                        </Grid>
                                        <Grid item xs={3} >
                                            <div className='flexColumn'>
                                                <Typography variant="headerLinks" component="div" onClick={()=>{setActiveLink("my-horse")}}>
                                                    My Horse
                                                </Typography>
                                                {
                                                    myHorseActive?
                                                    <div className='linkBar'/>:""
                                                }
                                            </div>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <div className='flexColumn'>
                                                <Typography variant="headerLinks" component="div" onClick={()=>{setActiveLink("settings")}}>
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
                                                <SearchIcon className="headerIcons"/>
                                            </Grid>
                                            <Grid item xs={4} className="justifyContentEndAlignCenter">
                                            <Badge badgeContent={4} color="warning">
                                                <NotificationsIcon className="headerIcons"/>
                                            </Badge>
                                            </Grid>
                                            <Grid item xs={4} className="justifyContentEndAlignCenter">
                                            <Avatar
                                                alt="Remy Sharp"
                                                src={profilePic}
                                                sx={{ width: "50px", height: "50px",marginTop:"7px"}}
                                                />
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