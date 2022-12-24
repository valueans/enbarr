import React from 'react';
import { Select,MenuItem,FormControl } from '@mui/material';

const CustomSelect = () => {
    const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <FormControl fullWidth>
    <Select value={age} onChange={handleChange} className="customInput" sx={{p:0}}>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
    </Select>
    </FormControl>
  )
}

export default CustomSelect