import React,{ useEffect } from 'react';
import ButtonAppBar from "../Header/Headers";
import { useNavigate } from 'react-router-dom';
import AuthService from '../../Services/AuthService';
import {Routes,Route} from 'react-router-dom'
import LandingContent from '../Landing/LandingContent';
import PrivacyPolicy from '../Settings/PrivacyPolicy';

const LandingPage = () => {
    const navigator = useNavigate();
    const isAuthenticated = AuthService.checkUserAuthenticated();


    useEffect(() => {
        if (isAuthenticated){
         navigator("/home")   
        }
    },[isAuthenticated,navigator])

    
  return (
    <>
        {/* LandingPage header starts */}
        <ButtonAppBar headerType="landing"/>
        {/* LandingPage header ends */}


        <Routes>
          <Route path="" element={<LandingContent />} />
          <Route path="privacypolicy" element={<PrivacyPolicy/>} />
        </Routes>
        </>
  )
}

export default LandingPage