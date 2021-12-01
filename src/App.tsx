import React from "react";
import styled from "styled-components";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "./common/utils";
import BikesList from "./bikes/bikesList";
import SelectedBike from "./bikes/selectedBike";
import BikeForm from "./bikes/bikeForm";
import HomePage from "./home/homePage";
import Login from "./login/login";
import UserProfileForm, { OCASIONS } from "./users/userProfileForm";
import UsersList from "./users/usersList";
import SelectedUser from "./users/selectedUser";
import ReservationsList from "./reservation/reservationsList";
import SelectedReservation from "./reservation/selectedReservation";
import GlobalNotification from "./common/globalNotification";
import PrivateRoute from "./privateRoute";

const App = function (): JSX.Element {
  const { message, type } = useSelector(
    (state: { globalNotification: IGlobalNotification }) =>
      state.globalNotification
  );
  return (
    <Router>
      <AppStyles className="App">
        <main>
          <GlobalNotification message={message} type={type} />
          <Switch>
            <PrivateRoute path={`${ROUTES.NEW_BIKE}`}>
              <BikeForm />
            </PrivateRoute>
            <PrivateRoute path={`${ROUTES.BIKES}/:bikeId/edit`}>
              <BikeForm />
            </PrivateRoute>
            <PrivateRoute path={`${ROUTES.BIKES}/:bikeId`}>
              <SelectedBike />
            </PrivateRoute>
            <PrivateRoute path={ROUTES.BIKES}>
              <BikesList />
            </PrivateRoute>

            <PrivateRoute path={`${ROUTES.RESERVATIONS}/:reservationId`}>
              <SelectedReservation />
            </PrivateRoute>
            <PrivateRoute path={ROUTES.RESERVATIONS}>
              <ReservationsList />
            </PrivateRoute>
            <PrivateRoute
              path={`${ROUTES.USERS}/:userId${ROUTES.RESERVATIONS}/:reservationId`}
            >
              <SelectedReservation />
            </PrivateRoute>
            <PrivateRoute
              path={`${ROUTES.USERS}/:userId${ROUTES.RESERVATIONS}`}
            >
              <ReservationsList />
            </PrivateRoute>
            <PrivateRoute path={`${ROUTES.USERS}/:userId/edit`}>
              <UserProfileForm ocasion={OCASIONS.EDIT} />
            </PrivateRoute>
            <PrivateRoute path={`${ROUTES.USERS}/:userId`}>
              <SelectedUser />
            </PrivateRoute>
            <PrivateRoute path={ROUTES.PROFILE}>
              <SelectedUser />
            </PrivateRoute>
            <PrivateRoute path={ROUTES.NEW_USER}>
              <UserProfileForm ocasion={OCASIONS.CREATE} />
            </PrivateRoute>
            <PrivateRoute path={ROUTES.USERS}>
              <UsersList />
            </PrivateRoute>

            <Route path={ROUTES.SIGNUP}>
              <UserProfileForm ocasion={OCASIONS.SIGNUP} />
            </Route>
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path="/" component={HomePage} />
          </Switch>
        </main>
      </AppStyles>
    </Router>
  );
};

const AppStyles = styled.div`
  height: 100vh;
  width: 100%;
  main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;
export default App;
