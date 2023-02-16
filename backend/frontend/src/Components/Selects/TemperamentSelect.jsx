import React, { useEffect,useState } from 'react';
import { Select,MenuItem,FormControl } from '@mui/material';
import HorseService from '../../Services/HorseService';

const TemperamentSelect = ({horseData,setHorseData,disabled=false}) => {

    const [options,setOptions] = useState([])

    const handleChange = (event) => {
        setHorseData({...horseData,temperament_id:event.target.value})
    };

    useEffect(()=>{
        const getAllTemperament = async ()=>{
            const response = await HorseService.getAllTemperaments();
            setOptions(response)
          }
          getAllTemperament()
    },[])
  return (
    <FormControl fullWidth disabled={disabled}>
        <Select value={horseData?.temperament_id} onChange={handleChange} className="customInput" sx={{minHeight:"60px"}} variant="standard" disableUnderline={true}>
      {options.map((object)=>{
        return <MenuItem value={object.id} key={object.id}>{object.temperament}</MenuItem>
      })}
    </Select>
    </FormControl>
  )
}

export default TemperamentSelect