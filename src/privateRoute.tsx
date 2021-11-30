import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { checkIfTokenIsExpired } from "./common/utils";

const PrivateRoute = function ({ children, ...rest }: RouteProps): JSX.Element {
  const isTokenExpired = checkIfTokenIsExpired();
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={({ location }) =>
        isTokenExpired ? (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
};

export default PrivateRoute;
