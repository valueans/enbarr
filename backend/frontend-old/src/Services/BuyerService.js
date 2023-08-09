import axios from "../Constants/requests"
import { userSearchSaveUrl } from "../Constants/urls";


const BuyerService = {

    getSaveBuyersSearch : async ()=>{
        const {data:response} = await axios.get(userSearchSaveUrl);
        return response
    },
    saveSaveBuyersSearch : async (data)=>{
        const {data:response} = await axios.post(userSearchSaveUrl,data,{
            headers:{
                'Content-Type' : 'application/json'
            }
        });
        return response
    }
}

export default BuyerService;