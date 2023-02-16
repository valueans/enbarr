import React, { useEffect,useState } from 'react';
import { Select,MenuItem,FormControl } from '@mui/material';
import HorseService from '../../Services/HorseService';

const DisciplineSelect = ({horseData,setHorseData,disabled=false}) => {

    const [options,setOptions] = useState([])

    const handleChange = (event) => {
        setHorseData({...horseData,discipline_id:event.target.value})
    };

    useEffect(() => {
        const getAllDisciplines = async ()=>{
            const response = await HorseService.getAllDisciplines();
            setOptions(response)
          }
        getAllDisciplines()
    }, [])
    
  return (
    <FormControl fullWidth disabled={disabled}>
        <Select value={horseData?.discipline_id} onChange={handleChange} className="customInput" sx={{minHeight:"60px"}} variant="standard" disableUnderline={true}>
      {options.map((object)=>{
        return <MenuItem value={object.id} key={object.id}>{object.discipline}</MenuItem>
      })}
    </Select>
    </FormControl>
  )
}

export default DisciplineSelect