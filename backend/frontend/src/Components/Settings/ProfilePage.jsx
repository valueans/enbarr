import React, { useRef, useState } from 'react';
import { Grid,Typography,Avatar } from '@mui/material';
import Fab from '@mui/material/Fab';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CustomInput from '../Inputs/CustomInput';
import Button from '../Buttons/Button';
import { setVerifyStatus } from '../../Constants/storage';
import AuthService from '../../Services/AuthService';
import { setUserProfile as setDefaultUserProfile,getUserProfile as getDefaultUserProfile } from '../../Constants/storage';

const ProfilePage = ({setSnackBarData}) => {

    const defaultUserProfile = getDefaultUserProfile();
    const [userProfile,setUserProfile] = useState(defaultUserProfile);
    const [disableEdit,setDisableEdit] = useState(true)

    const [profilePhoto,setProfilePhoto] = useState(userProfile.profile_photo===null?"":userProfile.profile_photo);

    const inputFile = useRef(null);

    const handleFileInputChange = (e)=>{
        setUserProfile({...userProfile,profile_photo:e.target.files[0]})
        const objectUrl = URL.createObjectURL(e.target.files[0])
        setProfilePhoto(objectUrl)
    }


    const editProfile = async ()=>{
        if (disableEdit){
            setDisableEdit(false)
        }
        else{
            setDisableEdit(true)
            try {
                const response = await AuthService.udpateUserProfile(userProfile);
                if(defaultUserProfile.user.email !== response.user.email){
                    setVerifyStatus(false)
                    window.location.replace('/auth/login')
                }
                setDefaultUserProfile(response)
                setUserProfile(response)
                setSnackBarData({open:true,message:"Profile Successfully updated.",severity:"success"})
            } catch (error) {
                setDisableEdit(false)
                if (error.response.data.email){
                    setSnackBarData({open:true,message:error.response.data.email[0],severity:"error"})
                }   
                console.log(error)
                
            }
        }
    }



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
                <Avatar alt={`${userProfile.first_name===null?"":userProfile.first_name} ${userProfile.last_name===null?"":userProfile.last_name}`} src={profilePhoto}
                    sx={{height:"167px",width:"167px",border:"5px solid white"}} />
                <input type="file" style={{display:'none'}} ref={inputFile} onChange={handleFileInputChange} accept="image/png,image/jpeg,image/jpg"/>
                <Fab color="primary" aria-label="add"
                    sx={{border:"5px solid white",position:"relative",right:"40px",top:"90px"}} onClick={()=>{inputFile.current.click()}} disabled={disableEdit}>
                    <CameraAltIcon />
                </Fab>
            </Grid>
        </Grid>
        <Grid container sx={{p:5,mt:5}} spacing={5}>
            <Grid item xs={12}>
                <Typography variant="authInputTitle" component="div">Full Name</Typography>
                <CustomInput type="text" value={`${userProfile.first_name===null?"":userProfile.first_name} ${userProfile.last_name===null?"":userProfile.last_name}`} disabled={disableEdit} onChange={(e)=>{
                    let _first_name = e.target.value.split(' ').slice(0, -1).join(' ')
                    let _last_name = e.target.value.split(' ').slice(-1).join(' ');
                    setUserProfile({...userProfile,first_name:_first_name,last_name:_last_name})
                }}/>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="authInputTitle" component="div">Email</Typography>
                <CustomInput type="text" value={userProfile.user.email===null?"":userProfile.user.email} disabled={disableEdit} onChange={(e)=>{
                    setUserProfile({...userProfile,user:{...userProfile.user,email:e.target.value}})
                }}/>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="authInputTitle" component="div">Bio(optional)</Typography>
                <CustomInput type="text" minRows={10} maxRows={20} multiline={true} maxLength={1000} value={userProfile.bio===null?"":userProfile.bio} disabled={disableEdit} onChange={(e)=>{
                    setUserProfile({...userProfile,bio:e.target.value})
                }}/>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="authInputTitle" component="div">Address</Typography>
                <CustomInput type="text" value={userProfile.address===null?"":userProfile.address} disabled={disableEdit} onChange={(e)=>{
                    setUserProfile({...userProfile,address:e.target.value})
                }}/>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="authInputTitle" component="div">City</Typography>
                <CustomInput type="text" value={userProfile.city===null?"":userProfile.city} disabled={disableEdit} onChange={(e)=>{
                    setUserProfile({...userProfile,city:e.target.value})
                }}/>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="authInputTitle" component="div">Zipcode</Typography>
                <CustomInput type="text" value={userProfile.zipcode===null?"":userProfile.zipcode} disabled={disableEdit} onChange={(e)=>{
                    setUserProfile({...userProfile,zipcode:e.target.value})
                }}/>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="authInputTitle" component="div">State</Typography>
                <CustomInput type="text" value={userProfile.state===null?"":userProfile.state} disabled={disableEdit} onChange={(e)=>{
                    setUserProfile({...userProfile,state:e.target.value})
                }}/>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="authInputTitle" component="div">Country</Typography>
                <CustomInput type="text" value={userProfile.country===null?"":userProfile.country} disabled={disableEdit} onChange={(e)=>{
                    setUserProfile({...userProfile,country:e.target.value})
                }}/>
            </Grid>
            <Grid item xs={12}>
                <Button title={disableEdit?"Edit":"Save"} backgroundColor={disableEdit?'#E1E1E1':'#313033'} color={disableEdit?'#313033':'#FFFFFF'} border={disableEdit?'1px solid #868686':"none"}
                    width="100%" onClick={editProfile}></Button>
            </Grid>
        </Grid>
    </Grid>
  )
}

export default ProfilePage