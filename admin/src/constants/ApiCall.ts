import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios"

const ApiCall: AxiosInstance = axios.create({
    baseURL: "http://localhost:3002/api/v1/admin",
    timeout: 5000,
})

ApiCall.interceptors.request.use((config): InternalAxiosRequestConfig<any> => {
    const token = sessionStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `${token}`
    }
    return config
})

ApiCall.interceptors.response.use((response): AxiosResponse<any> => {
    return response.data
},
    (error) => {
        return Promise.reject(error)
    })

export default ApiCall