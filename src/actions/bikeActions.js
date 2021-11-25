import * as api from '../api'
import { BIKE_REDUCER_OPTIONS } from '../reducers/bikesReducer'

export const getBikes = () => async dispatch => {
    try {
        const { data } = await api.fetchBikes()
        dispatch({ type: BIKE_REDUCER_OPTIONS.FETCH_ALL, payload: data })
    } catch (error) {
        console.log(error.message)
    }
}

export const createBike = (newBike) => async dispatch => {
    try {
        const { data } = await api.createBike(newBike)
        dispatch({ type: BIKE_REDUCER_OPTIONS.CREATE, payload: data })
    } catch (error) {
        console.log(error.message)
    }
}
