import { combineReducers } from 'redux'
import bikeReducer from './bikesReducer'
import loggedUserReducer from './loggedUser'
import selectedBikeReducer from './selectedBikeReducer'

export default combineReducers({
    bikes: bikeReducer,
    selectedBike: selectedBikeReducer,
    loggedUser: loggedUserReducer
})
