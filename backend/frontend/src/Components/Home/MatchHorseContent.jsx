import React, { useState } from 'react'
import { Grid,Typography,IconButton} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import Button from '../Buttons/Button';
import CustomSwiper from '../Carosel/CustomSwiper';
import HorseService from '../../Services/HorseService';
import { Link } from 'react-router-dom';


const MatchHorseContent = () => {
  const [currentHorseId,setCurrentHorseId] = useState(null);
  const [isLiked,setIsLiked] = useState(false);
  const [isDisLiked,setIsDisLiked] = useState(false);
  
  const handleLike = async ()=>{
    await HorseService.likeHorse(currentHorseId)
    setIsLiked(true)
    setIsDisLiked(false)
  }
  const handleDisLike = async ()=>{
    await HorseService.dislikeHorse(currentHorseId)
    setIsLiked(false)
    setIsDisLiked(true)
  }


  return (
    <Grid container sx={{minHeight:"calc(100vh - 101px)"}} className="justifyContentCenter alignContentCenter">
      <Grid item xs={12} lg={6} sx={{background:"#FFFFFF",borderRadius:"15px",marginTop:"39px",padding:"65px",minHeight:"600px"}}>
      <Grid container>
        <Grid item xs={12} className="justifyContentCenter">
          <Typography variant='matchHorseTitle'>ENBARR</Typography>
        </Grid>
        <Grid item xs={12} sx={{mt:3}}>
          <CustomSwiper currentHorseId={currentHorseId} setCurrentHorseId={setCurrentHorseId} setIsLiked={setIsLiked} setIsDisLiked={setIsDisLiked}/>
        </Grid>
        <Grid item xs={12} className="justifyContentCenter" sx={{mt:3}}>
          <Grid container item xs={12} className="justifyContentBetween">
          <Grid item xs={4} sx={{textAlign:"center"}}>
              <IconButton sx={{border:"1px solid transparent",background: "#F4F3F2",p:2}} onClick={handleDisLike}>
                <ThumbDownIcon sx={{color:`${isDisLiked?"#EA0000":"black"}`,height:"50px",width:"50px"}}/>
              </IconButton>    
            </Grid>
            <Grid item xs={4} sx={{textAlign:"center"}}>
                <KeyboardDoubleArrowUpIcon sx={{height:"50px",width:"50px"}}/>
                <Typography>Click to view details</Typography>
            </Grid>
            <Grid item xs={4} sx={{textAlign:"center"}}>
                <IconButton sx={{border:"1px solid transparent",background: "#F4F3F2",p:2}} onClick={handleLike}>
                  <ThumbUpIcon sx={{color:`${isLiked?"#00B027":"black"}`,height:"50px",width:"50px"}}/>
                </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12} className="justifyContentCenter" sx={{mt:3}}>
          <Link to='/' style={{width:"50%",textDecoration:"none"}}>
            <Button title="close" width="100%"/>
          </Link>
        </Grid>
      </Grid>
      </Grid>
    </Grid>
  )
}

export default MatchHorseContent