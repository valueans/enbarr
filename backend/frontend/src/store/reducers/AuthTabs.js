let initalTabsState = true;

const AuthShowTabs = (state=initalTabsState,action)=>{
    switch(action.type){
        case 'SET_AUTH_TABS_FALSE':
            return false
        case 'SET_AUTH_TABS_TRUE':
            return true
        default:
            return state
    }
}

export default AuthShowTabs;