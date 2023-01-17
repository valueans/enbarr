import React, { useEffect,useState } from 'react';
import { Select,MenuItem,FormControl } from '@mui/material';
import HorseService from '../../Services/HorseService';

const CustomSelect = ({select_type,horseData,setHorseData}) => {
    const [selectedValue, setSelectedValue] = useState('');

    const [options,setOptions] = useState([])

    const getAllLocations = async ()=>{
      const response = await HorseService.getAllLocations()
      setOptions(response)
    }
    
    const getAllBreeds = async ()=>{
      const response = await HorseService.getAllBreeds();
      setOptions(response)
    }
    
    const getAllDisciplines = async ()=>{
      const response = await HorseService.getAllDisciplines();
      setOptions(response)
    }
    const getAllColors = async ()=>{
      const response = await HorseService.getAllColors();
      setOptions(response)
    }
    
    const getAllTemperament = async ()=>{
      const response = await HorseService.getAllTemperaments();
      setOptions(response)
    }

    useEffect(()=>{
      if (select_type === 'locations'){
        getAllLocations()
      }
      else if (select_type === 'discipline'){
        getAllDisciplines()
      }
      else if (select_type === 'colors'){
        getAllColors()
      }
      else if (select_type === 'temperaments'){
        getAllTemperament()
      }
      else{
        getAllBreeds()
      }
    },[])

  const handleChange = (event) => {
    if (select_type === 'locations'){
      setHorseData({...horseData,location_id:event.target.value})
    }
    else if (select_type === 'discipline'){
      setHorseData({...horseData,discipline_id:event.target.value})
    }
    else if (select_type === 'colors'){
      setHorseData({...horseData,color_id:event.target.value})
    }
    else if (select_type === 'temperaments'){
      setHorseData({...horseData,temperament_id:event.target.value})
    }
    else{
      setHorseData({...horseData,breed_id:event.target.value})
    }
    setSelectedValue(event.target.value);
  };
  return (
    <FormControl fullWidth>
    <Select value={selectedValue} onChange={handleChange} className="customInput" sx={{minHeight:"60px"}} variant="standard" disableUnderline={true}>
      {options.map((object)=>{
        return select_type === 'locations'?
        <MenuItem value={object.id} key={object.id}>{object.location}</MenuItem>:
        select_type === 'discipline'?
        <MenuItem value={object.id} key={object.id}>{object.discipline}</MenuItem>:
        select_type === 'colors'?
        <MenuItem value={object.id} key={object.id}>{object.color}</MenuItem>:
        select_type === 'temperaments'?
        <MenuItem value={object.id} key={object.id}>{object.temperament}</MenuItem>:
        <MenuItem value={object.id} key={object.id}>{object.breed}</MenuItem>
      })}
    </Select>
    </FormControl>
  )
}

export default CustomSelect