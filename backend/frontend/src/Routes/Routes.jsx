import React from 'react';
import {Routes,Route} from "react-router-dom"
import LandingPage from '../Components/Pages/LandingPage';
import Home from '../Components/Pages/Home';
import AuthenticationPage from '../Components/Pages/AuthenticationPage';
import MyHorse from '../Components/Pages/MyHorse';
import SettingsPage from '../Components/Pages/SettingsPage';


const Routers = () => {
  return (
    <Routes>
        <Route exact path='/' element={<LandingPage></LandingPage>}/>
        <Route path='/auth/*' element={<AuthenticationPage/>}/>
        <Route path='/home/*' element={<Home/>}/>
        <Route path='/myhorse/*' element={<MyHorse></MyHorse>}/>
        <Route path='/settings/*' element={<SettingsPage></SettingsPage>}/>


        {/* example of custom routing */}
        {/* <Route path='/signup/:id' element={<AuthenticationPage title="signup"/>}/> */}
        {/* then useParam hook to get the id example below */}
        {/* import {useParams} from "react-router-dom" */}
        {/* const {id} = useParams(); */}

    </Routes>
  )
}

export default Routers;


