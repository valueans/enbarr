import React from 'react'
import {Chip} from '@mui/material';
import HorseService from '../../Services/HorseService';

const CustomChips = ({title,keywords,setKeywords,horseData,setHorseData}) => {

  const handleDelete = async ()=>{
      await HorseService.deleteHorseKeyword(title.id)
      let keywords_ids = horseData.keywords_id.filter((keyword_id)=>keyword_id!==title.id)
      setHorseData({...horseData,keywords_id:keywords_ids})
      let _keywords = keywords.filter((object,idx) => object.id !== title.id);
      setKeywords(_keywords)
    }
    
  return (
        <Chip label={title?.keyword} onDelete={handleDelete} sx={{width:"100%"}} id={title?.id}/>
  )
}

export default CustomChips