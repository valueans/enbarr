import React, { useEffect,useState } from 'react';
import { Select,MenuItem,FormControl } from '@mui/material';
import { State, City }  from 'country-state-city';

const StateSelect = ({horseData,setHorseData,disabled=false}) => {

    const [options,setOptions] = useState([])   

    const handleChange = (event) => {
        setHorseData({...horseData,state:event.target.value})
    };

    useEffect(()=>{
        setOptions(State.getStatesOfCountry(horseData.country))
    },[horseData.country])

    return (
        <FormControl fullWidth disabled={!horseData.country}>
            <Select value={horseData?.state?horseData?.state:""} onChange={handleChange} className="customInput" sx={{minHeight:"60px"}} variant="standard" disableUnderline={true}>
          {options.map((object)=>{
            return <MenuItem value={object.isoCode} key={object.isoCode}>{object.name}</MenuItem>
          })}
        </Select>
        </FormControl>
    
      )
}

export default StateSelect