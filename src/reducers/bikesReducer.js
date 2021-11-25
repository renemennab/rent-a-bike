const bikesReducer = (bikes = [], action = {}) => {
    const { FETCH_ALL, CREATE, UPDATE, DELETE } = BIKE_REDUCER_OPTIONS
    switch (action.type) {
        case FETCH_ALL:
            return action.payload
        case CREATE:
            return [...bikes, action.payload]
        case UPDATE:
            return bikes.map(bike => bike._id === action.payload._id ? action.payload : bike)
        case DELETE:
            return bikes.filter(bike => bike._id !== action.payload)
        default:
            return bikes
    }
}

export default bikesReducer

export const BIKE_REDUCER_OPTIONS = {
    FETCH_ALL: 'FETCH_ALL',
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
}
