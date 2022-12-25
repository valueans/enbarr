import React from 'react'
import Headers from '../Header/Headers'
import BlackFooter from '../Footer/BlackFooter'
import HomeContent from '../Home/HomeContent'
import BuyerContent from '../Home/BuyerContent'
import SellerContent from '../Home/SellerContent'

const Home = ({page="home"}) => {
  return (
    <>
        {/* header when the user will logged in starts */}
        <Headers headerType="home-page" />
        {/* header when the user will logged in ends */}

        {
            page==="home"?<HomeContent/>:page==="buyer"?<BuyerContent/>:<SellerContent/>
        }

        {/* footer starts */}
            <BlackFooter />
        {/* footer ends */}

    </>
  )
}

export default Home