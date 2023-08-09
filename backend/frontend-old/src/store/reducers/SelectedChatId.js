const initialSelectChat = "";

const SelectedChatId = (state=initialSelectChat,action)=>{
    switch(action.type){
        case 'SET_SELECTED_CHANNEL_ID':
            return action.payload
        case 'GET_SELECTED_CHANNEL_ID':
            return state
        default:
            return state
    }
}

export default SelectedChatId;