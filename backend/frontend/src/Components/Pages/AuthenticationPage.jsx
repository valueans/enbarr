import React,{useState,useEffect} from 'react';
import {Grid, Typography} from '@mui/material';
import HeaderImageGrid from '../Header/HeaderImageGrid';
import logo from '../../assets/logo.svg'
import {Link} from 'react-router-dom';
import AuthenticationTabs from '../Buttons/AuthenticationTabs';
import Footer from '../Footer/Footer';
import { Routes,Route } from 'react-router-dom';
import SignUpForm from '../Forms/SignUpForm';
import SignInForm from '../Forms/SignInForm';
import OtpVerificationForm from '../Forms/OtpVerificationForm';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../Services/AuthService';

const AuthenticationPage = () => {
  const navigator = useNavigate();

  const [signupActive,setSignupActive] = useState(true);
  const [loginActive,setLoginActive] = useState(false);
  const [showTabs,setShowTabs] = useState(true);

  const isAuthenticated = AuthService.checkUserAuthenticated();


    useEffect(() => {
        if (isAuthenticated){
          navigator("/home")   
        }
    },[isAuthenticated,navigator])


  const signupRouter = ()=>{
    setSignupActive(true)
    setLoginActive(false)
    return navigator('/auth/register');
  }

  const loginRouter = ()=>{
    setSignupActive(false)
    setLoginActive(true)
    return navigator('/auth/login');
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
          {showTabs?
          <Grid container >
          {/* login/signup tabs start */}
          <Grid item xs={6}>
            <AuthenticationTabs title="Sign up" isActive={signupActive} onClick={signupRouter}
              borderRadius="50px 0px 0px 50px" />
          </Grid>
          <Grid item xs={6}>
            <AuthenticationTabs title="Login" isActive={loginActive} onClick={loginRouter}
              borderRadius="0px 50px 50px 0px" />
          </Grid>
          {/* login/signup tabs ends */}
        </Grid>:""
          }
          {/* authentication forms starts */}

          <Grid container sx={{mt:2,background:"#FFFFFF",boxShadow:"0px 5px 40px rgba(0, 0, 0, 0.15)",borderRadius:"15px",p:6}}>
            <Grid item xs={12}>
            <Routes>
            <Route path="register" element={<SignUpForm/>} />
            <Route path="*" element={<SignUpForm/>} />
            <Route path="login" element={<SignInForm/>} />
            <Route path="verify" element={<OtpVerificationForm setShowTabs={setShowTabs}/>} />
          </Routes>
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