import { combineReducers } from 'redux'
import bikeReducer from './bikesReducer'
import loggedUserReducer from './loggedUser'
import selectedBikeReducer from './selectedBikeReducer'
import usersReducer from './usersReducer'

export default combineReducers({
    bikes: bikeReducer,
    selectedBike: selectedBikeReducer,
    loggedUser: loggedUserReducer,
    users: usersReducer
})
