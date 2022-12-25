import React from 'react';
import {Routes,Route} from "react-router-dom"
import LandingPage from '../Components/Pages/LandingPage';
import Home from '../Components/Pages/Home';
import AuthenticationPage from '../Components/Pages/AuthenticationPage';

const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<LandingPage></LandingPage>}/>
        <Route path='/auth' element={<AuthenticationPage/>}/>
        <Route path='/home' element={<Home page="home" />}/>
        <Route path='/buyer' element={<Home page="buyer" />} />
        <Route path='/seller' element={<Home page="seller" />} />
        <Route path='*' element={<LandingPage></LandingPage>}/>


        {/* example of custom routing */}
        {/* <Route path='/signup/:id' element={<AuthenticationPage title="signup"/>}/> */}
        {/* then useParam hook to get the id example below */}
        {/* import {useParams} from "react-router-dom" */}
        {/* const {id} = useParams(); */}

    </Routes>
  )
}

export default Routers;


