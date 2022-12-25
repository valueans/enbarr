import React from 'react'
import { Card,Box,Typography,Grid } from '@mui/material';
import horse from '../../assets/horse.png'
import Button from '../Buttons/Button';
import { useNavigate } from 'react-router-dom';

const MyHorseCard = () => {
const navigator = useNavigate();

const detailsClicked = (event,index)=>{
    return navigator(`/home/horse?id=${index}`)

}
  return (
    <>
    <Card sx={{backgroundImage:`url(${horse})`,objectFit:"fit",height:"500px",width:"340px",backgroundRepeat:"no-repeat",boxShadow:"0px 10px 10px rgba(0, 0, 0, 0.1)",borderRadius:"30px"}}>
        
    </Card>
    <Box sx={{width:"340px",background: "rgba(27, 24, 25, 0.3)",backdropFilter: "blur(15px)",borderRadius: "0px 0px 30px 30px",height: "146px",position:"relative",top:'-146px'}}>
        <Grid container>
            <Grid item xs={12} sx={{padding:"2px 5px 0px 5px"}}>
                <Typography variant='myHorseCardTitle'>Roheryn</Typography>
            </Grid>
            <Grid item xs={12} sx={{height:"54px",overflow:"hidden",padding:"2px 5px 0px 5px"}}>
                <Typography variant='imageDescriptions' color="#FFFFFF">Lorem ipsum dolor sit amet,Odit et qui sint saepe sint vel suscipit. Id iure voluptas ad. Perspiciatis voluptatibus neque qui.</Typography>
            </Grid>
            <Grid item xs={4} sx={{position:"relative",left:"40px"}}>
                <Button backgroundColor='#800020' title="Remove Add" color='#FFFFFF' borderRadius='30px 0px' width="100%"/>
            </Grid>
            <Grid item xs={4} sx={{position:"relative",left:"25px"}}>
            <Button backgroundColor='#FFFFFF' title="Edit" color='black' borderRadius='30px 0px' width="100%"/>
            </Grid>
            <Grid item xs={4}>
            <Button backgroundColor='#313033' title="Details" borderRadius='30px 0px' width="100%" onClick={detailsClicked}/>
            </Grid>
        </Grid>
    </Box>
    </>
    
  )
}

export default MyHorseCard