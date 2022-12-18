import axios from 'axios';
import { clearStorage, getAccessToken,getCSRF } from './storage';
import  {api} from  './urls';

const ax = axios.create({
    baseURL: api
});


ax.interceptors.request.use((config) => {
    var CSRF_TOKEN = getCSRF("csrftoken");
    const accessToken = getAccessToken('token');
    if (accessToken) config.headers.Authorization = `Token ${accessToken}`;
    config.headers['X-CSRFToken'] = CSRF_TOKEN;
    config.headers['Content-Type'] = 'application/json';
    return config;
});


ax.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { config: originalRequest, response } = error;

        if (
            !originalRequest._retry &&
            response?.status === 401
        ) {
            originalRequest._retry = true;
            // Logout;
            clearStorage();
        }

        return Promise.reject(error);
    }
);

export default ax;