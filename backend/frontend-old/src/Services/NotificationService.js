import axios from '../Constants/requests';
import { myNotificationsUrl, readAllNotificationsUrl } from '../Constants/urls';
import qs from "qs";


const NotificationsService = {
    getMyNotifications : async (page=1) => {
        const {data:response} = await axios.get(myNotificationsUrl+`?page=${page}`);
        return response
    },
    updateNotificationStatus : async (id) => {
        const data = {
            "read_status":true,
        }
        const {data:response} = await axios.put(myNotificationsUrl+`?notification-id=${id}`,{
        data:data,
        paramsSerializer: params => {
            return qs.stringify(params)
        }
    });
        return response
    },
    readAllNotifications : async () => {
        const {data:response} = await axios.post(readAllNotificationsUrl);
        return response
    },
    deleteNotification : async (id) => {
        const {data:response} = await axios.delete(myNotificationsUrl+`?notification-id=${id}`);
        return response
    },
}


export default NotificationsService;