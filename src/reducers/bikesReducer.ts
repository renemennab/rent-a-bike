export const BIKE_REDUCER_OPTIONS = {
    FETCH_ALL: 'FETCH_ALL',
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE'
}

const optionValues = Object.values(BIKE_REDUCER_OPTIONS)
interface IAction {
    payload: IBike[] | IBike | string
    type: typeof optionValues[number]
}

const defaultAction = { type: '', payload: [] }

const bikesReducer = (bikes: IBike[] = [], action: IAction = defaultAction): IBike[] => {
    const { FETCH_ALL, CREATE, UPDATE, DELETE } = BIKE_REDUCER_OPTIONS
    switch (action.type) {
        case FETCH_ALL:
            return action.payload as IBike[]
        case CREATE:
            return [...bikes, action.payload as IBike]
        case UPDATE:
            return bikes.map(bike => (bike._id === (action.payload as IBike)._id ? (action.payload as IBike) : bike))
        case DELETE:
            return bikes.filter(bike => bike._id !== action.payload)
        default:
            return bikes
    }
}

export default bikesReducer
