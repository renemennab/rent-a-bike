import axios, { AxiosRequestConfig } from 'axios'
import { set } from 'lodash'
import API_PATHS from './pathConstants'

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
export const fetchBike = (bikeId: string): Promise<IBikeResponse> => API.get(`${API_PATHS.BIKES}/${bikeId}`)
export const createBike = (newBike: PostBike): Promise<IBikeResponse> => API.post(API_PATHS.BIKES, newBike)
export const updateBike = (bikeId: string, updatedbike: PostBike): Promise<IBikeResponse> =>
    API.patch(`${API_PATHS.BIKES}/${bikeId}`, updatedbike)
export const deleteBike = (bikeId: string): Promise<Response> => API.delete(`${API_PATHS.BIKES}/${bikeId}`)

interface IReservationResponse {
    data: IReservation
}

export const fetchReservations = (): Promise<IReservationResponse> => API.get(API_PATHS.RESERVATIONS)
export const fetchReservation = (reservationId: string): Promise<IReservationResponse> =>
    API.get(`${API_PATHS.RESERVATIONS}/${reservationId}`)
export const createReservation = (newReservation: PostReservation): Promise<IReservationResponse> =>
    API.post(API_PATHS.RESERVATIONS, newReservation)
export const updateReservation = (
    reservationId: string,
    updatedreservation: PostReservation
): Promise<IReservationResponse> => API.patch(`${API_PATHS.RESERVATIONS}/${reservationId}`, updatedreservation)
export const deleteReservation = (reservationId: string): Promise<Response> =>
    API.delete(`${API_PATHS.RESERVATIONS}/${reservationId}`)

interface IUserResponse {
    data: IStorageResult
}

export const fetchUsers = (): Promise<IUserResponse> => API.get(API_PATHS.USER)
export const fetchUser = (userId: string): Promise<IUserResponse> => API.get(`${API_PATHS.USER}/${userId}`)
export const createUser = (newUser: ISignupParams): Promise<{ data: IlocalStorageProfile }> =>
    API.post(`${API_PATHS.USER}/${API_PATHS.SIGNUP}`, newUser)
export const loginUser = (user: ILoginParams): Promise<{ data: IlocalStorageProfile }> =>
    API.post(`${API_PATHS.USER}/${API_PATHS.LOGIN}`, user)
export const updateUser = (updateduser: IUpdateUserParams): Promise<IUserResponse> =>
    API.patch(`${API_PATHS.USER}/${updateduser.userId}`, updateduser)
export const deleteUser = (userId: string): Promise<Response> => API.delete(`${API_PATHS.USER}/${userId}`)
