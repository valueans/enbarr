import React, { useEffect,useState } from 'react';
import { Select,MenuItem,FormControl } from '@mui/material';
import { City }  from 'country-state-city';

const CitiesSelect = ({horseData,setHorseData,disabled=false}) => {

    const [options,setOptions] = useState([])   

    const handleChange = (event) => {
        setHorseData({...horseData,city:event.target.value})
    };

    useEffect(()=>{
        const _cities = City.getCitiesOfState(horseData.country,horseData.state)
        setOptions(_cities)
    },[horseData.state])

    return (
        <FormControl fullWidth disabled={!horseData.state}>
            <Select value={horseData?.city?horseData?.city:""} onChange={handleChange} className="customInput" sx={{minHeight:"60px"}} variant="standard" disableUnderline={true}>
          {options.map((object)=>{
            return <MenuItem value={object.name} key={object.name}>{object.name}</MenuItem>
          })}
        </Select>
        </FormControl>
    
      )
}

export default CitiesSelect