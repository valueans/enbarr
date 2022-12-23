import React,{useState} from 'react';
import {Grid, Typography} from '@mui/material';
import HeaderImageGrid from '../Header/HeaderImageGrid';
import logo from '../../assets/logo.svg'
import {Link} from 'react-router-dom';
import AuthenticationTabs from '../Buttons/AuthenticationTabs';
import AuthenticationForm from '../Forms/AuthenticationForm';
import Footer from '../Footer/Footer';

const AuthenticationPage = () => {
  const [loginTab,setloginTab] = useState(false);
  const [signUpTab,setsignUpTab] = useState(true);
  const [formTitle,setFormTitle] = useState("Sign up");

  const tabsChange = (title)=>{
    if (title==="Login"){
        setloginTab(true)
        setFormTitle("Login")
        setsignUpTab(false)
    }
    else{
      setsignUpTab(true)
      setFormTitle("Sign up")
      setloginTab(false)
    }
  }

  return (
    <>
      <Grid container>
        {/* form image right taking 4 column */}
        <Grid item xs={7} sx={{height:"100vh",p:8}}>
          {/* logo grid starts */}
          <Grid item container>
            <Grid item xs={1} sx={{textAlign:"center"}}>
              <Link to="/" variant="logo">
              <img src={logo} alt="logo" style={{height:"85px",width:"35.36px",marginTop:"7px"}} />
              </Link>
            </Grid>
            <Grid item xs={1} sx={{display:"flex",alignItems:"center"}}>
              <Typography variant="logo" component="div">
                <Link to="/" style={{color:"#302F32",textDecoration:"none"}}>Enbarr</Link>
              </Typography>
            </Grid>
          </Grid>
          {/* logo grids ends */}
          <Grid container>
            {/* login/signup tabs start */}
            <Grid item xs={6}>
              <AuthenticationTabs title="Sign up" isActive={signUpTab} onClick={tabsChange}
                borderRadius="50px 0px 0px 50px" />
            </Grid>
            <Grid item xs={6}>
              <AuthenticationTabs title="Login" isActive={loginTab} onClick={tabsChange}
                borderRadius="0px 50px 50px 0px" />
            </Grid>
            {/* login/signup tabs ends */}
          </Grid>
          {/* authentication forms starts */}
          <Grid container sx={{mt:2,background:"#FFFFFF",boxShadow:"0px 5px 40px rgba(0, 0, 0, 0.15)",borderRadius:"15px",p:6}}>
            <Grid item xs={12}>
              <AuthenticationForm formType={formTitle} />
            </Grid>
          </Grid>
          {/* authentication forms ends */}

          <Footer />


        </Grid>
        {/* header image right taking 4 column */}
        <HeaderImageGrid top="0px" height="100vh" xs={5}/>
      </Grid>
    </>
  )
}

export default AuthenticationPage;