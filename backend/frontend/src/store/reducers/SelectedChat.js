const initialSelectChat = {};

const SelectedChat = (state=initialSelectChat,action)=>{
    switch(action.type){
        case 'SET_SELECTED_CHANNEL':
            return action.payload
        case 'GET_SELECTED_CHANNEL':
            return state
        default:
            return state
    }
}

export default SelectedChat;