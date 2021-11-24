import axios from 'axios'

const url = 'http://localhost:5000/bikes'

export const fetchBikes = (): Promise<Response> => axios.get(url)
export const createBike = (newBike: IBike): Promise<Response> => axios.post(url, newBike)
