import React,{ useEffect } from 'react';
import ButtonAppBar from "../Header/Headers";
import { useNavigate } from 'react-router-dom';
import AuthService from '../../Services/AuthService';
import {Routes,Route} from 'react-router-dom'
import LandingContent from '../Landing/LandingContent';
import PrivacyPolicy from '../Settings/PrivacyPolicy';
import TermsAndCondition from '../Settings/TermsAndCondition';
import AboutUs from '../Settings/AboutsUs'
import Faq from '../Settings/Faq';
import Contctus from '../Settings/Contctus'

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
          <Route path="termsAndCondition" element={<TermsAndCondition/>} />
          <Route path="aboutus" element={<AboutUs/>} />
          <Route path="faq" element={<Faq/>} />
          <Route path="contactus" element={<Contctus/>} />
        </Routes>
        </>
  )
}

export default LandingPage