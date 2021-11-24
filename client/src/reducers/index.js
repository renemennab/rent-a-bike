import { combineReducers } from 'redux'
import bikeReducer from './bikesReducer'

export default combineReducers({
    bikes: bikeReducer
})
