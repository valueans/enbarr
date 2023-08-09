import React, { useEffect,useState } from 'react';
import { Select,MenuItem,FormControl } from '@mui/material';
import { Country, State, City }  from 'country-state-city';

const LocationSelect = ({horseData,setHorseData,disabled=false}) => {

    const [options,setOptions] = useState([])

    const handleChange = (event) => {
        setHorseData({...horseData,country:event.target.value})
      };
      
      useEffect(()=>{
        setOptions(Country.getAllCountries())
    },[])
  return (
    <FormControl fullWidth disabled={disabled}>
        <Select value={horseData.country} onChange={handleChange} className="customInput" sx={{minHeight:"60px"}} variant="standard" disableUnderline={true}>
      {options.map((object)=>{
        return <MenuItem value={object.isoCode} key={object.isoCode}>{object.name}</MenuItem>
      })}
    </Select>
    </FormControl>

  )
}

export default LocationSelect