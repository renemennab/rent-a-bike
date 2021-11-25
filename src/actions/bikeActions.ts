import { Dispatch } from 'redux'
import * as api from '../api'
import { BIKE_REDUCER_OPTIONS } from '../reducers/bikesReducer'

export const getBikes =
    () =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const { data } = await api.fetchBikes()
            dispatch({ type: BIKE_REDUCER_OPTIONS.FETCH_ALL, payload: data })
        } catch (error) {
            console.log(error)
        }
    }

export const createBike =
    (newBike: PostBike) =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const { data } = await api.createBike(newBike)
            dispatch({ type: BIKE_REDUCER_OPTIONS.CREATE, payload: data })
        } catch (error) {
            console.log(error)
        }
    }

export const updateBike =
    (bikeId: string, updatedBike: PostBike) =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const { data } = await api.updateBike(bikeId, updatedBike)
            dispatch({ type: BIKE_REDUCER_OPTIONS.UPDATE, payload: data })
        } catch (error) {
            console.log(error)
        }
    }

export const deleteBike =
    (bikeId: string) =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            await api.deleteBike(bikeId)
            dispatch({ type: BIKE_REDUCER_OPTIONS.DELETE, payload: bikeId })
        } catch (error) {
            console.log(error)
        }
    }
