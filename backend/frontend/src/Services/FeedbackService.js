import axios from '../Constants/requests';
import { sendFeedbackUrl } from '../Constants/urls';

const FeedbackService = {
    sendFeedback : async (email,message)=>{
    const formData = new FormData();
    formData.append('email',email);
    formData.append('message',message);
    const {data:response} = await axios.post(sendFeedbackUrl,formData);
    return response
},

}

export default FeedbackService;