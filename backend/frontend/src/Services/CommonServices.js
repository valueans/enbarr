import axios from '../Constants/requests';
import { aboutUsUrl, faqUrl, privacyPolicyUrl, socialLinksUrl, termsAndConditionUrl } from '../Constants/urls';


const CommonServices = {
    getFaq : async ()=>{
        const response = await axios.get(faqUrl);
        return response
    },
    getSocialLinks : async ()=>{
        const response = await axios.get(socialLinksUrl);
        return response
    },
    getAboutUs : async ()=>{
        const response = await axios.get(aboutUsUrl);
        return response
    },
    getTermsAndCondition : async ()=>{
        const response = await axios.get(termsAndConditionUrl);
        return response
    },
    getPrivacyPolicy : async ()=>{
        const response = await axios.get(privacyPolicyUrl);
        return response
    }
}

export default CommonServices;