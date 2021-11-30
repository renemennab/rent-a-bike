import { AxiosError } from "axios";
import { RouteComponentProps } from "react-router-dom";
import { Dispatch } from "redux";
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
