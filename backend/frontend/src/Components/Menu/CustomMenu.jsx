import * as React from 'react';
import {Menu,Badge,Grid,Typography,Avatar,IconButton} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
        <Badge badgeContent={4} color="warning">
            <NotificationsIcon className="headerIcons" id="basic-button" aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick} />
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
                        <IconButton><Typography variant="notification" sx={{color:"#8F8F8F"}}>Mark all as read</Typography></IconButton>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item container xs={12}>
                    <Grid item xs={2} className="alignContentCenter">
                        <Avatar alt="Remy Sharp" sx={{width:"70px",height:"70px"}}/>
                    </Grid>
                    <Grid item xs={8} className="alignContentCenter">
                        <Typography variant="notificationMessage">James Fox messaged you</Typography>
                    </Grid>
                    <Grid item xs={2} className="justifyContentEndAlignCenter">
                        <IconButton >
                            <MoreHorizIcon color="primary" sx={{width:"30px",height:"30px"}}/>
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item container xs={12}>
                    <Grid item xs={2} className="alignContentCenter">
                        <Avatar alt="Remy Sharp" sx={{width:"70px",height:"70px"}}/>
                    </Grid>
                    <Grid item xs={8} className="alignContentCenter">
                        <Typography variant="notificationMessage">James Fox messaged you</Typography>
                    </Grid>
                    <Grid item xs={2} className="justifyContentEndAlignCenter">
                        <IconButton >
                            <MoreHorizIcon color="primary" sx={{width:"30px",height:"30px"}}/>
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item container xs={12}>
                    <Grid item xs={2} className="alignContentCenter">
                        <Avatar alt="Remy Sharp" sx={{width:"70px",height:"70px"}}/>
                    </Grid>
                    <Grid item xs={8} className="alignContentCenter">
                        <Typography variant="notificationMessage">James Fox messaged you</Typography>
                    </Grid>
                    <Grid item xs={2} className="justifyContentEndAlignCenter">
                        <IconButton >
                            <MoreHorizIcon color="primary" sx={{width:"30px",height:"30px"}}/>
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item container xs={12}>
                    <Grid item xs={2} className="alignContentCenter">
                        <Avatar alt="Remy Sharp" sx={{width:"70px",height:"70px"}}/>
                    </Grid>
                    <Grid item xs={8} className="alignContentCenter">
                        <Typography variant="notificationMessage">James Fox messaged you</Typography>
                    </Grid>
                    <Grid item xs={2} className="justifyContentEndAlignCenter">
                        <IconButton >
                            <MoreHorizIcon color="primary" sx={{width:"30px",height:"30px"}}/>
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item container xs={12}>
                    <Grid item xs={2} className="alignContentCenter">
                        <Avatar alt="Remy Sharp" sx={{width:"70px",height:"70px"}}/>
                    </Grid>
                    <Grid item xs={8} className="alignContentCenter">
                        <Typography variant="notificationMessage">James Fox messaged you</Typography>
                    </Grid>
                    <Grid item xs={2} className="justifyContentEndAlignCenter">
                        <IconButton >
                            <MoreHorizIcon color="primary" sx={{width:"30px",height:"30px"}}/>
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item container xs={12}>
                    <Grid item xs={2} className="alignContentCenter">
                        <Avatar alt="Remy Sharp" sx={{width:"70px",height:"70px"}}/>
                    </Grid>
                    <Grid item xs={8} className="alignContentCenter">
                        <Typography variant="notificationMessage">James Fox messaged you</Typography>
                    </Grid>
                    <Grid item xs={2} className="justifyContentEndAlignCenter">
                        <IconButton >
                            <MoreHorizIcon color="primary" sx={{width:"30px",height:"30px"}}/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </Menu>
        </div>
  );
}