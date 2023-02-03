import axios from '../Constants/requests';
import { recentlyAddedHorsesUrl,topHorsesUrl,trendingHorsesUrl,favouriteHorsesUrl, myHorsesUrl,locationsUrl,breedsUrl, disciplineUrl, colorsUrl, temperamentsUrl, horseImage, horseKeywords, matchHorseUrl, likeHorseUrl, disLikeHorseUrl } from '../Constants/urls';

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
    },
    deleteMyHorse : async (id) =>{
        const {data:response} = await axios.delete(myHorsesUrl,{
            params:{
                "horse-id":id
            }
        });
        return response
    },
    getAllLocations : async () =>{
        const {data:response} = await axios.get(locationsUrl);
        return response
    },
    getAllBreeds : async () =>{
        const {data:response} = await axios.get(breedsUrl);
        return response
    },
    getAllDisciplines : async () =>{
        const {data:response} = await axios.get(disciplineUrl);
        return response
    },
    getAllColors : async () =>{
        const {data:response} = await axios.get(colorsUrl);
        return response
    },
    getAllTemperaments : async () =>{
        const {data:response} = await axios.get(temperamentsUrl);
        return response
    },
    saveHorseImage : async (image) =>{
        let formData = new FormData();
        formData.append("file", image,image.name);
        const {data:response} = await axios.post(horseImage,formData,{
            headers:{
                'Content-Type' : 'multipart/form-data'
            }
        });
        return response
    },
    deleteHorseImage : async (id) =>{
        const {data:response} = await axios.delete(horseImage,{
            params:{
                "image-id":id
            }
        });
        return response
    },
    saveHorseKeyword : async (keyword) =>{
        let formData = new FormData();
        formData.append("keyword", keyword);
        const {data:response} = await axios.post(horseKeywords,formData,{
            headers:{
                'Content-Type' : 'multipart/form-data'
            }
        });
        return response
    },
    deleteHorseKeyword : async (id) =>{
        const {data:response} = await axios.delete(horseKeywords,{
            params:{
                "keyword-id":id
            }
        });
        return response
    },
    saveHorse : async (data) =>{
        const {data:response} = await axios.post(myHorsesUrl,data,{
            headers:{
                'Content-Type' : 'application/json'
            }
        });
        return response
    },
    updateHorse : async (data,id) =>{
        const {data:response} = await axios.put(myHorsesUrl,data,{
            headers:{
                'Content-Type' : 'application/json'
            },
            params:{
                "horse-id":id
            }
        });
        return response
    },
    getHorseDetails : async (id) =>{
        const {data:response} = await axios.get(myHorsesUrl,{
            params:{
                "horse-id":id
            }
        });
        return response
    },
    addHorseToFav : async (id) =>{
        const formData = new FormData();
        formData.append('horse_id',id)
        const {data:response} = await axios.post(favouriteHorsesUrl,formData,{
            headers:{
                'Content-Type' : 'multipart/form-data'
            }
        });
        return response
    },
    deleteHorseFromFav : async (id) =>{
        const {data:response} = await axios.delete(favouriteHorsesUrl,{
            params:{
                "horse-id":id
            }
        });
        return response
    },
    getMatchHorse : async (page=1) =>{
        const {data:response} = await axios.get(matchHorseUrl,{
            params:{
                "page":page
            }
        });
        return response
    },
    likeHorse : async (horseId) =>{
        const {data:response} = await axios.get(likeHorseUrl,{
            params:{
                "horse-id":horseId
            }
        });
        return response
    },
    dislikeHorse : async (horseId) =>{
        const {data:response} = await axios.get(disLikeHorseUrl,{
            params:{
                "horse-id":horseId
            }
        });
        return response
    },
}

export default HorseService;