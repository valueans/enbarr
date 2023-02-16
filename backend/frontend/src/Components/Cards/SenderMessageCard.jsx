import React from 'react'
import {Grid,Typography,CardContent,Card, CardMedia,IconButton} from '@mui/material'
import CustomAvatar from '../Chat/Avatar/CustomAvatar'
import { useState,useEffect } from 'react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useSelector } from 'react-redux';

const SenderMessageCard = ({message,pubnub}) => {

    const state = useSelector(state=>state);

    const [fileType,setFileType] = useState("");
    const [fileUrl,setFileUrl] = useState("");

    const imagesExtentsion = ["jpeg","jpg","png"];
    const videosExtentsion = ['mp4','mov','WEBM'];

    const selectedChat  = useSelector(state=>state.SelectedChat);

    useEffect(()=>{
        if(message.message.file){
            const response = pubnub.getFileUrl({ channel: state.SelectedChatId, id: message.message.file.id, name: message.message.file.name });
            setFileUrl(response)
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
    <Grid container item xs={12} className="justifyContentStart">
        <Grid item xs={1}>
            <CustomAvatar width={50} height={50} image={selectedChat?.user_two_profile?.profile_photo}/>
        </Grid>
        <Grid container item xs={4}>
            <Grid item xs={12}>
                <Card sx={{minHeight:"86px",maxWidth:"463px",background:"#FFFFFF",borderRadius: "0px 10px 10px 10px"}}>
                    {
                        message?.message?.file?
                        fileType === 'image'?
                        <CardMedia
                        component="img"
                        height="300px"
                        image={fileUrl}
                        alt="add-image"
                        sx={{objectFit:"fill"}}
                        />:
                        fileType === 'video'?
                        <CardMedia component='video' height="100%" image={fileUrl} alt="add-image" controls autoPlay sx={{objectFit:"fill"}}/>:
                        <CardContent sx={{wordBreak:"break-word",p:2,mr:3}} className="justifyContentCenter">
                            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                            <IconButton sx={{border:"1px solid #302F32"}} >
                            <FileDownloadIcon sx={{color:"#302F32"}}/>
                            </IconButton>
                            </a>
                            <Typography variant="characteristicsHeading" sx={{color:"#302F32",ml:3,mt:2}}>{message.message.file.name}</Typography>
                        </CardContent>
                        :
                        <CardContent sx={{wordBreak:"break-word"}}>
                        <Typography variant="imageDescriptions" sx={{color:"#302F32"}}>{message.message}</Typography>
                        </CardContent>
                    }
                </Card>
            </Grid>
            <Grid item xs={12}>
            <Typography variant="chatMessageTime" sx={{color:"#302F32"}}>{timeConverter(message.timetoken)}</Typography>
        </Grid>
        </Grid>
    </Grid>
  )
}

export default SenderMessageCard