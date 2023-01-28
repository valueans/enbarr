import React from 'react'
import { Grid,Typography, } from '@mui/material';
import CustomAvatar from '../Avatar/CustomAvatar';
import clip from "text-clipper";
import moment from 'moment';

const RecentChat = (props) => {
    console.log("props",props)
  return (
    <>
    <Grid container spacing={2} sx={{mb:3,cursor:"pointer"}}>
        <Grid item xs={3}>
            <CustomAvatar name={props.user_two_profile.user.email} image={props.user_two_profile.profile_photo}/>
        </Grid>
        <Grid container item xs={7}>
            <Grid item xs={12}>
                <Typography variant="characteristicsHeading">{props.user_two_profile.user.email.split('@')[0]}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="imageDescriptions">{clip(props.last_message.Messages, 50)}</Typography>
            </Grid>
        </Grid>
        <Grid container item xs={2}>
            <Grid item xs={12}>
                <Typography>{moment(props.last_message.created_at).format('HH:MM')}</Typography>
            </Grid>
        </Grid>
    </Grid>
    </>
  )
}

export default RecentChat