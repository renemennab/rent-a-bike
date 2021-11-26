export const USERS_REDUCER_OPTIONS = {
    FETCH_ALL: 'FETCH_ALL',
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE'
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
            return users.map(updatedUser =>
                updatedUser._id === action.payload[0]._id ? action.payload[0] : updatedUser
            )
        case DELETE:
            return users.filter(deletedUser => deletedUser._id !== action.payload[0]._id)
        default:
            return users
    }
}

export default usersReducer