import React, { useEffect, useState } from 'react'
import Headers from '../Header/Headers'
import BlackFooter from '../Footer/BlackFooter'
import HomeContent from '../Home/HomeContent'
import BuyerContent from '../Home/BuyerContent'
import SellerContent from '../Home/SellerContent'
import HorseDetailContent from '../Home/HorseDetailContent'
import {Routes,Route, useNavigate } from 'react-router-dom'
import AuthService from '../../Services/AuthService'
import CustomSnackBar from '../SnackBar/CustomSnackBar'
import PrivacyPolicy from '../Settings/PrivacyPolicy'
import MatchHorseContent from '../Home/MatchHorseContent'

const Home = () => {

    const navigator = useNavigate();
    const isAuthenticated = AuthService.checkUserAuthenticated();
    const [snackBarData,setSnackBarData] = useState({open:false,message:"",severity:"error"});
    


    useEffect(() => {
        if (!isAuthenticated){
          navigator("/")   
        }
    },[isAuthenticated,navigator])

  return (
    <>
        <CustomSnackBar snackBarData={snackBarData} setSnackBarData={setSnackBarData} />
        {/* header when the user will logged in starts */}
        <Headers headerType="home-page" />
        {/* header when the user will logged in ends */}

        <Routes>
          <Route path="" element={<HomeContent />} />
          <Route path="privacypolicy" element={<PrivacyPolicy />} />
          <Route path="buyer" element={<BuyerContent setSnackBarData={setSnackBarData}/>} />
          <Route path="seller" element={<SellerContent/>} />
          <Route path="horse" element={<HorseDetailContent/>} />
          <Route path="matchhorses" element={<MatchHorseContent/>} />
        </Routes>

        {/* footer starts */}
            <BlackFooter />
        {/* footer ends */}

    </>
  )
}

export default Home