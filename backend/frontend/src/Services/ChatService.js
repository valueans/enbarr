import axios from "../Constants/requests"
import { conversationUrl } from "../Constants/urls";

const ChatService = {
    getAllConversations : async (page=1)=>{
        const {data:response} = await axios.get(conversationUrl+`?page=${page}`);
        return response
    },
}

export default ChatService;