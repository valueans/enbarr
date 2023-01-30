import React from 'react'
import {Grid,Card,CardContent,Typography,CardMedia} from '@mui/material';


const ReceiverMessageCard = ({message}) => {

    const timeConverter = (PUBNUB_timestamp)=>{
        var UNIX_timestamp = PUBNUB_timestamp / 10000000;
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
        return time;
    }


  return (
    <Grid container item xs={12} className="justifyContentEnd">
        <Grid container item xs={4}>
            <Grid item xs={12}>
                <Card sx={{minHeight:"86px",maxWidth:"463px",background:"#302F32",borderRadius: "0px 10px 10px 10px"}} className="receiverMessage">
                {
                        message?.message?.file?
                        <CardMedia
                        component="img"
                        height="300px"
                        image={message.message.file.url}
                        alt="add-image"
                        />
                        :<CardContent sx={{wordBreak:"break-word"}}>
                            <Typography variant="imageDescriptions" sx={{color:"#FFFFFF"}}>{message.message.text}</Typography>
                        </CardContent>
                    }
                </Card>
            </Grid>
            <Grid item xs={12} className="justifyContentEnd">
                <Typography variant="chatMessageTime" sx={{color:"#302F32"}}>{timeConverter(message.timetoken)}</Typography>
            </Grid>
        </Grid>
    </Grid>
  )
}

export default ReceiverMessageCard;