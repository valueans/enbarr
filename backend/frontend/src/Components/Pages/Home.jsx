import React, { useEffect, useState } from 'react'
import Headers from '../Header/Headers'
import HomeContent from '../Home/HomeContent'
import BuyerContent from '../Home/BuyerContent'
import SellerContent from '../Home/SellerContent'
import HorseDetailContent from '../Home/HorseDetailContent'
import {Routes,Route, useNavigate } from 'react-router-dom'
import AuthService from '../../Services/AuthService'
import CustomSnackBar from '../SnackBar/CustomSnackBar'
import PrivacyPolicy from '../Settings/PrivacyPolicy'
import MatchHorseContent from '../Home/MatchHorseContent'
import UpgradeSubscribtion from '../Settings/UpgradeSubscribtion'
import TermsAndCondition from '../Settings/TermsAndCondition'

const Home = () => {

    const isAuthenticated = AuthService.checkUserAuthenticated();
    const [snackBarData,setSnackBarData] = useState({open:false,message:"",severity:"error"});

    const [lat,setLat] = useState(null);
    const [lng,setLng] = useState(null);

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(function (position) {
            setLat(position.coords.latitude)
            setLng(position.coords.longitude)
        })
    },[navigator.geolocation])
    

  return (
    <div className="white-bg">
        <CustomSnackBar snackBarData={snackBarData} setSnackBarData={setSnackBarData} />
        {/* header when the user will logged in starts */}
        {
        isAuthenticated?
        <Headers headerType="home-page" />:<Headers headerType="landing" />
        }
        {/* header when the user will logged in ends */}

        <Routes>
          <Route path="" element={<HomeContent />} />
          <Route path="privacypolicy" element={<PrivacyPolicy />} />
          <Route path="termsAndCondition" element={<TermsAndCondition />} />
          <Route path="buyer" element={<BuyerContent setSnackBarData={setSnackBarData} lat={lat} lng={lng}/>} />
          <Route path="upgradeSubscription" element={<UpgradeSubscribtion/>} />
          <Route path="seller" element={<SellerContent lat={lat} lng={lng} setLat={setLat} setLng={setLng}/>} />
          <Route path="horse" element={<HorseDetailContent/>} />
          <Route path="matchhorses" element={<MatchHorseContent/>} />
        </Routes>

    </div>
  )
}

export default Home