import { Alert, Snackbar } from '@mui/material'
import React from 'react'

const CustomSnackBar = ({snackBarData,setSnackBarData}) => {

    const handleClose = ()=>{
        setSnackBarData({...setSnackBarData,open:false})
    }    

    const position = {vertical: 'top',horizontal: 'right'}

  return (
    <Snackbar open={snackBarData.open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={position} sx={{zIndex:11}}>
    <Alert onClose={handleClose} severity={snackBarData.severity} sx={{ width: '100%' }}>
        {snackBarData.message}
    </Alert>
    </Snackbar>
  )
}

export default CustomSnackBar