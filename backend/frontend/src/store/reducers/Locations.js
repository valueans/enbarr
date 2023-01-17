let initialState = []
const Locations = (state=initialState,action)=>{
    switch(action.type){
        case "SET_LOCATIONS":
            return state([...action.payload])
        case "GET_LOCATIONS":
            return state
        default:
            return state
    }
}

export default Locations;