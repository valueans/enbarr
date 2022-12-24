import React from 'react'
import {Chip} from '@mui/material';

const CustomChips = ({title}) => {
    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };
  return (
        <Chip label={title} onDelete={handleDelete} sx={{width:"100%"}}/>
  )
}

export default CustomChips