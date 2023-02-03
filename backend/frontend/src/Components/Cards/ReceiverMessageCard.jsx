import React from 'react'
import {Grid,Card,CardContent,Typography,CardMedia,IconButton} from '@mui/material';
import { useState,useEffect } from 'react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';


const ReceiverMessageCard = ({message}) => {

    const [fileType,setFileType] = useState("");

    const imagesExtentsion = ["jpeg","jpg","png"];
    const videosExtentsion = ['mp4','mov','WEBM'];


    useEffect(()=>{
        if(message.message.file){
            let ext = message.message.file.name.split('.');
            ext = ext[ext.length - 1]
            if (imagesExtentsion.includes(ext)){
                setFileType('image')
            }
            else if (videosExtentsion.includes(ext)){
                setFileType('video')
            }
            else{
                setFileType('file')
            }
        }
    },[])

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
                        fileType === 'image'?
                        <CardMedia
                        component="img"
                        height="300px"
                        image={message.message.file.url}
                        alt="add-image"
                        />:
                        fileType === 'video'?
                        <CardMedia component='video' height="100%" image={message.message.file.url} alt="add-image" controls autoPlay/>:
                        <CardContent sx={{wordBreak:"break-word",p:2,mr:3}} className="justifyContentCenter">
                            <a href={message.message.file.url} target="_blank" rel="noopener noreferrer">
                            <IconButton sx={{border:"1px solid white"}} >
                            <FileDownloadIcon sx={{color:"#FFFFFF"}}/>
                            </IconButton>
                            </a>
                            <Typography variant="characteristicsHeading" sx={{color:"#FFFFFF",ml:3,mt:2}}>{message.message.file.name}</Typography>
                        </CardContent>
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