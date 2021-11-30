import { Dispatch } from "redux";
import { RouteComponentProps } from "react-router-dom";
import { AxiosError } from "axios";
import * as api from "../api";
import { LOGGED_USER_REDUCER_OPTIONS } from "../reducers/loggedUser";
import { ROUTES } from "../utils";
import { USERS_REDUCER_OPTIONS } from "../reducers/usersReducer";
import { SELECTED_USER_REDUCER_OPTIONS } from "../reducers/selectedUserReducer";
import { SEARCH_FILTERS_REDUCER_OPTIONS } from "../reducers/searchFiltersReducer";
import setGlobalNotification from "./globalNotificationActions";
import { handleErrors } from "../common/utils";

export const loginUser =
  (
    params: ILoginParams,
    history: RouteComponentProps["history"],
    setUserNotFound: (status: boolean) => void
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const { data } = await api.loginUser(params);
      dispatch({ type: LOGGED_USER_REDUCER_OPTIONS.LOGIN_USER, payload: data });
      setGlobalNotification(
        dispatch,
        `Hello, ${data.result.firstName}`,
        "success"
      );
      history.push("/");
    } catch (error) {
      setUserNotFound(true);
    }
  };

export const createUser =
  (
    params: ISignupParams,
    history: RouteComponentProps["history"],
    login?: boolean
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const { data } = await api.createUser(params);
      dispatch({ type: USERS_REDUCER_OPTIONS.CREATE, payload: [data.result] });
      if (login) {
        dispatch({
          type: LOGGED_USER_REDUCER_OPTIONS.LOGIN_USER,
          payload: data,
        });
        history.push("/");
        setGlobalNotification(
          dispatch,
          `Welcome ${data.result.firstName}`,
          "success"
        );
      } else {
        history.push(ROUTES.USERS);
        setGlobalNotification(dispatch, `User created sucessfuly`, "success");
      }
    } catch (error) {
      handleErrors(dispatch, error as AxiosError);
    }
  };

export const fetchUsers =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const { data } = await api.fetchUsers();
      dispatch({ type: USERS_REDUCER_OPTIONS.FETCH_ALL, payload: data });
    } catch (error) {
      handleErrors(dispatch, error as AxiosError);
    }
  };

export const fetchUser =
  (userId: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const { data } = await api.fetchUser(userId);
      dispatch({
        type: SELECTED_USER_REDUCER_OPTIONS.SET_SELECTED_USER,
        payload: data,
      });
    } catch (error) {
      handleErrors(dispatch, error as AxiosError);
    }
  };

export const updateUser =
  (updatedUser: IUpdateUserParams, history: RouteComponentProps["history"]) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const { data } = await api.updateUser(updatedUser);
      dispatch({ type: USERS_REDUCER_OPTIONS.UPDATE, payload: [data] });
      dispatch({
        type: SELECTED_USER_REDUCER_OPTIONS.SET_SELECTED_USER,
        payload: data,
      });
      history.push(`${ROUTES.USERS}/${updatedUser.userId}`);
      setGlobalNotification(dispatch, `User updated sucessfuly`, "success");
    } catch (error) {
      handleErrors(dispatch, error as AxiosError);
    }
  };

export const deleteUser =
  (user: IStorageResult) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      await api.deleteUser(user._id);
      dispatch({ type: USERS_REDUCER_OPTIONS.DELETE, payload: [user] });
      setGlobalNotification(dispatch, `User deleted sucessfuly`, "success");
    } catch (error) {
      handleErrors(dispatch, error as AxiosError);
    }
  };

export const setShowUsersWithReservations =
  (status: boolean) =>
  (dispatch: Dispatch): void => {
    const { SHOW_USERS_WITH_RESERVATIONS } = SEARCH_FILTERS_REDUCER_OPTIONS;

    if (status) {
      window.sessionStorage.removeItem(SHOW_USERS_WITH_RESERVATIONS);
    } else {
      window.sessionStorage.setItem(SHOW_USERS_WITH_RESERVATIONS, "true");
    }
    dispatch({
      type: SHOW_USERS_WITH_RESERVATIONS,
      payload: { showUserWithReservation: status },
    });
  };
