import React,{useEffect, useState} from 'react';
import Headers from '../Header/Headers';
import BlackFooter from '../Footer/BlackFooter';
import {Routes,Route, useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';
import AuthenticationTabs from '../Buttons/AuthenticationTabs';
import { useNavigate } from 'react-router-dom';
import FavoriteHorse from '../Myhorse/FavoriteHorse';
import MyHorses from '../Myhorse/MyHorses';
import AuthService from '../../Services/AuthService';

const MyHorse = () => {
    const navigator = useNavigate();

    const isAuthenticated = AuthService.checkUserAuthenticated();

    const location = useLocation();


    useEffect(() => {
        if (!isAuthenticated){
        navigator("/")
        }
    },[isAuthenticated,navigator])

    const [favActive,setFavActive] = useState(location.pathname==="/myhorse/favorites");
    const [myHorseActive,setMyHorseActive] = useState(location.pathname==="/myhorse/myhorses");

    const myHorseRoute = ()=>{
        setFavActive(false)
        setMyHorseActive(true)
        return navigator('/myhorse/myhorses?page=1')
    }
    const myFavRoute = ()=>{
        setFavActive(true)
        setMyHorseActive(false)
        return navigator('/myhorse/favorites?page=1')
    }

return (
<div className="white-bg">
    {/* header when the user will logged in starts */}
    <Headers headerType="home-page" currentPage='my-horse' />
    {/* header when the user will logged in ends */}

    <Grid container className="justifyContentCenter" sx={{mt:10}}>
        <Grid item container xs={6} className="justifyContentCenter" sx={{background:"#F4F4F4",borderRadius:"50px"}}>
            <Grid item xs={6}>
                <AuthenticationTabs title="Favorites" isActive={favActive} onClick={myFavRoute}
                    borderRadius="50px 50px 50px 50px" />
            </Grid>
            <Grid item xs={6}>
                <AuthenticationTabs title="My Horse" isActive={myHorseActive} onClick={myHorseRoute}
                    borderRadius="50px 50px 50px 50px" />
            </Grid>
        </Grid>
    </Grid>

    <Grid container className="justifyContentCenter">
        <Grid item xs={12} className="justifyContentCenter">
            <Grid item xs={10}>
                <Routes>
                    <Route path="favorites">
                        <Route index element={<FavoriteHorse/>} />
                        <Route path="?page=:page" element={<FavoriteHorse/>} />
                    </Route>
                    <Route path="myhorses">
                        <Route index element={<MyHorses/>} />
                        <Route path="?page=:page" element={<FavoriteHorse/>} />
                    </Route>
            </Routes>
            </Grid>
        </Grid> 
    </Grid>
    {/* footer starts */}
    <BlackFooter />
    {/* footer ends */}
</div>
)
}

export default MyHorse