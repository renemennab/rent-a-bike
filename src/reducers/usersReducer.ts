export const USERS_REDUCER_OPTIONS = {
    FETCH_ALL: 'FETCH_ALL_USERS',
    CREATE: 'CREATE_USER',
    UPDATE: 'UPDATE_USER',
    DELETE: 'DELETE_USER'
}

const optionValues = Object.values(USERS_REDUCER_OPTIONS)

interface IAction {
    payload: IStorageResult[]
    type: typeof optionValues[number]
}

const defaultAction = { type: '', payload: [] }

const usersReducer = (users: IStorageResult[] = [], action: IAction = defaultAction): IStorageResult[] => {
    const { FETCH_ALL, CREATE, UPDATE, DELETE } = USERS_REDUCER_OPTIONS
    switch (action.type) {
        case FETCH_ALL:
            return action.payload
        case CREATE:
            return [...users, action.payload[0]]
        case UPDATE:
            return users.map(user => (user._id === action.payload[0]._id ? action.payload[0] : user))
        case DELETE:
            return users.filter(user => user._id !== action.payload[0]._id)
        default:
            return users
    }
}

export default usersReducer
