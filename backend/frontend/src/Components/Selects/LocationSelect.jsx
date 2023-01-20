import React, { useEffect,useState } from 'react';
import { Select,MenuItem,FormControl } from '@mui/material';
import HorseService from '../../Services/HorseService';

const LocationSelect = ({horseData,setHorseData}) => {

    const [options,setOptions] = useState([])

    const handleChange = (event) => {
        setHorseData({...horseData,location_id:event.target.value})
    };

    useEffect(()=>{
        const getAllLocations = async ()=>{
            const response = await HorseService.getAllLocations()
            setOptions(response)
            }
        getAllLocations()
    },[])
  return (
    <FormControl fullWidth>
        <Select value={horseData.location_id} onChange={handleChange} className="customInput" sx={{minHeight:"60px"}} variant="standard" disableUnderline={true}>
      {options.map((object)=>{
        return <MenuItem value={object.id} key={object.id}>{object.location}</MenuItem>
      })}
    </Select>
    </FormControl>

  )
}

export default LocationSelect