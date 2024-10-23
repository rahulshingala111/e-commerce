import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import CONSTANTS, { SERVER_MODE } from "./constants"

const ApiCall: AxiosInstance = axios.create({
    baseURL: CONSTANTS.path.server_url + "/api/v1",
    // timeout: 10000,
})

ApiCall.interceptors.request.use((config): InternalAxiosRequestConfig<any> => {
    if (SERVER_MODE === 'UAT') {
        config.headers['ngrok-skip-browser-warning'] = 'true';
    }
    const token = sessionStorage.getItem(CONSTANTS.SESSION_STORAGE.TOKEN)
    if (token) {
        config.headers.Authorization = `${token}`
    }
    return config
})

ApiCall.interceptors.response.use((response): AxiosResponse<any> => {
    if (response?.data?.code === 911) {
        sessionStorage.removeItem(CONSTANTS.SESSION_STORAGE.TOKEN)
        setTimeout(() => {
            window.location.href = '/'
        }, 300);
        return response
    } else {
        return response.data
    }
},
    (error) => {
        return Promise.reject(error)
    })

export default ApiCall