import React,{useEffect, useState} from 'react';
import Headers from '../Header/Headers';
import BlackFooter from '../Footer/BlackFooter';
import {Routes,Route } from 'react-router-dom';
import { Grid } from '@mui/material';
import AuthenticationTabs from '../Buttons/AuthenticationTabs';
import { useNavigate } from 'react-router-dom';
import FavoriteHorse from '../Myhorse/FavoriteHorse';
import MyHorses from '../Myhorse/MyHorses';
import AuthService from '../../Services/AuthService';

const MyHorse = () => {
    const navigator = useNavigate();

    const isAuthenticated = AuthService.checkUserAuthenticated();


    useEffect(() => {
        if (!isAuthenticated){
        navigator("/")
        }
    },[isAuthenticated,navigator])

    const [favActive,setFavActive] = useState(true);
    const [myHorseActive,setMyHorseActive] = useState(false);

    const myHorseRoute = ()=>{
        setFavActive(false)
        setMyHorseActive(true)
        return navigator('/myhorse/myhorses')
    }
    const myFavRoute = ()=>{
        setFavActive(true)
        setMyHorseActive(false)
        return navigator('/myhorse/favorites')
    }

return (
<>
    {/* header when the user will logged in starts */}
    <Headers headerType="home-page" currentPage='my-horse' />
    {/* header when the user will logged in ends */}

    <Grid container className="justifyContentCenter" sx={{mt:10}}>
        <Grid item container xs={6} className="justifyContentCenter">
            <Grid item xs={6}>
                <AuthenticationTabs title="Favorites" isActive={favActive} onClick={myFavRoute}
                    borderRadius="50px 0px 0px 50px" />
            </Grid>
            <Grid item xs={6}>
                <AuthenticationTabs title="My Horse" isActive={myHorseActive} onClick={myHorseRoute}
                    borderRadius="0px 50px 50px 0px" />
            </Grid>
        </Grid>
    </Grid>

    <Grid container className="justifyContentCenter">
        <Grid item xs={12} className="justifyContentCenter">
            <Grid item xs={10}>
                <Routes>
                <Route path="*" element={<FavoriteHorse/>}/>
                <Route path="favorites" element={<FavoriteHorse/>}/>
                <Route path="myhorses" element={<MyHorses/>}/>
            </Routes>
            </Grid>
        </Grid> 
    </Grid>
    {/* footer starts */}
    <BlackFooter />
    {/* footer ends */}
</>
)
}

export default MyHorse