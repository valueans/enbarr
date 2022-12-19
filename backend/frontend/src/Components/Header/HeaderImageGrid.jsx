import React from 'react';
import landingImage from '../../assets/landingImage.png';
import {Grid} from '@mui/material';

const HeaderImageGrid = ({height="86.5vh",top="-102px",xs=4}) => {
  return (
    <>
      <Grid item xs={xs} sx={{display:"flex",justifyContent:"center",height:height}}>
        <div
          style={{height:"80%",width: "100%",backdropFilter:"blur(2px)",background:"linear-gradient(180deg, rgba(49, 48, 51, 0.25) 0%, rgba(0, 0, 0, 0.25) 100%)",alignSelf:"center",position:"relative",left: "34px",zIndex:5}}>
        </div>
        <div
          style={{height:"95%",width: "100%",backdropFilter:"blur(7.5px)",background:"linear-gradient(180deg, rgba(49, 48, 51, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%)",alignSelf:"center",zIndex:7,position:"relative",left:"16px"}}>
        </div>
        <img src={landingImage} alt="landing-img" style={{height:"100vh",zIndex:8,position:"relative",top:top}} />
      </Grid>
    </>
  )
}

export default HeaderImageGrid