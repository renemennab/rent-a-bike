import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { getLoggedInUser } from "../login/loginHelpers";
import ConfirmationDialog from "../common/confirmationDialog";
import { checkIfTokenIsExpired, ROUTES } from "../common/utils";
import { SELECTED_BIKE_REDUCER_OPTIONS } from "../reducers/selectedBikeReducer";
import { LOGGED_USER_REDUCER_OPTIONS } from "../reducers/loggedUser";
import { SELECTED_USER_REDUCER_OPTIONS } from "../reducers/selectedUserReducer";

interface IProps {
  isNav?: boolean;
}
const OptionsList = function ({ isNav }: IProps): JSX.Element {
  const [showDialog, setShowDialog] = useState(false);
  const [userIsLogged, setUserIsLogged] = useState(false);
  const [userIsManager, setUserIsManager] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: SELECTED_BIKE_REDUCER_OPTIONS.SET_SELECTED_BIKE,
      payload: null,
    });
    dispatch({
      type: SELECTED_USER_REDUCER_OPTIONS.SET_SELECTED_USER,
      payload: null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const user = getLoggedInUser();

    if (user) {
      setUserIsLogged(true);
      if (user.result.isManager) setUserIsManager(true);
      if (checkIfTokenIsExpired(user.token)) {
        handleLogOut();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleLogOut(): void {
    dispatch({ type: LOGGED_USER_REDUCER_OPTIONS.LOGOUT_USER });
    setUserIsLogged?.(false);
    setShowDialog(false);
  }
  return (
    <>
      <StyledOptionsList className={`optionsList ${isNav ? "isNav" : ""}`}>
        {userIsLogged ? (
          <>
            <li className="optionsList--item ">
              <Link to={ROUTES.PROFILE} className="optionsList--item__button ">
                <i className="fas fa-user" /> My Profile
              </Link>
            </li>
            <li className="optionsList--item ">
              <Link to={ROUTES.BIKES} className="optionsList--item__button ">
                <i className="fas fa-bicycle" />
                Bikes
              </Link>
            </li>
            {userIsManager ? (
              <>
                <li className="optionsList--item ">
                  <Link
                    to={ROUTES.USERS}
                    className="optionsList--item__button "
                  >
                    <i className="fas fa-users" /> Users
                  </Link>
                </li>
                <li className="optionsList--item ">
                  <Link
                    to={ROUTES.NEW_BIKE}
                    className="optionsList--item__button "
                  >
                    <i className="fas fa-plus" />
                    Add New Bike
                  </Link>
                </li>
                <li className="optionsList--item ">
                  <Link
                    to={ROUTES.NEW_USER}
                    className="optionsList--item__button "
                  >
                    <i className="fas fa-plus" />
                    Add New User
                  </Link>
                </li>
              </>
            ) : (
              <li className="optionsList--item ">
                <Link
                  to={ROUTES.RESERVATIONS}
                  className="optionsList--item__button "
                >
                  <i className="far fa-calendar-alt" />
                  My Reservations
                </Link>
              </li>
            )}
            <li className="optionsList--item ">
              <button
                type="button"
                onClick={() => setShowDialog(true)}
                className="optionsList--item__button "
              >
                <i className="fas fa-sign-out-alt" />
                Logout
              </button>
            </li>
          </>
        ) : (
          <li className="optionsList--item ">
            <Link to={ROUTES.LOGIN} className="optionsList--item__button ">
              <i className="fas fa-sign-in-alt" />
              Login
            </Link>
          </li>
        )}
      </StyledOptionsList>
      {showDialog ? (
        <ConfirmationDialog
          onCancel={() => setShowDialog(false)}
          onDelete={() => handleLogOut()}
          text="logout"
        />
      ) : null}
    </>
  );
};

export default OptionsList;

OptionsList.defaultProps = {
  isNav: false,
};
const StyledOptionsList = styled.ul`
  padding: 0;
  .optionsList {
    &--item {
      list-style: none;
      &__button {
        width: 300px;
        padding: 20px;
        background: var(--yellow);
        font-weight: 600;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        margin-top: 20px;
        &,
        &:visited {
          color: white;
        }
        i {
          margin-right: 8px;
        }
        &:hover {
          background: var(--red);
        }
      }
    }
  }
  &.isNav {
    .optionsList {
      &--item {
        &__button {
          padding: 10px;
          border-radius: 10px;
          padding: 18px 0;
          border: none;
          background: white;
          text-decoration: none;
          font-size: 18px;
          justify-content: flex-start;

          &,
          &:visited {
            color: var(--dark-blue);
          }
          i {
            color: var(--yellow);
          }
          &:hover {
            background: lightblue;
          }
        }
      }
    }
  }
`;
