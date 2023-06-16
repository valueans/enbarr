import React from 'react'
import { Card, CardMedia,CardContent,Typography,CardActionArea,Grid,Box,Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import ProfileCard from '../Cards/ProfileCard';

const HorseCard = ({image,horse}) => {
  const [firstImage,setFistImage] = useState();

  useEffect(()=>{
    if (image?.length > 0){
      setFistImage(image[0])
    }
  },[])

  return (
    // <Card sx={{width:"340px",boxShadow:"0px 10px 10px rgba(0, 0, 0, 0.1)",borderRadius:"30px",cursor:"pointer",maxHeight:"400px"}}>
    //   <CardActionArea>
    //     <CardMedia
    //     component={firstImage?.file_type === 'IMAGE'?'img':'video'}
    //     image={firstImage?.file}
    //     alt="add-image"
    //     sx={{objectFit:"strech",borderRadius:"30px 30px 0px 0px"}}
    //     loop
    //     autoPlay
    //     muted={true}
    //   />
    //     <CardContent sx={{background: "rgba(27, 24, 25, 0.3)",backdropFilter: "blur(15px)",borderRadius:"0px 0px 30px 30px",position:"absolute",bottom:"35px",width:"100%"}}>
    //       <Grid container>
    //         <Grid item xs={2}>
    //             <ProfileCard image={horse.userprofile.profile_photo}/>
    //         </Grid>
    //         <Grid item xs={9} sx={{alignItems:"center",display:"flex"}}>
    //             <Box
    //               sx={{width: "100%",background: "rgba(0, 0, 0, 0.5)",borderRadius:"0px 12.5px 12.5px 0px",textAlign:"center"}}>
    //                 {
    //                   !horse.userprofile.first_name?
    //                   <Typography variant='horseDetailsUserName'>{horse.userprofile.user.email}</Typography>
    //                   :<Typography variant='horseDetailsUserName'>{horse.userprofile.first_name} {horse.userprofile.last_name}</Typography>
    //                 }
    //             </Box>
    //         </Grid>
    //         <Grid item xs={12} sx={{mt:2}}>
    //             <Typography variant='horseDetailsUserName' sx={{width:"100%"}}>{horse.title}</Typography>
    //         </Grid>
    //       </Grid>
    //     </CardContent>
    //   </CardActionArea>
    // </Card>
    <>
     <Stack sx={{height:"500px",width:"340px",boxShadow:"0px 10px 10px rgba(0, 0, 0, 0.1)",borderRadius:"30px",borderRadius:"30px"}}>
     <Card sx={{height:"354px",borderRadius:"30px 30px 0px 0px"}}>
        <CardMedia component={firstImage?.file_type === 'IMAGE'?'img':'video'} height="100%" image={firstImage?.file} alt="add-image" controls autoPlay loop sx={{objectFit:"contain",borderRadius:"30px 30px 0px 0px",width:"100%",height:"100%",borderRadius:"30px 30px 0px 0px"}} muted={true}/>
    </Card>
    <Box
        sx={{background: "rgba(27, 24, 25, 0.3)",backdropFilter: "blur(15px)",borderRadius: "0px 0px 30px 30px",height: "150px",padding:"10px"}}>
        <Grid container>
            <Grid item xs={2}>
                 <ProfileCard image={horse.userprofile.profile_photo}/>
             </Grid>
             <Grid item xs={9} sx={{alignItems:"center",display:"flex"}}>
                 <Box
                   sx={{width: "100%",background: "rgba(0, 0, 0, 0.5)",borderRadius:"0px 12.5px 12.5px 0px",textAlign:"center"}}>
                     {
                       !horse.userprofile.first_name?
                       <Typography variant='horseDetailsUserName'>{horse.userprofile.user.email}</Typography>
                       :<Typography variant='horseDetailsUserName'>{horse.userprofile.first_name} {horse.userprofile.last_name}</Typography>
                     }
                 </Box>
             </Grid>
             <Grid item xs={12} sx={{padding:"2px 5px 0px 5px"}}>
                <Typography variant='myHorseCardTitle'>{horse?.title}</Typography>
            </Grid>
        </Grid>
    </Box>
      </Stack>  
    </>
  )
}

export default HorseCard