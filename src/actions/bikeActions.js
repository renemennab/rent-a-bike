import * as api from '../api'

export const getBikes = () => async dispatch => {
    try {
        const { data } = await api.fetchBikes()
        dispatch({ type: 'FETCH_ALL', payload: data })
    } catch (error) {
        console.log(error.message)
    }
}

export const createBike = (newBike) => async dispatch => {
    try {
        const { data } = await api.createBike(newBike)
        dispatch({ type: 'CREATE', payload: data })
    } catch (error) {
        console.log(error.message)
    }
}
