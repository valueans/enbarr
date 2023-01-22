import React, { useEffect,useState } from 'react';
import { Select,MenuItem,FormControl } from '@mui/material';
import HorseService from '../../Services/HorseService';

const ColorsSelect = ({horseData,setHorseData}) => {

    const [options,setOptions] = useState([])

    const handleChange = (event) => {
        setHorseData({...horseData,color_id:event.target.value})
    };

    useEffect(()=>{
        const getAllColors = async ()=>{
            const response = await HorseService.getAllColors();
            setOptions(response)
        }
        getAllColors()
    },[])
  return (
    <FormControl fullWidth>
        <Select value={horseData?.color_id} onChange={handleChange} className="customInput" sx={{minHeight:"60px"}} variant="standard" disableUnderline={true}>
      {options.map((object)=>{
        return <MenuItem value={object.id} key={object.id}>{object.color}</MenuItem>
      })}
    </Select>
    </FormControl>
  )
}

export default ColorsSelect