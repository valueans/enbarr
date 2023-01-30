import React, { useEffect, useState } from 'react'
import Carosel from '../Carosel/Carosel'
import { Grid,Typography,Box,IconButton } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LongHorizontalLineIcon from '../Svgs/LongHorizontalLineIcon'
import HorseService from '../../Services/HorseService'
import ProfileCard from '../Cards/ProfileCard';
import { getUserProfile } from '../../Constants/storage';
import ChatService from '../../Services/ChatService';

const HorseDetailContent = () => {
const [searchParam] =useSearchParams();
const navigator = useNavigate(); 
const [horseDetails,setHorseDetails] = useState({title:"",description:"",gender:"",height:"",price:"",userprofile:{first_name:"",last_name:"",profile_photo:"",user:{id:""}},breed:{breed:""},temperament:{temperament:""},discipline:{discipline:""}})
const currentLoginUserProfile = getUserProfile();

const id = searchParam.get('id')

const handleFavClick = async ()=>{
  if (horseDetails.isfav === false){
    const response = await HorseService.addHorseToFav(horseDetails.id)
    setHorseDetails({...horseDetails,isfav:true})
  }
  else{
    const response = await HorseService.deleteHorseFromFav(horseDetails.id)
    setHorseDetails({...horseDetails,isfav:false})
  }

}

useEffect(()=>{
  const getHorseDetails = async ()=>{
    const response = await HorseService.getHorseDetails(id);
    setHorseDetails(response)
  }
  getHorseDetails()
  window.scrollTo(0, 0);
},[])


const messageOwner = async ()=>{
    const response = await ChatService.generateConversations(horseDetails.userprofile.user.id)
    return navigator('/messages')
}

return (
<Grid container sx={{minHeight:"calc(100vh - 101px)"}} className="justifyContentCenter">
  <Grid item xs={12} lg={6} sx={{background:"#FFFFFF",borderRadius:"15px",marginTop:"39px"}}>
    {/* main container starts */}
    <Grid container>
      {/* carosel starts */}
      <Grid item xs={12} sx={{height:"500px"}}>
        <Carosel images={horseDetails.images}/>
      </Grid>
      {/* carosel ends */}

      {/* user information and buttons starts */}
      <Grid item xs={12}
        sx={{height: "103px",background: "rgba(27, 24, 25, 0.3)",backdropFilter: "blur(15px)",zIndex:6}}>
        <Grid container>
          {/* profile picture and uploader name starts */}
          <Grid item xs={12} lg={6} sx={{height:"103px"}}>
            <Grid container sx={{display:"flex",alignItems:"center",height:"103px"}}>
              <Grid item xs={3} lg={2} sx={{display:"flex",alignItems:"center",zIndex:7}}>
                <ProfileCard image={horseDetails.userprofile.profile_photo}/>
              </Grid>
              <Grid item xs={4} lg={3} sx={{display:"flex",alignItems:"center",zIndex:4}}>
                <Box
                  sx={{width: "100%",background: "rgba(0, 0, 0, 0.5)",borderRadius:"0px 12.5px 12.5px 0px",textAlign:"center"}}>
                  <Typography variant='horseDetailsUserName'>{horseDetails.userprofile.first_name} {horseDetails.userprofile.last_name}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          {/* profile picture and uploader name ends */}

          {/* message and like button starts */}
          <Grid item xs={12} lg={6} sx={{height:"103px"}}>
            <Grid container
              sx={{display:"flex",alignItems:"end",height:"103px",position:"relative",top:"20px",right:"10px",justifyContent:"flex-end"}}>
              <Grid item xs={3}>
                <IconButton sx={{background:"#FFFFFF",width:"60px",height:"60px",boxShadow:"1px 1px 15px 1px grey"}} disabled={currentLoginUserProfile.id === horseDetails.userprofile.id} onClick={messageOwner}>
                  <MailOutlineIcon sx={{height:"100%"}} />
                </IconButton>
              </Grid>
              <Grid item xs={3}>
                <IconButton sx={{background:"#FFFFFF",width:"60px",height:"60px",boxShadow:"1px 1px 15px 1px grey"}} color={horseDetails.isfav?"error":"primary"} onClick={handleFavClick} disabled={currentLoginUserProfile.id === horseDetails.userprofile.id}>
                  <FavoriteIcon sx={{height:"100%"}} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          {/* message and like button ends */}

        </Grid>
      </Grid>
      {/* user information and buttons ends */}
      <Grid container sx={{p:10}}>
        {/* horse title starts */}
        <Grid item xs={12}>
          <Typography variant="authTitle">{horseDetails.title}</Typography>
        </Grid>
        {/* horse title ends */}

        {/* horse location starts */}
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={1}>
              <LocationOnIcon sx={{color:"#EA0000"}} />
            </Grid>
            <Grid item xs={2}>
              <Typography variant="imageDescriptions">4.5 km</Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* horse location ends */}


        {/* horse description starts */}

        <Grid item xs={12} sx={{mt:4}}>
          <Typography variant='imageDescriptions'>{horseDetails.description}</Typography>
        </Grid>

        {/* horse description ends */}

        {/* characteristics starts */}
        <Grid item xs={12} sx={{mt:4}}>
          <Grid container>
            <Grid item xs={12} lg={3}>
              <Typography variant="authInputTitle" sx={{color:"#313033"}}>Characteristics</Typography>
            </Grid>
            <Grid item xs={12} lg={9}>
              <LongHorizontalLineIcon />
            </Grid>
          </Grid>
        </Grid>

        {/* characteristics ends */}


        {/* breed starts */}

        <Grid item xs={6} sx={{mt:3}}>
          <Grid item xs={12}>
            <Typography variant="imageDescriptions">Breed</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="characteristicsHeading">{horseDetails.breed.breed}</Typography>
          </Grid>
        </Grid>

        {/* breed ends */}


        {/* gender starts */}

        <Grid item xs={6} sx={{mt:3}}>
          <Grid item xs={12}>
            <Typography variant="imageDescriptions">Gender</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="characteristicsHeading">{horseDetails.gender}</Typography>
          </Grid>
        </Grid>

        {/* gender ends */}



        {/* Height starts */}

        <Grid item xs={6} sx={{mt:3}}>
          <Grid item xs={12}>
            <Typography variant="imageDescriptions">Height</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="characteristicsHeading">{horseDetails.height}</Typography>
          </Grid>
        </Grid>

        {/* Height ends */}


        {/* Temperament starts */}
        <Grid item xs={6} sx={{mt:3}}>
          <Grid item xs={12}>
            <Typography variant="imageDescriptions">Temperament</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="characteristicsHeading">{horseDetails.temperament.temperament}</Typography>
          </Grid>
        </Grid>

        {/* Temperament ends */}

        {/* Discipline starts */}

        <Grid item xs={6} sx={{mt:3}}>
          <Grid item xs={12}>
            <Typography variant="imageDescriptions">Discipline</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="characteristicsHeading">{horseDetails.discipline.discipline}</Typography>
          </Grid>
        </Grid>

        {/* Discipline ends */}

        {/* price starts */}

        <Grid item xs={6} sx={{mt:3}}>
          <Grid item xs={12}>
            <Typography variant="imageDescriptions">Price</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="characteristicsHeading">${horseDetails.price}</Typography>
          </Grid>
        </Grid>

        {/* price ends */}

      </Grid>
    </Grid>
    {/* main container ends */}
  </Grid>
</Grid>
)
}

export default HorseDetailContent