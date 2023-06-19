import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { checkIfTokenIsExpired } from "./common/utils";

const PrivateRoute = function ({ children, ...rest }: RouteProps): JSX.Element {
  const isTokenExpired = checkIfTokenIsExpired();
  if (isTokenExpired) {
    return (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    );
  }
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Route exact path="/" {...rest}>
      {isTokenExpired ? <Redirect to="/dashboard" /> : children}
    </Route>
  );
};

export default PrivateRoute;
