import React from 'react';
import {Routes,Route} from "react-router-dom"
import LandingPage from '../Components/Pages/LandingPage';
import AuthenticationPage from '../Components/Pages/AuthenticationPage';

const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<LandingPage></LandingPage>}/>
        <Route path='/auth' element={<AuthenticationPage/>}/>


        {/* example of custom routing */}
        {/* <Route path='/signup/:id' element={<AuthenticationPage title="signup"/>}/> */}
        {/* then useParam hook to get the id example below */}
        {/* import {useParams} from "react-router-dom" */}
        {/* const {id} = useParams(); */}

    </Routes>
  )
}

export default Routers;


