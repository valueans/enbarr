import React from 'react'
import {Grid} from '@mui/material';
import GoogleStoreSocialIcon from '../Svgs/GoogleStoreSocialIcon';
import AppleStoreSocialIcon from '../Svgs/AppleStoreSocialIcon';

const StoreLinks = ({color="#313033",className}) => {
  return (
    <Grid container spacing={1} className={className}>
        <Grid item>
            <GoogleStoreSocialIcon color={color}/>
        </Grid>
        <Grid item>
            <AppleStoreSocialIcon color={color}/>
        </Grid>
    </Grid>
  )
}

export default StoreLinks