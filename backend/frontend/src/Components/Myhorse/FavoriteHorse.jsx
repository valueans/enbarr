import React, { useEffect,useState } from 'react'
import { Grid,Typography } from '@mui/material'
import HorseCardList from '../Cards/HorseCardList'
import HorseService from '../../Services/HorseService'
import { useLocation } from 'react-router-dom'
import CustomPagination from '../Pagination/CustomPagination'

const FavoriteHorse = () => {
  
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);


  const [totalHorseCount,setTotalHorseCount] = useState(0);
  const [favoriteHorse,setFavouriteHorses] = useState([]);


  const getFavouriteHorses = async ()=>{
    const response = await HorseService.getMyFavouriteHorses(page);
    setTotalHorseCount(response.count)
    setFavouriteHorses(response.results)
  }

  useEffect(()=>{
    getFavouriteHorses()
  },[page])

  return (
    <Grid container>
      <Grid item xs={12}>
          <Typography variant='authTitle'>Favorites</Typography>
      </Grid>
      <Grid item xs={12} sx={{minHeight:"200px"}}> 
        {totalHorseCount > 0?
          <HorseCardList adds={favoriteHorse} typeCard="favouriteHorses"/>:
          <Typography variant='h5' sx={{color:"#313033"}}>no data found....</Typography>
        }
      </Grid>
      <CustomPagination page={page} totalHorseCount={totalHorseCount} routeUrl="/myhorse/favorites"/>
    </Grid>
  )
}

export default FavoriteHorse