import axios from '../Constants/requests';
import { recentlyAddedHorsesUrl,topHorsesUrl,trendingHorsesUrl,favouriteHorsesUrl, myHorsesUrl } from '../Constants/urls';

const HorseService = {

    getRecentlyAddedHorses : async () => {
        const {data:response} = await axios.get(recentlyAddedHorsesUrl);
        return response
    },
    getTopHorses: async () => {
        const {data:response} = await axios.get(topHorsesUrl);
        return response
    },
    getTrendingHorses : async () => {
        const {data:response} = await axios.get(trendingHorsesUrl);
        return response
    },
    getMyFavouriteHorses : async (page=1) =>{
        const {data:response} = await axios.get(favouriteHorsesUrl+`?page=${page}`);
        return response
    },
    getMyHorses : async (page=1) =>{
        const {data:response} = await axios.get(myHorsesUrl+`?page=${page}`);
        return response
    }
}

export default HorseService;