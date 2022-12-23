import React from 'react'
import { Grid,Typography } from '@mui/material'

const Footer = ({color="#313033"}) => {
  return (
    // footer for login page and landing page starts 
    <Grid container item>
        <Grid item xs={6} sx={{display:"flex",justifyContent:"end"}}>
            <Typography variant='headerLinks' sx={{color:color}}>
                Terms and Conditions
            </Typography>
        </Grid>
        <Grid item xs={6} sx={{display:"flex",justifyContent:"start",pl:6}}>
            <Typography variant='headerLinks' sx={{color:color}}>
                Privacy Policy
            </Typography>
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