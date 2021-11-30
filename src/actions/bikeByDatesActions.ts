import { Dispatch } from "redux";
import * as api from "../api";
import { BIKES_BY_DATES_REDUCER_OPTIONS } from "../reducers/bikesByDatesReducer";

export const getBikesByDates =
  (dates: ITimestamps) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const { data } = await api.fetchBikesByDates(dates);
      dispatch({
        type: BIKES_BY_DATES_REDUCER_OPTIONS.SET_BIKES_BY_DATES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export default getBikesByDates;
