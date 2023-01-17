import { combineReducers } from "redux";
import AuthShowTabs from "./AuthTabs";
import Locations from "./Locations";
import UserData from "./UserData";


const reducer = combineReducers({AuthShowTabs,Locations,UserData})


export default reducer;