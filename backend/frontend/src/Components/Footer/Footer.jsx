import React from 'react'
import { Grid,Typography } from '@mui/material'
import AuthService from '../../Services/AuthService';
import { Link } from 'react-router-dom';

const Footer = ({color="#313033"}) => {

    const isAuthenticated = AuthService.checkUserAuthenticated();
  return (
    // footer for login page and landing page starts 
    <Grid container item>
        <Grid item xs={6} sx={{display:"flex",justifyContent:"end"}}>
            <Typography variant='headerLinks' sx={{color:color}}>
                Terms and Conditions
            </Typography>
        </Grid>
        <Grid item xs={6} sx={{display:"flex",justifyContent:"start",pl:6}}>
            <Link to={isAuthenticated?"/home/privacypolicy":"/privacypolicy"} style={{color:color,textDecoration:"none"}}>
            <Typography variant='headerLinks' sx={{color:color,textDecoration:"none"}}>
                Privacy Policy
            </Typography>
            </Link>
        </Grid>
        <Grid item xs={12} sx={{display:"flex",justifyContent:"center"}}>
            <Typography variant='headerLinks' sx={{color:color}}>
                © 2022 Enbarr, Inc.
            </Typography>
        </Grid>
    </Grid>
    // footer for login page and landing page ends
  )
}

export default Footer