import React from 'react'
import { Grid,Typography } from '@mui/material';
import HorseCard from './HorseCard'
import DividerIcon from '../Svgs/DividerIcon';

const HorseCardList = ({title,numberOfCards=1}) => {

    var divs = []

    const addDivs = ()=>{
        for (let index = 0; index < numberOfCards; index++) {
            index > 2?divs.push(<Grid lg={4} sm={6} xs={12} sx={{mt:4}} className="justifyContentCenter" key={index}><HorseCard /></Grid>):divs.push(<Grid lg={4} sm={6} xs={12} className="justifyContentCenter" key={index}><HorseCard /></Grid>)  
        }
    }

    addDivs()

  return (
    <>
    <Grid container sx={{justifyContent:"center",display:"flex",alignItems:"center",pl:10,pr:10}}>
        <Grid container item sx={{textAlign:"center",mb:4,mt:4}}>
            <Grid xs={12}>
                <Typography variant='authTitle' sx={{fontSize:"25px"}}>
                    {title}
                </Typography>
            </Grid>
            <Grid xs={12}>
                <DividerIcon />
            </Grid>
        </Grid>
        <Grid container item sx={{mt:4}}>
        {divs.map((object,i)=>{
            return object
        })}
        </Grid>
    </Grid>
    </>
  )
}

export default HorseCardList