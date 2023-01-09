import React from 'react'
import Carosel from '../Carosel/Carosel'
import { Grid,Typography,Box,IconButton } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import profile from '../../assets/profile.png'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LongHorizontalLineIcon from '../Svgs/LongHorizontalLineIcon'

const HorseDetailContent = () => {
const [searchParam] =useSearchParams();
const id = searchParam.get('id')

return (
<Grid container sx={{minHeight:"calc(100vh - 101px)"}} className="justifyContentCenter">
  <Grid item xs={12} lg={6} sx={{background:"#FFFFFF",borderRadius:"15px",marginTop:"39px"}}>
    {/* main container starts */}
    <Grid container>
      {/* carosel starts */}
      <Grid item xs={12} sx={{height:"500px"}}>
        <Carosel />
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
                <img src={profile} alt="profile" />
              </Grid>
              <Grid item xs={4} lg={3} sx={{display:"flex",alignItems:"center",zIndex:4}}>
                <Box
                  sx={{width: "100%",background: "rgba(0, 0, 0, 0.5)",borderRadius:"0px 12.5px 12.5px 0px",textAlign:"center"}}>
                  <Typography variant='horseDetailsUserName'>Mark Dan</Typography>
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
                <IconButton sx={{background:"#FFFFFF",width:"60px",height:"60px",boxShadow:"1px 1px 15px 1px grey"}}>
                  <MailOutlineIcon sx={{height:"100%"}} />
                </IconButton>
              </Grid>
              <Grid item xs={3}>
                <IconButton sx={{background:"#FFFFFF",width:"60px",height:"60px",boxShadow:"1px 1px 15px 1px grey"}}>
                  <FavoriteBorderIcon sx={{height:"100%"}} />
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
          <Typography variant="authTitle">Roheryn</Typography>
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
          <Typography variant='imageDescriptions'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Adipiscing feugiat arcu, at vivamus tristique tristique cursus nec. Ipsum, auctor porttitor massa
            pellentesque varius donec placerat massa ac. Mattis purus sit urna sollicitudin posuere cursus amet,
            ultricies. In pharetra at vitae in aenean fames ullamcorper egestas. Tempus id duis neque, eget aliquet
            venenatis metus placerat tortor. Ac aliquam est nisi adipiscing molestie sed sagittis. Tellus tincidunt
            mi nulla molestie leo risus faucibus integer. Eget odio aliquam non id sed id quis natoque. Habitasse
            morbi convallis metus, non amet nunc arcu sed. Nec eleifend gravida non hendrerit nulla. Morbi volutpat
            arcu egestas ultricies tristique elit pellentesque pellentesque.</Typography>
        </Grid>

        {/* horse description ends */}

        {/* characteristics starts */}
        <Grid item xs={12} sx={{mt:4}}>
          <Grid container>
            <Grid item xs={12} lg={2}>
              <Typography variant="authInputTitle" sx={{color:"#313033"}}>Characteristics</Typography>
            </Grid>
            <Grid item xs={12} lg={10}>
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
            <Typography variant="characteristicsHeading">In porttitor.</Typography>
          </Grid>
        </Grid>

        {/* breed ends */}


        {/* gender starts */}

        <Grid item xs={6} sx={{mt:3}}>
          <Grid item xs={12}>
            <Typography variant="imageDescriptions">Gender</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="characteristicsHeading">Mare</Typography>
          </Grid>
        </Grid>

        {/* gender ends */}



        {/* Height starts */}

        <Grid item xs={6} sx={{mt:3}}>
          <Grid item xs={12}>
            <Typography variant="imageDescriptions">Height</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="characteristicsHeading">6 ft</Typography>
          </Grid>
        </Grid>

        {/* Height ends */}


        {/* Temperament starts */}
        <Grid item xs={6} sx={{mt:3}}>
          <Grid item xs={12}>
            <Typography variant="imageDescriptions">Temperament</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="characteristicsHeading">In porttitor.</Typography>
          </Grid>
        </Grid>

        {/* Temperament ends */}

        {/* Discipline starts */}

        <Grid item xs={6} sx={{mt:3}}>
          <Grid item xs={12}>
            <Typography variant="imageDescriptions">Discipline</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="characteristicsHeading">In porttitor.</Typography>
          </Grid>
        </Grid>

        {/* Discipline ends */}

        {/* price starts */}

        <Grid item xs={6} sx={{mt:3}}>
          <Grid item xs={12}>
            <Typography variant="imageDescriptions">Price</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="characteristicsHeading">$4500</Typography>
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