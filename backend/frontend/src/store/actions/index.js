import LocationService from "../../Services/LocationService";

export const setAllLocations = async () =>{
    const response =  await LocationService.getAllLocation();
    const data = await response.data;
    return {
        type: 'SET_LOCATIONS',
        payload: data
    }
}

export const getAllLocations = async () =>{
    return {
        type: 'GET_LOCATIONS',
    }
}

export const setUserData = (data) =>{ 
    return {
        type:"SET_USER_DATA",
        payload: data
    }
}
export const getUserData = () =>{ 
    return {
        type:"GET_USER_DATA"
    }
}

export const setAuthTabsFalse = () =>{ 
    return {
        type:"SET_AUTH_TABS_FALSE",
    }
}

export const setAuthTabsTrue = () =>{ 
    return {
        type:"SET_AUTH_TABS_TRUE",
    }
}