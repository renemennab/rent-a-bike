import React, { useState } from "react";

import styled from "styled-components";

interface IProps {
  reservations: IReservation[];
}
const UserReservationList = function ({ reservations }: IProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <StyledUserReservationList className="userReservationList">
      <button
        className="userReservationList--reservationsBtn"
        type="button"
        onClick={handleOpen}
      >
        {isOpen ? (
          <i className="fas fa-chevron-up" />
        ) : (
          <i className="fas fa-chevron-down" />
        )}
      </button>
      <div className="userReservationList--reservationsBtn__times">
        {isOpen
          ? reservations.map((reservation) => (
              <div
                className="userReservationList--reservationsBtn__times--container"
                key={reservation._id}
              >
                <p>
                  <strong>From: </strong>
                  {new Date(reservation.startTimestamp).toLocaleString()}
                </p>
                <p>
                  <strong>To: </strong>
                  {new Date(reservation.endTimestamp).toLocaleString()}
                </p>
              </div>
            ))
          : null}
      </div>
    </StyledUserReservationList>
  );
};

export default UserReservationList;

const StyledUserReservationList = styled.div`
  flex-grow: 1;
  width: 100%;

  .userReservationList {
    &--reservationsBtn {
      border: none;
      background: var(--light-blue);
      padding: 10px 0;
      font-weight: 400;
      width: 100%;
      &__times {
        &--container {
          padding: 5px 0;
          border-top: 1px solid var(--gray);
          &:first-child {
            border: none;
          }
        }
        strong {
          color: var(--dark-blue);
          &:last-child {
            margin-left: 10px;
          }
        }
      }
    }
  }
`;
