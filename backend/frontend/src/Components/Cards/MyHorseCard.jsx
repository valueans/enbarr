import React, { useEffect, useState } from 'react'
import { Card,Box,Typography,Grid,CardMedia } from '@mui/material';
import Button from '../Buttons/Button';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CustomModel from '../Models/CustomModel';
import HorseService from '../../Services/HorseService';
import CustomSnackBar from '../SnackBar/CustomSnackBar';

const MyHorseCard = ({image,horseAddKey,adds,setAdds,likes=0}) => {
const navigator = useNavigate();

useEffect(() => {
    let get_current_add = adds.filter(element=>element.id===horseAddKey)[0];
    setCurrentAdd(get_current_add)
}, [])

const [openDeleteModel,setOpenDeleteModel] = useState(false);

const [ snackBarData,setSnackBarData ] = useState({open:false,message:"",severity:"error"})

const [currentAdd,setCurrentAdd] = useState({})

const deleteHorse = async ()=>{
    try {
        await HorseService.deleteMyHorse(horseAddKey)
        let filtered_horse = adds.filter(element => element.id!==horseAddKey);
        setAdds(filtered_horse)
        setSnackBarData({open:true,message:"Successfully Deleted",severity:"success"})
    } catch (error) {
        setSnackBarData({open:true,message:"something went wrong please try later",severity:"error"})
    }
}

const editHorse = ()=>{
    let _images_id = currentAdd.images.map(element=>element.id)
    let _keywords_id = currentAdd.keywords.map(element=>element.id)
    let _images = currentAdd.images.map((element)=>{
        return {id:element.id,image:element.file,file_type:element.file_type}
    })
    let horseData = {images_id:_images_id,title:currentAdd.title,year_of_birth:currentAdd.year_of_birth,location_id:currentAdd.location.id,user_location:"",price:currentAdd.price,description:currentAdd.description,breed_id:currentAdd.breed.id,gender:currentAdd.gender,color_id:currentAdd.color.id,height:currentAdd.height,temperament_id:currentAdd.temperament.id,discipline_id:currentAdd.discipline.id,keywords_id:_keywords_id}
    return navigator(`/home/seller`,{state:{horseData:horseData,editHorse:true,images:_images,keywords:currentAdd.keywords,horse_id:horseAddKey}})
}

const detailsClicked = ()=>{
    return navigator(`/home/horse?id=${horseAddKey}`)
}
    

  return (
    <>
    <CustomSnackBar snackBarData={snackBarData} setSnackBarData={setSnackBarData}/>
    <Card sx={{height:"500px",width:"340px",boxShadow:"0px 10px 10px rgba(0, 0, 0, 0.1)",borderRadius:"30px"}}>
        <CardMedia component={image.file_type==='IMAGE'?'img':'video'} height="100%" image={image.file} alt="add-image" controls autoPlay/>
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
                <Typography variant='myHorseCardTitle'>{currentAdd?.title}</Typography>
            </Grid>
            <Grid item xs={12} sx={{height:"54px",overflow:"hidden",padding:"2px 5px 0px 5px"}}>
                <Typography variant='imageDescriptions' color="#FFFFFF">{currentAdd?.description}</Typography>
            </Grid>
            <Grid item xs={4} sx={{position:"relative",left:"40px"}}>
                <Button backgroundColor='#800020' title="Remove Add" color='#FFFFFF' borderRadius='30px 0px'
                    width="100%" onClick={()=>{setOpenDeleteModel(true)}}/>
            </Grid>
            <Grid item xs={4} sx={{position:"relative",left:"25px"}}>
                <Button backgroundColor='#FFFFFF' title="Edit" color='black' borderRadius='30px 0px' width="100%" onClick={editHorse}/>
            </Grid>
            <Grid item xs={4}>
                <Button backgroundColor='#313033' title="Details" borderRadius='30px 0px' width="100%"
                    onClick={detailsClicked} />
            </Grid>
        </Grid>
    </Box>
    <CustomModel title="Delete this horse" open={openDeleteModel} setOpen={setOpenDeleteModel} onClick={deleteHorse}/>
    </>
    
  )
}

export default MyHorseCard