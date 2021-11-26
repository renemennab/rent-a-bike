import { Dispatch } from 'redux'
import { RouteComponentProps } from 'react-router-dom'
import * as api from '../api'
import { LOGGED_USER_REDUCER_OPTIONS } from '../reducers/loggedUser'

export const loginUser =
    (params: ILoginParams, history: RouteComponentProps['history']) =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const { data } = await api.loginUser(params)
            dispatch({ type: LOGGED_USER_REDUCER_OPTIONS.LOGIN_USER, payload: data })
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }

export const signUpUser =
    (params: ISignupParams, history: RouteComponentProps['history']) =>
    async (dispatch: Dispatch): Promise<void> => {
        try {
            const { data } = await api.createUser(params)
            dispatch({ type: LOGGED_USER_REDUCER_OPTIONS.LOGIN_USER, payload: data })
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }
