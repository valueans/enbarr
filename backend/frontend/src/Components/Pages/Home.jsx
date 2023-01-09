import React, { useEffect } from 'react'
import Headers from '../Header/Headers'
import BlackFooter from '../Footer/BlackFooter'
import HomeContent from '../Home/HomeContent'
import BuyerContent from '../Home/BuyerContent'
import SellerContent from '../Home/SellerContent'
import HorseDetailContent from '../Home/HorseDetailContent'
import {Routes,Route, useNavigate } from 'react-router-dom'
import AuthService from '../../Services/AuthService'

const Home = () => {

    const navigator = useNavigate();
    const isAuthenticated = AuthService.checkUserAuthenticated();
    


    useEffect(() => {
        if (!isAuthenticated){
          navigator("/")   
        }
    },[isAuthenticated,navigator])

  return (
    <>
        {/* header when the user will logged in starts */}
        <Headers headerType="home-page" />
        {/* header when the user will logged in ends */}

        <Routes>
          <Route path="" element={<HomeContent />} />
          <Route path="buyer" element={<BuyerContent/>} />
          <Route path="seller" element={<SellerContent/>} />
          <Route path="horse" element={<HorseDetailContent/>} />
        </Routes>

        {/* footer starts */}
            <BlackFooter />
        {/* footer ends */}

    </>
  )
}

export default Home