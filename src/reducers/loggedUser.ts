export const LOGGED_USER_REDUCER_OPTIONS = {
    LOGIN_USER: 'LOGIN_USER',
    LOGOUT_USER: 'LOGOUT_USER'
}

const optionValues = Object.values(LOGGED_USER_REDUCER_OPTIONS)

interface IAction {
    payload: IUser | null
    type: typeof optionValues[number]
}

const defaultAction = { type: '', payload: null }

const loggedUserReducer = (loggedUser: IUser | null = null, action: IAction = defaultAction): IUser | null => {
    const { LOGIN_USER, LOGOUT_USER } = LOGGED_USER_REDUCER_OPTIONS
    switch (action.type) {
        case LOGIN_USER:
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))
            return action.payload
        case LOGOUT_USER:
            localStorage.clear()
            return null
        default:
            return loggedUser
    }
}

export default loggedUserReducer
