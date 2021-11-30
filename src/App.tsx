import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "./utils";
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
            <Route path={`${ROUTES.NEW_BIKE}`} component={BikeForm} />
            <Route path={`${ROUTES.BIKES}/:bikeId/edit`} component={BikeForm} />
            <Route path={`${ROUTES.BIKES}/:bikeId`} component={SelectedBike} />
            <Route path={ROUTES.BIKES} component={BikesList} />
            <Route
              path={`${ROUTES.RESERVATIONS}/:reservationId`}
              component={SelectedReservation}
            />
            <Route path={ROUTES.RESERVATIONS} component={ReservationsList} />
            <Route
              path={`${ROUTES.USERS}/:userId${ROUTES.RESERVATIONS}/:reservationId`}
              component={SelectedReservation}
            />
            <Route
              path={`${ROUTES.USERS}/:userId${ROUTES.RESERVATIONS}`}
              component={ReservationsList}
            />
            <Route path={`${ROUTES.USERS}/:userId/edit`}>
              <UserProfileForm ocasion={OCASIONS.EDIT} />
            </Route>
            <Route path={`${ROUTES.USERS}/:userId`} component={SelectedUser} />
            <Route path={ROUTES.PROFILE} component={SelectedUser} />
            <Route path={ROUTES.NEW_USER}>
              <UserProfileForm ocasion={OCASIONS.CREATE} />
            </Route>
            <Route path={ROUTES.USERS} component={UsersList} />
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
