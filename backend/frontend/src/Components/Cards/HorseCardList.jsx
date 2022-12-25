import React from 'react'
import { Grid,Typography } from '@mui/material';
import HorseCard from './HorseCard'
import MyHorseCard from './MyHorseCard';
import DividerIcon from '../Svgs/DividerIcon';
import { useNavigate } from 'react-router-dom';

const HorseCardList = ({title,numberOfCards=1,typeCard="horse"}) => {
    const navigator = useNavigate();

    var divs = []
    const horseListClicked = (event,index)=>{
        return navigator(`/home/horse?id=${index}`)

    }

    const addDivs = ()=>{
    for (let index = 0; index < numberOfCards; index++) { 
    if (typeCard === "horse"){
        index> 2?divs.push(
            <Grid item lg={4} sm={6} xs={12} sx={{mt:4}}
                    className="justifyContentCenter" key={index} onClick={event => horseListClicked(event,index)}>
                    <HorseCard />
            </Grid>):divs.push(
            <Grid item lg={4} sm={6} xs={12}  sx={{mt:4}} className="justifyContentCenter" key={index} onClick={event => horseListClicked(event,index)}>
                <HorseCard />
            </Grid>)   
    }
    else{
        index> 2?divs.push(
            <Grid item lg={4} sm={6} xs={12} sx={{mt:4}}
                 key={index} >
                    <MyHorseCard />
            </Grid>):divs.push(
            <Grid item lg={4} sm={6} xs={12}  sx={{mt:4}} key={index}>
                <MyHorseCard />
        </Grid>) 
    }
        }
    }

    addDivs()

  return (
    <>
    <Grid container sx={{justifyContent:"center",display:"flex",alignItems:"center",pl:10,pr:10}}>
        {
            title?<Grid container item sx={{textAlign:"center",mb:4,mt:4}}>
            <Grid item xs={12}>
                <Typography variant='authTitle' sx={{fontSize:"25px"}}>
                    {title}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <DividerIcon />
            </Grid>
            </Grid>:""
        }
        {
            typeCard==="horse"?
            <Grid container item sx={{mt:4}}>
            {divs.map((object,i)=>{
                return object
            })}
            </Grid>:
            <Grid container>
                {divs.map((object,i)=>{
                return object
                })}
            </Grid>
        }
    </Grid>
    </>
  )
}

export default HorseCardList