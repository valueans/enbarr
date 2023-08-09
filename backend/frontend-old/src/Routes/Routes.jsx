import React from 'react';
import {Routes,Route} from "react-router-dom"
import LandingPage from '../Components/Pages/LandingPage';
import Home from '../Components/Pages/Home';
import AuthenticationPage from '../Components/Pages/AuthenticationPage';
import MyHorse from '../Components/Pages/MyHorse';
import SettingsPage from '../Components/Pages/SettingsPage';
import Chat from '../Components/Pages/Chat';
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import { getUserProfile } from '../Constants/storage';

const userprofile = getUserProfile();
const Routers = () => {
  const pubnub = new PubNub({
    publishKey: "pub-c-17cb7332-770a-4b7b-a4c8-f6aa6e86deb8",
    subscribeKey: "sub-c-813ba4c4-971e-42d7-a6f7-9a885fa58663",
    userId: `${userprofile?.user?.email}`,
});

  return (
    <Routes>
        <Route exact path='/*' element={<LandingPage></LandingPage>}/>
        <Route path='/auth/*' element={<AuthenticationPage/>}/>
        <Route path='/home/*' element={<Home/>}/>
        <Route path='/messages/*' element={<PubNubProvider client={pubnub}><Chat pubnub={pubnub} userprofile={userprofile}/></PubNubProvider>}/>
        <Route path='/myhorse/*' element={<MyHorse></MyHorse>}/>
        <Route path='/settings/*' element={<SettingsPage></SettingsPage>}/>

    </Routes>
  )
}

export default Routers;

