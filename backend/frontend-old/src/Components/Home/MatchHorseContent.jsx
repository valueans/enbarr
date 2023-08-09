import React, { useEffect,useState,useRef } from 'react'
import { Grid,Typography,IconButton} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import Button from '../Buttons/Button';
import CustomSwiper from '../Carosel/CustomSwiper';
import HorseService from '../../Services/HorseService';
import { Link, useNavigate } from 'react-router-dom';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import AuthService from '../../Services/AuthService';
import GoogleMapsCluster from '../Maps/GoogleMapsCluster';
import AuthenticationTabs from '../Buttons/AuthenticationTabs';
import { useSelector } from 'react-redux';

const MatchHorseContent = () => {

  const navigator = useNavigate();
  const state = useSelector(state=>state);
  const [allHorseLatLng,setAllHorseLatLng] = useState([]);
  const [currentHorseId,setCurrentHorseId] = useState(null);
  const [isLiked,setIsLiked] = useState(false);
  const [isDisLiked,setIsDisLiked] = useState(false);
  const [matchTab,setMatchTab] = useState(true);
  const [mapTab,setMapTab] = useState(false);

  const swiperRef = useRef();
  
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

  const handleMatch = () =>{
    setMatchTab(true)
    setMapTab(false)
  }
  const handleMap = () =>{
    setMatchTab(false)
    setMapTab(true)
  }

  const isAuthenticated = AuthService.checkUserAuthenticated();

  useEffect(() => {
    if (!isAuthenticated){
      navigator("/")   
    }
    const getallHorsesLatLng = async ()=>{
      const response = await HorseService.getAllHorsesLatLng();
      setAllHorseLatLng(response)
    }
    getallHorsesLatLng()
  },[isAuthenticated,navigator])


  return (
    <Grid container sx={{minHeight:"calc(100vh - 101px)",border:"1px solid black"}} className="justifyContentCenter alignContentCenter" id="root">
      <Grid item xs={12} lg={6} sx={{background:"#FFFFFF",borderRadius:"15px",marginTop:"39px",padding:"65px",minHeight:"600px"}}>
      <Grid container>
        <Grid item xs={12} className="justifyContentCenter">
          <Typography variant='matchHorseTitle'>ENBARR</Typography>
        </Grid>
        <Grid item xs={6}>
              <AuthenticationTabs title="Match" isActive={matchTab} onClick={handleMatch}
                  borderRadius="50px 50px 50px 50px" />
          </Grid>
          <Grid item xs={6}>
              <AuthenticationTabs title="See on Maps" isActive={mapTab} onClick={handleMap}
                  borderRadius="50px 50px 50px 50px" />
          </Grid>
        {
          matchTab?<><Grid item xs={12} sx={{mt:6}}>
          <Grid container direction="row">
            <Grid item xs={1} className="justifyContenCenterAlignCenter">
              <KeyboardDoubleArrowLeftIcon sx={{height:"60px",width:"60px",cursor:"pointer"}} onClick={() => swiperRef.current?.slidePrev()}/>
            </Grid>
            <Grid item xs={10} >  
              <CustomSwiper currentHorseId={currentHorseId} setCurrentHorseId={setCurrentHorseId} setIsLiked={setIsLiked} setIsDisLiked={setIsDisLiked} swiperRef={swiperRef}/>
            </Grid>
            <Grid item xs={1} className="justifyContenCenterAlignCenter">
              <KeyboardDoubleArrowRightIcon sx={{height:"60px",width:"60px",cursor:"pointer"}} onClick={() => swiperRef.current?.slideNext()}/>
            </Grid>
          </Grid>
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
        </Grid></>:<Grid item xs={12} sx={{mt:3}}>
              <GoogleMapsCluster lat={state.BuyerSearchLocation.lat} lng={state.BuyerSearchLocation.lng} allHorseLatLng={allHorseLatLng}/>
          </Grid>
        }
      </Grid>
      </Grid>
    </Grid>
  )
}

export default MatchHorseContent