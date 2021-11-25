import axios from 'axios'

export const API_PATHS = {
    BIKES: 'bikes',
    USERS: 'users',
    LOGIN: 'login'
}

const baseUrl = 'http://localhost:5000/'
interface IResponse {
    data: IBike
}
export const fetchBikes = (): Promise<IResponse> => axios.get(baseUrl + API_PATHS.BIKES)
export const createBike = (newBike: PostBike): Promise<IResponse> => axios.post(baseUrl + API_PATHS.BIKES, newBike)
export const updateBike = (bikeId: string, updatedbike: PostBike): Promise<IResponse> =>
    axios.patch(`${baseUrl + API_PATHS.BIKES}/${bikeId}`, updatedbike)
export const deleteBike = (bikeId: string): Promise<Response> => axios.delete(`${baseUrl + API_PATHS.BIKES}/${bikeId}`)
