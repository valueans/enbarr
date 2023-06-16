import React from 'react'
import { Grid,Typography } from '@mui/material';
import HorseCard from './HorseCard'
import MyHorseCard from './MyHorseCard';
import DividerIcon from '../Svgs/DividerIcon';
import { useNavigate } from 'react-router-dom';

const HorseCardList = ({title,adds,setAdds,typeCard="horse"}) => {
    const navigator = useNavigate();
    
    const horseListClicked = (event,index)=>{
        return navigator(`/home/horse?id=${index}`)

    }

  return (
    <>
    <Grid container sx={{justifyContent:"center",display:"flex",alignItems:"center",pl:10,pr:10}}>
        {
            title?<Grid container item sx={{textAlign:"center",mb:4,mt:2}}>
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
            <Grid container item sx={{mt:2}}>
            {
                adds.map((object,index)=>{
                    return (
                        index> 2?
                        <Grid item lg={4} sm={6} xs={12} sx={{mt:4}} className="justifyContentCenter" key={object.id} onClick={event => horseListClicked(event,object.id)}>
                            <HorseCard image={object.images} horse={object}/>
                        </Grid>:
                        <Grid item lg={4} sm={6} xs={12}  sx={{mt:4}} className="justifyContentCenter" key={object.id} onClick={event => horseListClicked(event,object.id)}>
                            <HorseCard image={object.images} horse={object}/>
                        </Grid>
                    )
                })
            }
            </Grid>:
            typeCard === "favouriteHorses"?
            <Grid container item sx={{mt:4}}>
            {
                adds.map(({id,horses,user},index)=>{
                    return (
                        index> 2?
                        <Grid item lg={4} sm={6} xs={12} sx={{mt:4}} className="justifyContentCenter" key={horses.id} onClick={event => horseListClicked(event,horses.id)}>
                            <HorseCard image={horses.images} horse={horses}/>
                        </Grid>:
                        <Grid item lg={4} sm={6} xs={12}  sx={{mt:4}} className="justifyContentCenter" key={horses.id} onClick={event => horseListClicked(event,horses.id)}>
                            <HorseCard image={horses.images} horse={horses}/>
                        </Grid>
                    )
                })
            }
            </Grid>:
            <Grid container>
                {
                adds.map((element,index)=>{
                    return (
                        index> 2?
                        <Grid item lg={4} sm={6} xs={12} key={element.id}>
                        <MyHorseCard image={element.images[0]} likes={element.likes} adds={adds} setAdds={setAdds} horseAddKey={element.id}/>
                        </Grid>:
                        <Grid item lg={4} sm={6} xs={12}  sx={{mt:4}} key={element.id}>
                            <MyHorseCard image={element.images[0]} likes={element.likes} adds={adds} setAdds={setAdds} horseAddKey={element.id}/>
                        </Grid>
                    )
                })
                }
            </Grid>
        }
    </Grid>
    </>
  )
}

export default HorseCardList