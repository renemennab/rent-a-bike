const selectedBikeReducer = (selectedBike = {}, action = {}) => {
    const { SET_SELECTED_BIKE } = SELECTED_BIKE_REDUCER_OPTIONS
    switch (action.type) {
        case SET_SELECTED_BIKE:
            return action.payload
        default:
            return selectedBike
    }
}

export default selectedBikeReducer

export const SELECTED_BIKE_REDUCER_OPTIONS = {
    SET_SELECTED_BIKE: 'SET_SELECTED_BIKE'
}
