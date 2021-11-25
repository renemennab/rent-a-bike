const bikesReducer = (bikes = [], action = {}) => {
    const { FETCH_ALL, CREATE } = BIKE_REDUCER_OPTIONS
    switch (action.type) {
        case FETCH_ALL:
            return action.payload
        case CREATE:
            return [...bikes, action.payload]
        default:
            return bikes
    }
}

export default bikesReducer

export const BIKE_REDUCER_OPTIONS = {
    FETCH_ALL: 'FETCH_ALL',
    CREATE: 'CREATE'
}
