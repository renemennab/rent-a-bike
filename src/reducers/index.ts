import { combineReducers } from "redux";
import bikesByDatesReducer from "./bikesByDatesReducer";
import bikeReducer from "./bikesReducer";
import selectedBikeReducer from "./selectedBikeReducer";
import reservationReducer from "./reservationsReducer";
import selectedReservationReducer from "./selectedReservationReducer";
import loggedUserReducer from "./loggedUser";
import selectedTimestampsReducer from "./selectedTimestamps";
import selectedUserReducer from "./selectedUserReducer";
import usersReducer from "./usersReducer";
import searchFiltersReducer from "./searchFiltersReducer";

export default combineReducers({
  bikes: bikeReducer,
  selectedBike: selectedBikeReducer,
  reservations: reservationReducer,
  selectedReservation: selectedReservationReducer,
  selectedUser: selectedUserReducer,
  selectedTimestamps: selectedTimestampsReducer,
  loggedUser: loggedUserReducer,
  users: usersReducer,
  bikesByDates: bikesByDatesReducer,
  searchFilters: searchFiltersReducer,
});
