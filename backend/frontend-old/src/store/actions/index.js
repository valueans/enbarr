export const setSelectedChannelId = (channel_id)=>{
    return {
        type:"SET_SELECTED_CHANNEL_ID",
        payload: channel_id
    }
}
export const getSelectedChannelId = () =>{ 
    return {
        type:"GET_SELECTED_CHANNEL_ID"
    }
}

export const setSelectedChannel = (channel)=>{
    return {
        type:"SET_SELECTED_CHANNEL",
        payload: channel
    }
}
export const getSelectedChannel = () =>{ 
    return {
        type:"GET_SELECTED_CHANNEL"
    }
}

export const setSocialLinks = (link)=>{
    return {
        type:"SET_SOCIAL_LINKS",
        payload: link
    }
}
export const getSocialLinks = () =>{ 
    return {
        type:"GET_SOCIAL_LINKS"
    }
}

export const setBuyerSearchLocation = (lat,lng) =>{ 
    return {
        type:"SET_BUYER_SEARCH_LOCATION",
        payload: {lat:lat,lng:lng}
    }
}

export const getBuyerSearchLocation = () =>{ 
    return {
        type:"GET_BUYER_SEARCH_LOCATION"
    }
}
