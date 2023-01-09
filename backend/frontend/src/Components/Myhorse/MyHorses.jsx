import React, { useEffect, useState } from 'react'
import { Grid,Typography } from '@mui/material'
import HorseCardList from '../Cards/HorseCardList'
import { useLocation } from 'react-router-dom';
import CustomPagination from '../Pagination/CustomPagination';
import HorseService from '../../Services/HorseService';

const MyHorses = () => {

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);

  const [totalHorseCount,setTotalHorseCount] = useState(0);
  const [myHorse,setMyHorse] = useState([]);

  const getFavouriteHorses = async ()=>{
    const response = await HorseService.getMyHorses(page);
    console.log("this is response",response)
    setTotalHorseCount(response.count)
    setMyHorse(response.results)
  }

  useEffect(()=>{
    getFavouriteHorses()
  },[page])

  return (
    <Grid container>
      <Grid item xs={12}>
          <Typography variant='authTitle'>My Horses</Typography>
      </Grid>
      <Grid item xs={12} sx={{minHeight:"200px"}}> 
        {totalHorseCount > 0?
          <HorseCardList adds={myHorse} typeCard="my-horse"/>:
          <Typography variant='h5' sx={{color:"red"}}>no data found....</Typography>
        }
      </Grid>
      <CustomPagination page={page} totalHorseCount={totalHorseCount} routeUrl="/myhorse/myhorse"/>

    </Grid>
  )
}

export default MyHorses