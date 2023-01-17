let initialUserState = {}
const UserData = (state=initialUserState,action)=>{
    switch(action.type){
        case 'SET_USER_DATA':
            return action.payload
        case 'GET_USER_DATA':
            return state
        default:
            return state
    }
}

export default UserData;