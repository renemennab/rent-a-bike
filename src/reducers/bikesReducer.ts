export const BIKE_REDUCER_OPTIONS = {
    FETCH_ALL: 'FETCH_ALL_BIKES',
    CREATE: 'CREATE_BIKE',
    UPDATE: 'UPDATE_BIKE',
    DELETE: 'DELETE_BIKE'
}

const optionValues = Object.values(BIKE_REDUCER_OPTIONS)
interface IAction {
    payload: IBike[]
    type: typeof optionValues[number]
}

const defaultAction = { type: '', payload: [] }

const bikesReducer = (bikes: IBike[] = [], action: IAction = defaultAction): IBike[] => {
    const { FETCH_ALL, CREATE, UPDATE, DELETE } = BIKE_REDUCER_OPTIONS
    switch (action.type) {
        case FETCH_ALL:
            return action.payload
        case CREATE:
            return [...bikes, action.payload[0]]
        case UPDATE:
            return bikes.map(bike => (bike._id === action.payload[0]._id ? action.payload[0] : bike))
        case DELETE:
            return bikes.filter(bike => bike._id !== action.payload[0]._id)
        default:
            return bikes
    }
}

export default bikesReducer
