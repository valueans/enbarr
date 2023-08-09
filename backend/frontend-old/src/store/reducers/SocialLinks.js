const initialSelectChat = {
    facebook:"",
    instagram:"",
    twitter:"",
    linkedIn:"",
    appleStoreLink:"",
    googleStoreLink:""
};


const SocialLinks = (state=initialSelectChat,action)=>{
    switch(action.type){
        case 'SET_SOCIAL_LINKS':
            return action.payload
        case 'GET_SOCIAL_LINKS':
            return state
        default:
            return state
    }
}

export default SocialLinks;