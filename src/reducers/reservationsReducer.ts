export const RESERVATION_REDUCER_OPTIONS = {
    FETCH_ALL: 'FETCH_ALL_RESERVATIONS',
    CREATE: 'CREATE_RESERVATION',
    UPDATE: 'UPDATE_RESERVATION',
    DELETE: 'DELETE_RESERVATION'
}

const optionValues = Object.values(RESERVATION_REDUCER_OPTIONS)
interface IAction {
    payload: IReservation[]
    type: typeof optionValues[number]
}

const defaultAction = { type: '', payload: [] }

const reservationsReducer = (reservations: IReservation[] = [], action: IAction = defaultAction): IReservation[] => {
    const { FETCH_ALL, CREATE, UPDATE, DELETE } = RESERVATION_REDUCER_OPTIONS
    switch (action.type) {
        case FETCH_ALL:
            return action.payload
        case CREATE:
            return [...reservations, action.payload[0]]
        case UPDATE:
            return reservations.map(reservation =>
                reservation._id === action.payload[0]._id ? action.payload[0] : reservation
            )
        case DELETE:
            return reservations.filter(reservation => reservation._id !== action.payload[0]._id)
        default:
            return reservations
    }
}

export default reservationsReducer
