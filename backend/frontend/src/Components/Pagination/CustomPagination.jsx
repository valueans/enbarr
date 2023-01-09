import React from 'react'
import { Grid,Pagination } from '@mui/material';
import {  useNavigate } from 'react-router-dom';

const CustomPagination = ({page,totalHorseCount,routeUrl}) => {
    const navigator = useNavigate();

  return (
    <Grid item xs={12} className="justifyContentCenter" sx={{mt:5}}>
          <Pagination
          variant="outlined"  
          color="primary" 
          page={page}
          count={Math.ceil(totalHorseCount/12)}
          defaultPage={1}
          onChange = {(event,value)=>{
            return navigator(`${routeUrl}?page=${value}`)
          }}
        />
      </Grid>
  )
}

export default CustomPagination