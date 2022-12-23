import React from 'react'
import { Grid,Typography } from '@mui/material'

const Footer = () => {
  return (
    // footer for login page and landing page starts 
    <Grid container item>
        <Grid item xs={6} sx={{display:"flex",justifyContent:"end"}}>
            <Typography variant='headerLinks'>
                Terms and Conditions
            </Typography>
        </Grid>
        <Grid item xs={6} sx={{display:"flex",justifyContent:"start",pl:6}}>
            <Typography variant='headerLinks'>
                Privacy Policy
            </Typography>
        </Grid>
        <Grid item xs={12} sx={{display:"flex",justifyContent:"center"}}>
            <Typography variant='headerLinks'>
                © 2022 Enbarr, Inc.
            </Typography>
        </Grid>
    </Grid>
    // footer for login page and landing page ends
  )
}

export default Footer