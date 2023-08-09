import React, { useEffect, useState } from 'react'
import { Card, CardMedia,IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HorseService from '../../Services/HorseService';
import horseImage from "../../../public/horse.png"

const HorseImageUploadCard = ({image,setFiles,files,horseData,setHorseData}) => {
  const debug = import.meta.env.VITE_DEBUG;
  const base_url = import.meta.env.VITE_BASE_URL
  const imagePath = debug=="true"?horseImage:base_url+"static/horse.png";
  
  const removeImage = async (event,id)=>{
    await HorseService.deleteHorseImage(id)
    let images_ids = horseData.images_id.filter((image_id)=>image_id!==id)
    setHorseData({...horseData,images_id:images_ids})
    let _files = files.filter((object,idx) => object.id !== id);
    setFiles(_files)
  }
  
  const [imageUrl,setImageUrl] = useState("");
  
  
  useEffect(()=>{
    try {
      const objectUrl = URL.createObjectURL(image.image) 
      setImageUrl(objectUrl)
    } catch (error) {
      setImageUrl(image.image)
    }
  },[])


  return (
    <>
    <IconButton sx={{width:"25px",height:"25px",position:"relative",left:"55px",zIndex:5,top:"17px",background:"grey"}} onClick={e=>removeImage(e,image.id)}>
        <CloseIcon sx={{height:"25px",width:"25px",color:"#FFFFFF"}} />
      </IconButton>
    <Card sx={{border: "2px dashed #666666",width: "70px",height: "70px",background: "#FFFFFF",backgroundImage:imagePath,zIndex:2}}>
    <CardMedia
      component={image?.file_type === 'IMAGE'?'img':'video'}
      height="100%"
      image={imageUrl}
      alt="add-image"
      loop
      autoPlay
      muted={true}
      sx={{objectFit:"fill"}}
    />
  </Card>
    </>
  )
}

export default HorseImageUploadCard