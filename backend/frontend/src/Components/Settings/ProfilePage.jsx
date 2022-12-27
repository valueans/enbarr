import React from 'react';
import { Grid,Typography,Avatar } from '@mui/material';
import Fab from '@mui/material/Fab';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CustomInput from '../Inputs/CustomInput';
import Button from '../Buttons/Button';

const ProfilePage = () => {
  return (
    <Grid container>
        <Grid item xs={12}
            sx={{border:"1px solid black",height:"233px",background: "#313033",pl:4,pt:4,pr:4,borderRadius:"15px"}}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant='authTitle' sx={{color:"#FFFFFF"}}>Profile</Typography>
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{pt:5}} className="justifyContentCenter">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"
                    sx={{height:"167px",width:"167px",border:"5px solid white"}} />
                <Fab color="primary" aria-label="add"
                    sx={{border:"5px solid white",position:"relative",right:"40px",top:"90px"}}>
                    <CameraAltIcon />
                </Fab>
            </Grid>
        </Grid>
        <Grid container sx={{p:5,mt:5}} spacing={5}>
            <Grid item xs={12}>
                <Typography variant="authInputTitle" component="div">Full Name</Typography>
                <CustomInput type="text" />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="authInputTitle" component="div">Email</Typography>
                <CustomInput type="text" />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="authInputTitle" component="div">Bio(optional)</Typography>
                <CustomInput type="text" minRows={10} maxRows={20} multiline={true} maxLength={1000} />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="authInputTitle" component="div">Address</Typography>
                <CustomInput type="text" />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="authInputTitle" component="div">City</Typography>
                <CustomInput type="text" />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="authInputTitle" component="div">Zipcode</Typography>
                <CustomInput type="text" />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="authInputTitle" component="div">State</Typography>
                <CustomInput type="text" />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="authInputTitle" component="div">Country</Typography>
                <CustomInput type="text" />
            </Grid>
            <Grid item xs={12}>
                <Button title="Edit" backgroundColor='#E1E1E1' color='#313033' border='1px solid #868686'
                    width="100%"></Button>
            </Grid>
        </Grid>
    </Grid>
  )
}

export default ProfilePage