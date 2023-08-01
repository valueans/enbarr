import React from 'react'
import { Grid,Typography, } from '@mui/material';
import CustomAvatar from '../Avatar/CustomAvatar';
import clip from "text-clipper";
import moment from 'moment';
import {useSelector,useDispatch} from 'react-redux';
import { setSelectedChannelId,setSelectedChannel } from '../../../store/actions';

const RecentChat = ({props,setLastRead}) => {

    const selected_conversation = useSelector(state=>state.SelectedChatId);
    const dispatch = useDispatch();

  return (
    <>
    <Grid container spacing={2} sx={{mb:3}} className={selected_conversation===props.channel?'channelItem active alignContentCenter':'channelItem alignContentCenter'} onClick={(e)=>{
        dispatch(setSelectedChannelId(props.channel))
        dispatch(setSelectedChannel(props))
        setLastRead();
    }}>
        <Grid item xs={3}>
            <CustomAvatar name={props.user_two_profile.user.email} image={props.user_two_profile.profile_photo}/>
        </Grid>
        <Grid container item xs={7}>
            <Grid item xs={12}>
                <Typography variant="characteristicsHeading">{props.user_two_profile.user.email.split('@')[0]}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="imageDescriptions">{props.last_message?clip(props.last_message.Messages, 50):""}</Typography>
            </Grid>
        </Grid>
        <Grid container item xs={2}>
            <Grid item xs={12}>
                <Typography>{props.last_message?moment(props?.last_message?.created_at).format('HH:MM'):""}</Typography>
            </Grid>
            {
                props?.unread && props?.unread > 0?<Grid item xs={12}>
                <Typography sx={{border:"1px solid #FF0009",textAlign:"center",borderRadius:"100%",width:"70%",height:"100%",backgroundColor:"#FF0009",color:"white"}} variant="h6">{props?.unread}</Typography>
            </Grid>:""
            }
        </Grid>
    </Grid>
    </>
  )
}

export default RecentChat