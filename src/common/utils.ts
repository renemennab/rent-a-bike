import { AxiosError } from "axios";
import { RouteComponentProps } from "react-router-dom";
import { Dispatch } from "redux";
import jwtDecode from "jwt-decode";
import setGlobalNotification from "../actions/globalNotificationActions";

export function handleGoBack(history: RouteComponentProps["history"]): void {
  const currentUrl = history.location.pathname;
  const splitUrl = currentUrl.split("/");
  splitUrl.pop();
  const newUrl = splitUrl.join("/");
  history.push(newUrl);
}

export const checkIfFilterMatchesBike = (
  bike: IBike,
  searchFilter: string
): boolean => {
  if (!searchFilter) return true;
  const { model, color, location } = bike;
  const matchingValues = [model, color, location].filter((value) =>
    value?.toString().toLowerCase().includes(searchFilter.toLowerCase())
  );
  if (matchingValues.length) return true;
  return false;
};

export function handleErrors(dispatch: Dispatch, error: AxiosError): void {
  if (error.response) {
    const { data, status } = error.response;
    setGlobalNotification(dispatch, `${status}: ${data}`, "error");
  } else {
    setGlobalNotification(dispatch, error.message, "error");
  }
}

const baseUrl = "/#/";

export const ROUTES = {
  LOGIN: `${baseUrl}login`,
  SIGNUP: `${baseUrl}signup`,
  PROFILE: `${baseUrl}profile`,
  NEW_BIKE: `${baseUrl}newBike`,
  NEW_USER: `${baseUrl}newUser`,
  BIKES: `${baseUrl}bikes`,
  USERS: `${baseUrl}users`,
  RESERVATIONS: `${baseUrl}reservations`,
};

export const SESSION_DATA = {
  FIRST_NAME: "firstName",
  LAST_NAME: "lastName",
  EMAIL: "email",
  ID: "_id",
  IS_MANAGER: "isManager",
  RESULT: "result",
  TOKEN: "token",
  PROFILE: "profile",
};

export function getLoggedInUser(): IlocalStorageProfile {
  const profileString = window.localStorage.getItem(SESSION_DATA.PROFILE);
  const profile = profileString ? JSON.parse(profileString) : null;
  return profile;
}

interface IDecodedToken {
  name: string;
  exp: number;
}

export function checkIfTokenIsExpired(): boolean {
  const token = getLoggedInUser()?.token;
  if (!token) return true;

  const decodedToken = jwtDecode<IDecodedToken>(token);
  const timeNowInMilisseconds = new Date().getTime();
  const tokenExpireDateInMilisseconds = decodedToken.exp * 1000;
  if (tokenExpireDateInMilisseconds < timeNowInMilisseconds) return true;
  return false;
}
