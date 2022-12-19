import React from 'react';
import {Toolbar,Box,AppBar,Typography,Grid} from '@mui/material';
import Button from '../Buttons/Button.jsx';
import logo from '../../assets/logo.svg';
import { Link,useNavigate } from 'react-router-dom';


export default function ButtonAppBar() {
    const navigate = useNavigate();

    const buttonClick = ()=>{
        return navigate('/auth')
    }

  return (
    <Grid container>
        <Grid item xs={12}>
            <Box sx={{ flexGrow: 1}}>
                <Grid item xs={12}>
                    <AppBar position="relative"
                        sx={{height:"101px",background: "rgba(0, 0, 0, 0.1)",backdropFilter:"blur(15px)",zIndex:10}}>
                        <Grid item xs={12}>
                            <Toolbar style={{paddingLeft:"100px",paddingRight:"100px",}}>
                                <Grid item lg={1} sx={{textAlign:"center"}}>
                                    <Link to="/" variant="logo" >
                                    <img src={logo} alt="logo" style={{height:"85px",width:"35.36px",marginTop:"7px"}} />
                                    </Link>
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography variant="logo" component="div">
                                        <Link to="/" style={{color:"#302F32",textDecoration:"none"}}>Enbarr</Link>
                                    </Typography>
                                </Grid>
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
                                <Grid item xs={4} sx={{display:"flex",justifyContent:"end"}}>
                                    <Button title="Sign up/Login" onClick={buttonClick}/>
                                </Grid>
                            </Toolbar>
                        </Grid>
                    </AppBar>
                </Grid>
            </Box>
        </Grid>
    </Grid>
  );
}