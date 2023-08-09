import { combineReducers } from "redux";
import SelectedChatId from "./SelectedChatId";
import SelectedChat from "./SelectedChat";
import SocialLinks from "./SocialLinks";
import BuyerSearchLocation from "./BuyerSearchLocation";

const reducer = combineReducers({SelectedChatId,SelectedChat,SocialLinks,BuyerSearchLocation})


export default reducer;