import { combineReducers } from 'redux'
import bikeReducer from './bikesReducer'
import selectedBikeReducer from './selectedBikeReducer'

export default combineReducers({
    bikes: bikeReducer,
    selectedBike: selectedBikeReducer
})
