import React from 'react'
import { Card,Box,Typography,Grid,CardMedia } from '@mui/material';
import Button from '../Buttons/Button';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';

const MyHorseCard = ({image,horseAddKey,likes=0}) => {
const navigator = useNavigate();

const detailsClicked = ()=>{
    return navigator(`/home/horse?id=${horseAddKey}`)

}
  return (
    <>
    <Card sx={{height:"500px",width:"340px",boxShadow:"0px 10px 10px rgba(0, 0, 0, 0.1)",borderRadius:"30px"}}>
        <CardMedia component="img" height="100%" image={image} alt="add-image" />
    </Card>
    <Grid container>
        <Grid item xs={10} sx={{position:"relative",top:"-126px",zIndex:8}} className="justifyContentEnd">
            <Box sx={{width: "88px",height: "50px",background: "#FFFFFF",borderRadius:"15px"}} className='justifyContenCenterAlignCenter'>
                <Typography variant='authInputTitle'>
                    <FavoriteIcon />
                </Typography>
                <Typography variant='authInputTitle'>{likes}</Typography>
            </Box>
        </Grid>
    </Grid>

    <Box
        sx={{width:"340px",background: "rgba(27, 24, 25, 0.3)",backdropFilter: "blur(15px)",borderRadius: "0px 0px 30px 30px",height: "146px",position:"relative",top:'-146px'}}>
        <Grid container>
            <Grid item xs={12} sx={{padding:"2px 5px 0px 5px"}}>
                <Typography variant='myHorseCardTitle'>Roheryn</Typography>
            </Grid>
            <Grid item xs={12} sx={{height:"54px",overflow:"hidden",padding:"2px 5px 0px 5px"}}>
                <Typography variant='imageDescriptions' color="#FFFFFF">Lorem ipsum dolor sit amet,Odit et qui sint
                    saepe sint vel suscipit. Id iure voluptas ad. Perspiciatis voluptatibus neque qui.</Typography>
            </Grid>
            <Grid item xs={4} sx={{position:"relative",left:"40px"}}>
                <Button backgroundColor='#800020' title="Remove Add" color='#FFFFFF' borderRadius='30px 0px'
                    width="100%" />
            </Grid>
            <Grid item xs={4} sx={{position:"relative",left:"25px"}}>
                <Button backgroundColor='#FFFFFF' title="Edit" color='black' borderRadius='30px 0px' width="100%" />
            </Grid>
            <Grid item xs={4}>
                <Button backgroundColor='#313033' title="Details" borderRadius='30px 0px' width="100%"
                    onClick={detailsClicked} />
            </Grid>
        </Grid>
    </Box>
    </>
    
  )
}

export default MyHorseCard