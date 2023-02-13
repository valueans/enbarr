import React from 'react'
import {Grid} from '@mui/material';
import GoogleStoreSocialIcon from '../Svgs/GoogleStoreSocialIcon';
import AppleStoreSocialIcon from '../Svgs/AppleStoreSocialIcon';
import { googlePlayLink,appleStoreLink } from '../../Constants/urls';

const StoreLinks = ({color="#313033",className}) => {
  return (
    <Grid container spacing={1} className={className}>
      <Grid item>
        <a href={appleStoreLink} target="_blank" rel="noopener noreferrer">
          <AppleStoreSocialIcon color={color} />
        </a>
      </Grid>
      <Grid item>
        <a href={googlePlayLink} target="_blank" rel="noopener noreferrer">
          <GoogleStoreSocialIcon color={color} />
        </a>
      </Grid>
    </Grid>
  )
}

export default StoreLinks