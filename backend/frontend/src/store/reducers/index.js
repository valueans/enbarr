import { combineReducers } from "redux";
import SelectedChatId from "./SelectedChatId";
import SelectedChat from "./SelectedChat";
import SocialLinks from "./SocialLinks";

const reducer = combineReducers({SelectedChatId,SelectedChat,SocialLinks})


export default reducer;