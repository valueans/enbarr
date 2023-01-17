import axios from '../Constants/requests';
import { loginUrl, verifyOtpUrl,signUpUrl, userProfileUrl, resetPasswordUrl, deleteUserUrl, resetEmailUrl, sendOtpUrl } from '../Constants/urls';
import { getAccessToken,getUserProfile,getVerifyStatus } from '../Constants/storage';

const AuthService = {
    loginMethod: async (email,password) => {
        
        const formData = {
            "username":email,
            "password":password,
        };
        const {data:response} = await axios.post(loginUrl,formData,{
            headers:{
                'Content-Type' : 'multipart/form-data'
            }
        });
        return response
    },

    registerMethod: async (email,password)=>{
        const formData = new FormData();
        formData.append('email',email)
        formData.append('password',password)
        const {data:response} = await axios.post(signUpUrl,formData,{
            headers:{
                'Content-Type' : 'multipart/form-data'
            }
        });
        return response
    },

    checkUserAuthenticated: ()=>{
        const getToken = getAccessToken();
        const verified = getVerifyStatus();
        if (getToken === null || getToken.length === 0 || verified=== null || verified==="false"){
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
    },
    getUserProfile: async (id)=>{
        if(id){
            const {data:response} = await axios.get(userProfileUrl,{
                params:{
                    id:id
                }
            });
            return response
        }
        else{
            const {data:response} = await axios.get(userProfileUrl);
            return response
        }
    },
    udpateUserProfile: async (data)=>{
        const default_user_profile = await getUserProfile();

        const formData = new FormData();
        if (default_user_profile.first_name !== data.first_name){
            formData.append('first_name',data.first_name)
        }
        if (default_user_profile.last_name !== data.last_name){
            formData.append('last_name',data.last_name)
        }
        if (default_user_profile.bio !== data.bio){
            formData.append('bio',data.bio)
        }
        if (default_user_profile.address !== data.address){
            formData.append('address',data.address)
        }
        if (default_user_profile.city !== data.city){
            formData.append('city',data.city)
        }
        if (default_user_profile.zipcode !== data.zipcode){
            formData.append('zipcode',data.zipcode)
        }
        if (default_user_profile.state !== data.state){
            formData.append('state',data.state)
        }
        if (default_user_profile.country !== data.country){
            formData.append('country',data.country)
        }
        if (default_user_profile.profile_photo !== data.profile_photo){
            formData.append('profile_photo',data.profile_photo,data.profile_photo.name)
        }
        if (default_user_profile.user.email !== data.user.email){
            formData.append('email',data.user.email)
        }
        const {data:response} = await axios.put(userProfileUrl,formData);
        return response
    },
    updateNotificationStatus: async (status)=>{
        const formData = new FormData();
        formData.append('receive_notifications',status)
        const {data:response} = await axios.put(userProfileUrl,formData);
        return response
    },
    changePassword: async (password1,password2)=>{
        const formData = new FormData();
        formData.append('password1',password1);
        formData.append('password2',password2);
        const {data:response} = await axios.post(resetPasswordUrl,formData);
        return response
    },
    deleteUser: async ()=>{
        const {data:response} = await axios.get(deleteUserUrl);
        return response
    },
    resetEmail: async (email)=>{
        const {data:response} = await axios.get(resetEmailUrl,{
            params:{
                email:email
            }
        });
        return response
    },
    sendOtp: async ()=>{
        const {data:response} = await axios.get(sendOtpUrl);
        return response
    },

};

export default AuthService;