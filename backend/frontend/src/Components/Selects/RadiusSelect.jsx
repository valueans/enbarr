import React from 'react'
import { Select,MenuItem,FormControl } from '@mui/material';

const RadiusSelect = ({userSearchSaveData,setUserSearchSaveData}) => {
    const options = [
        {
            "name":"20 Miles",
            "value": 20
        },
        {
            "name":"50 Miles",
            "value": 50
        },
        {
            "name":"100 Miles",
            "value": 100
        },
        {
            "name":"150 Miles",
            "value": 150
        },
        {
            "name":"200 Miles",
            "value": 200
        },
        {
            "name":"250 Miles",
            "value": 250
        },
        {
            "name":"300 Miles",
            "value": 300
        },
    ]
    const handleChange = (event) => {
        setUserSearchSaveData({...userSearchSaveData,radius:event.target.value})
    };

  return (
    <FormControl fullWidth>
        <Select value={userSearchSaveData?.radius?userSearchSaveData?.radius:""} onChange={handleChange} className="customInput" sx={{minHeight:"60px"}} variant="standard" disableUnderline={true}>
        {options.map((object)=>{
        return <MenuItem value={object.value} key={object.value}>{object.name}</MenuItem>
        })}
    </Select>
    </FormControl>
  )
}

export default RadiusSelect