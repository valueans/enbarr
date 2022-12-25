import React from 'react';
import {Routes,Route} from "react-router-dom"
import LandingPage from '../Components/Pages/LandingPage';
import Home from '../Components/Pages/Home';
import AuthenticationPage from '../Components/Pages/AuthenticationPage';
import MyHorse from '../Components/Pages/MyHorse';

const Routers = () => {
  return (
    <Routes>
        <Route exact path='/landing' element={<LandingPage></LandingPage>}/>
        <Route path='/auth/*' element={<AuthenticationPage/>}/>
        <Route path='/home/*' element={<Home/>}/>
        <Route path='/myhorse/*' element={<MyHorse></MyHorse>}/>
        <Route path='/' element={<Home></Home>}/>


        {/* example of custom routing */}
        {/* <Route path='/signup/:id' element={<AuthenticationPage title="signup"/>}/> */}
        {/* then useParam hook to get the id example below */}
        {/* import {useParams} from "react-router-dom" */}
        {/* const {id} = useParams(); */}

    </Routes>
  )
}

export default Routers;


