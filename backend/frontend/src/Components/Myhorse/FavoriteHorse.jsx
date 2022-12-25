import React from 'react'
import { Grid,Typography,Pagination } from '@mui/material'
import HorseCardList from '../Cards/HorseCardList'

const FavoriteHorse = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
          <Typography variant='authTitle'>Favorite</Typography>
      </Grid>
      <Grid item xs={12}>
        <HorseCardList numberOfCards={12}/>
      </Grid>
      <Grid item xs={12} className="justifyContentCenter" sx={{mt:5}}>
        <Pagination count={12} variant="outlined"  color="primary"/>
      </Grid>

    </Grid>
  )
}

export default FavoriteHorse