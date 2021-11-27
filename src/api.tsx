import axios, { AxiosRequestConfig } from 'axios'
import { set } from 'lodash'

export const API_PATHS = {
    BIKES: 'bikes',
    USER: 'user',
    LOGIN: 'login',
    SIGNUP: 'signup'
}

const isDev = process.env.NODE_ENV === 'development'
const API = axios.create({ baseURL: isDev ? 'http://localhost:5000/' : 'https://bike-rental-manager.herokuapp.com/' })

API.interceptors.request.use((req: AxiosRequestConfig) => {
    const profile = localStorage.getItem('profile')
    if (profile) {
        set(req, 'headers.Authorization', `Bearer ${JSON.parse(profile).token}`)
    }

    return req
})

interface IBikeResponse {
    data: IBike
}

export const fetchBikes = (): Promise<IBikeResponse> => API.get(API_PATHS.BIKES)
export const createBike = (newBike: PostBike): Promise<IBikeResponse> => API.post(API_PATHS.BIKES, newBike)
export const updateBike = (bikeId: string, updatedbike: PostBike): Promise<IBikeResponse> =>
    API.patch(`${API_PATHS.BIKES}/${bikeId}`, updatedbike)
export const deleteBike = (bikeId: string): Promise<Response> => API.delete(`${API_PATHS.BIKES}/${bikeId}`)

interface IUserResponse {
    data: IStorageResult
}

export const fetchUsers = (): Promise<IUserResponse> => API.get(API_PATHS.USER)
export const fetchUser = (userId: string): Promise<IUserResponse> => API.get(`${API_PATHS.USER}/${userId}`)
export const createUser = (newUser: ISignupParams): Promise<{ data: IlocalStorageProfile }> =>
    API.post(`${API_PATHS.USER}/${API_PATHS.SIGNUP}`, newUser)
export const loginUser = (user: ILoginParams): Promise<{ data: IlocalStorageProfile }> =>
    API.post(`${API_PATHS.USER}/${API_PATHS.LOGIN}`, user)
export const updateUser = (userId: string, updateduser: IStorageResult): Promise<IUserResponse> =>
    API.patch(`${API_PATHS.USER}/${userId}`, updateduser)
export const deleteUser = (userId: string): Promise<Response> => API.delete(`${API_PATHS.USER}/${userId}`)
