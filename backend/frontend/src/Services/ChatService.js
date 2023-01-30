import axios from "../Constants/requests"
import { conversationUrl } from "../Constants/urls";

const ChatService = {
    getAllConversations : async (page=1)=>{
        const {data:response} = await axios.get(conversationUrl+`?page=${page}`);
        return response
    },
    generateConversations : async (receiverId)=>{
        const {data:response} = await axios.get(conversationUrl,{
            params:{
                'receiver-id':receiverId
            }
        });
        return response
    },
}

export default ChatService;