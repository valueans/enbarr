import React,{useEffect, useState} from 'react';
import {Menu,Badge,Grid,Typography,Avatar,IconButton,MenuItem} from '@mui/material';
import NotificationIcon from '../Svgs/NotificationIcon'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import NotificationsService from '../../Services/NotificationService';
import CustomSnackBar from '../SnackBar/CustomSnackBar';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useNavigate } from 'react-router-dom';

export default function NotificationMenu() {

// variable define for menu to open and close
  const navigator = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorSingleNotiEl, setAnchorSingleNotiEl] = useState(null);
  const open = Boolean(anchorEl);
  const singleNotiOpen = Boolean(anchorSingleNotiEl);

//   on clicking the option button for each notification it will set the id
  const [currentNotificationId,setCurrentNotificationId] = useState(null)

//   success of error message snackbar
  const [snackBarData,setSnackBarData] = useState({
    open:false,
    message:"",
    severity:"success"
  });
//   notifications
  const [notifications,setNotifications] = useState([]);
//   count of total notification
  const [totalNotificationsCount,setToalNotificationsCount] = useState([]);
//   notification pagination it is implemented with show more button
  const [page,setPage] = useState(1);
//   unread count notifications
  const [unReadCount,setUnreadCount] = useState(0);

//   function to open main notification dailog or menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  //   function to close main notification dailog or menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  //   function to open inner notification dailog or menu
  const handleSingleNotiClick = (event,id) => {
    setAnchorSingleNotiEl(event.currentTarget);
    setCurrentNotificationId(id)
  };

  //   function to close inner notification dailog or menu
  const handleSingleNotiClose = () => {
    setAnchorSingleNotiEl(null);
  };

//   function to update the status of the notification
  const updateNotificationStatus = async ()=>{
    try{
        await NotificationsService.updateNotificationStatus(currentNotificationId);
        handleSingleNotiClose()
        setSnackBarData({open:true,message:"Successfully read",severity:"success"})
        setAnchorSingleNotiEl(null);
        notifications.map((item)=>{
            if (item.id === currentNotificationId){
                item.read_status = true;
            }
        })
        setNotifications([...notifications])
    }
    catch(error){
        setSnackBarData({open:true,message:error.response.data.message,severity:"error"})
    }
  }
  
  const updateAllNotificationStatus = async ()=>{
    try{
        await NotificationsService.readAllNotifications();
        handleSingleNotiClose()
        setSnackBarData({open:true,message:"Successfully read",severity:"success"})
        setAnchorSingleNotiEl(null);
        notifications.map((item)=>{
            item.read_status = true;
        })
        setNotifications([...notifications])
    }
    catch(error){
        setSnackBarData({open:true,message:error.response.data.message,severity:"error"})
    }
  }
  const deleteNotification = async ()=>{
    await NotificationsService.deleteNotification(currentNotificationId);
    let new_notifications = notifications.filter((item)=>item.id !== currentNotificationId)
    setNotifications(new_notifications)
    setAnchorSingleNotiEl(null);
  }

  

  //   to get all the notifications before the dom is loaded
  useEffect(()=>{
    const getNotifications = async ()=>{
        const response = await NotificationsService.getMyNotifications(page);
        console.log("response",response)
        setNotifications([...notifications,...response.results])
        setToalNotificationsCount(response.count)
    }
    getNotifications()
  },[page])
  

  useEffect(()=>{
    const getUnreadCount = ()=>{
        let count = 0;
        notifications.map((item)=>{
            if (item.read_status === false){
                count++
            }
            return 1
        })
        setUnreadCount(count)
    }

    getUnreadCount()
  },[notifications])

  return (
    <div>
        <CustomSnackBar snackBarData={snackBarData} setSnackBarData={setSnackBarData} />

        <Badge badgeContent={unReadCount} color="warning" sx={{cursor:"pointer"}}>
            <NotificationIcon className="headerIcons" id="basic-button" aria-controls={open ? 'basic-menu' : undefined}
                aria_haspopup="true" aria_expanded={open ? 'true' : undefined} onClick={handleClick} />
        </Badge>
        <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
            <Grid container sx={{minWidth:"600px",maxWidth:"600px",p:4,maxHeight:"600px",overflow:"scroll"}} spacing={4}>
                <Grid item xs={12}>
                    <Typography variant="authTitle">Notification</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container className='justifyContentBetween'>
                        <Grid item xs={5} sx={{textAlign:"start"}}>
                            <Typography variant="notification">All notifications</Typography>
                        </Grid>
                        <Grid item xs={5} sx={{textAlign:"end"}}>
                        <IconButton onClick={updateAllNotificationStatus} disabled={unReadCount===0}><Typography variant="notification" sx={{color:"#8F8F8F"}}>Mark all as read</Typography></IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                {notifications.length > 0? 
                notifications.map((element)=>{
                    return <Grid item container xs={12} key={element.id}>
                        <Grid item xs={1} sx={{display:"flex",justifyContent:"flex-end"}}>
                            {
                                element.read_status === false?<FiberManualRecordIcon fontSize="10px" color='warning'/>:""
                            }
                        </Grid>
                        <Grid item xs={2} className="alignContentCenter">
                            <Avatar alt="Remy Sharp" sx={{width:"70px",height:"70px"}} src={element?.message_profile_url}/>
                        </Grid>
                        <Grid item xs={7} className="alignContentCenter" onClick={()=>{
                          if(element.type === "MESSAGE"){
                            navigator("/messages")
                          }
                          if(element.type === "LIKE" || element.type==="HORSE LIKE"){
                            navigator("/myhorse/myhorses?page=1")
                          }
                        }}>
                            <Typography variant="notificationMessage">{element.description}</Typography>
                        </Grid>
                        <Grid item xs={2} className="justifyContentEndAlignCenter">
                        <IconButton
                            id="basic-noti-button"
                            aria-controls={singleNotiOpen ? 'single-notification-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={singleNotiOpen ? 'true' : undefined}
                            onClick={e => handleSingleNotiClick(e,element.id)}
                        >
                            <MoreHorizIcon color="primary" sx={{width:"30px",height:"30px"}}/>
                        </IconButton>
                            <Menu
                                id="basic-noti-menu"
                                anchorEl={anchorSingleNotiEl}
                                open={singleNotiOpen}
                                onClose={handleSingleNotiClose}
                                MenuListProps={{
                                'aria-labelledby': "basic-noti-button",
                                }}
                                className="singleNotification"
                                elevation={1}
                            >
                                <MenuItem onClick={updateNotificationStatus}>Mark as read</MenuItem>
                                <MenuItem onClick={deleteNotification}>Delete</MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                }):<Grid item container xs={12}>
                    <Typography variant='h5' sx={{color:"red"}}>no data found....</Typography>
                    </Grid>}
                
                {
                    totalNotificationsCount > 12*page ?
                    <Grid item container xs={12} className="justifyContentCenter">
                        <IconButton onClick={()=>{
                            setPage(page+1)
                            }}><Typography variant="button" sx={{color:"#8F8F8F"}}>show more...</Typography></IconButton>
                    </Grid> :""
                }
            </Grid>
        </Menu>
        </div>
  );
}