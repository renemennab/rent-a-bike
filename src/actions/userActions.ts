import { Dispatch } from 'redux'
import { RouteComponentProps } from 'react-router-dom'
import * as api from '../api'
import { LOGGED_USER_REDUCER_OPTIONS } from '../reducers/loggedUser'
import { ROUTES } from '../utils'
import { USERS_REDUCER_OPTIONS } from '../reducers/usersReducer'

export const loginUser =
    (params: ILoginParams, history: RouteComponentProps['history'], setUserNotFound: (status: boolean) => void) =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const { data } = await api.loginUser(params)
            dispatch({ type: LOGGED_USER_REDUCER_OPTIONS.LOGIN_USER, payload: data })
            history.push('/')
        } catch (error) {
            setUserNotFound(true)
            console.log(error)
        }
    }

export const createUser =
    (params: ISignupParams, history: RouteComponentProps['history'], login?: boolean) =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const { data } = await api.createUser(params)
            if (login) {
                dispatch({ type: LOGGED_USER_REDUCER_OPTIONS.LOGIN_USER, payload: data })
                dispatch({ type: USERS_REDUCER_OPTIONS.CREATE, payload: [data] })
                history.push('/')
            } else {
                history.push(ROUTES.USERS)
            }
        } catch (error) {
            console.log(error)
        }
    }

export const fetchUsers =
    () =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const { data } = await api.fetchUsers()
            dispatch({ type: USERS_REDUCER_OPTIONS.FETCH_ALL, payload: data })
        } catch (error) {
            console.log(error)
        }
    }
