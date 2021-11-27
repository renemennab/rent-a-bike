import { combineReducers } from 'redux'
import bikeReducer from './bikesReducer'
import loggedUserReducer from './loggedUser'
import selectedBikeReducer from './selectedBikeReducer'
import selectedTimestampsReducer from './selectedTimestamps'
import selectedUserReducer from './selectedUserReducer'
import usersReducer from './usersReducer'

export default combineReducers({
    bikes: bikeReducer,
    selectedBike: selectedBikeReducer,
    selectedUser: selectedUserReducer,
    selectedTimestamps: selectedTimestampsReducer,
    loggedUser: loggedUserReducer,
    users: usersReducer
})
