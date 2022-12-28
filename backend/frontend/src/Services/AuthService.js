import axios from '../Constants/requests';
import { loginUrl, verifyOtpUrl,signUpUrl } from '../Constants/urls';
import { getAccessToken,getVerifyStatus } from '../Constants/storage';

const AuthService = {
    loginMethod: async (email,password) => {
        
        const formData = {
            "username":email,
            "password":password,
        };
        const {data:response} = await axios.post(loginUrl,formData);
        return response
    },

    registerMethod: async (email,password)=>{
        const formData = {
            "email":email,
            "password":password,
        };
        const {data:response} = await axios.post(signUpUrl,formData);
        return response
    },

    checkUserAuthenticated: ()=>{
        const getToken = getAccessToken();
        const verified = getVerifyStatus();
        if (getToken === null || getToken.length === 0 || verified=== null || verified===false){
            return false
        }
        return true
    },
    verifyOtpMethod: async (otp)=>{
        const {data:response} = await axios.get(verifyOtpUrl,{
            params:{
                "otp":otp
            }
        });
        return response
    }
};

export default AuthService;