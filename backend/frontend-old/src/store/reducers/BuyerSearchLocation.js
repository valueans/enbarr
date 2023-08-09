const initialLocation = {
    lat:"",
    lng:"",
};


const BuyerSearchLocation = (state=initialLocation,action)=>{
    switch(action.type){
        case 'SET_BUYER_SEARCH_LOCATION':
            return action.payload
        case 'GET_BUYER_SEARCH_LOCATION':
            return state
        default:
            return state
    }
}

export default BuyerSearchLocation;