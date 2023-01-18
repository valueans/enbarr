import axios from "../Constants/requests";
import { paymentMethodsUrl, plansUrl, setupIntentUrl, updagradeSubscriptionUrl } from "../Constants/urls";

const PaymentServices = {
    getAllSubscriptionPlans : async ()=>{
        const {data:response} = await axios.get(plansUrl);
        return response
    },
    getSetupIntent : async ()=>{
        const {data:response} = await axios.get(setupIntentUrl);
        return response
    },
    getPaymentMethods : async ()=>{
        const {data:response} = await axios.get(paymentMethodsUrl);
        return response
    },
    deletePaymentMethods : async (id)=>{
        const {data:response} = await axios.delete(paymentMethodsUrl,{
            params:{
                "card-id":id
            }
        });
        return response
    },
    upgradeSubscription : async (id)=>{
        const formData = new FormData();
        formData.append("plan-id",id)
        const {data:response} = await axios.post(updagradeSubscriptionUrl,formData);
        return response
    }


}
export default PaymentServices;