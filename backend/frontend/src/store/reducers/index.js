import { combineReducers } from "redux";
import SelectedChatId from "./SelectedChatId";
import SelectedChat from "./SelectedChat";


const reducer = combineReducers({SelectedChatId,SelectedChat})


export default reducer;