import React from 'react';
import { Modal,Typography,Box,Grid } from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import Button from '../Buttons/Button';

const CustomModel = ({open,setOpen,title,onClick}) => {

    const handleClose = ()=>{
        setOpen(false)
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: "400px",
        minHeight:"300px",
        textAlign:"center",
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius:"15px",
        p:10,
        '@media (max-width: 600px)': {
            minWidth: "310px",
            p: 2.5

        }
      };

  return (
    <>
    {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid container>
        <Grid item xs={12} className="justifyContentCenter">
            <Grid container>
                <Grid xs={4}>
                <Box sx={{background:"#FFFFFF"}}>
                    <Grid item xs={12}>
                        <ReportProblemIcon />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">Are you sure, you want to {title}?</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Button title="Yes" />
                    </Grid>
                    <Grid item xs={6}>
                        <Button title="No" backgroundColor='#FFFFFF' onClick={handleClose}/>
                    </Grid>
            </Box>
            </Grid>
            </Grid>
         </Grid>
        </Grid>
      </Modal> */}
      <Modal open={open} onClose={handleClose} aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description">
          <Box sx={{ ...style}}>
            <Grid container>
                <Grid item xs={12}>
                    <ReportProblemIcon sx={{width:"70px",height:"70px"}}/>
                </Grid>
                <Grid item xs={12} sx={{mt:3}}>
                    <Typography variant="landingPageSubDesc">Are you sure you want to {title}?</Typography>
                </Grid>
                <Grid item container xs={12} spacing={2} className="justifyContentCenter" sx={{mt:3}}>
                    <Grid item xs={4}>
                        <Button title="Yes" width="100%" onClick={onClick}></Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button title="No" onClick={handleClose} backgroundColor="#E1E1E1" color='#313033' width="100%" border="1px solid #868686"></Button>
                    </Grid>
                </Grid>
            </Grid>
          </Box>
      </Modal>

    </>
  )
}

export default CustomModel