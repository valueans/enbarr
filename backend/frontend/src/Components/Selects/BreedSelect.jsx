import React, { useEffect,useState } from 'react';
import { Select,MenuItem,FormControl } from '@mui/material';
import HorseService from '../../Services/HorseService';

const BreedSelect = ({horseData,setHorseData}) => {
    const [options,setOptions] = useState([])
    const handleChange = (event) => {
        setHorseData({...horseData,breed_id:event.target.value})
    };
    useEffect(()=>{
        const getAllBreeds = async ()=>{
            const response = await HorseService.getAllBreeds();
            setOptions(response)
          }
          getAllBreeds()
    },[])
  return (
    <FormControl fullWidth>
        <Select value={horseData?.breed_id} onChange={handleChange} className="customInput" sx={{minHeight:"60px"}} variant="standard" disableUnderline={true}>
      {options.map((object)=>{
        return <MenuItem value={object.id} key={object.id}>{object.breed}</MenuItem>
      })}
    </Select>
    </FormControl>
  )
}

export default BreedSelect