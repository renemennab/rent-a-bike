import axios from 'axios'

export const API_PATHS = {
    BIKES: 'bikes',
    USER: 'user',
    LOGIN: 'login',
    SIGNUP: 'signup'
}

const isDev = process.env.NODE_ENV === 'development'
const API = axios.create({ baseURL: isDev ? 'http://localhost:5000/' : 'https://bike-rental-manager.herokuapp.com/' })
interface IBikeResponse {
    data: IBike
}

export const fetchBikes = (): Promise<IBikeResponse> => API.get(API_PATHS.BIKES)
export const createBike = (newBike: PostBike): Promise<IBikeResponse> => API.post(API_PATHS.BIKES, newBike)
export const updateBike = (bikeId: string, updatedbike: PostBike): Promise<IBikeResponse> =>
    API.patch(`${API_PATHS.BIKES}/${bikeId}`, updatedbike)
export const deleteBike = (bikeId: string): Promise<Response> => API.delete(`${API_PATHS.BIKES}/${bikeId}`)

interface IUserResponse {
    data: IUser
}

export const createUser = (newUser: ISignupParams): Promise<IUserResponse> =>
    API.post(`${API_PATHS.USER}/${API_PATHS.SIGNUP}`, newUser)
export const loginUser = (user: ILoginParams): Promise<IUserResponse> =>
    API.post(`${API_PATHS.USER}/${API_PATHS.LOGIN}`, user)
