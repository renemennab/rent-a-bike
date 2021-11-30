import React from "react";

import { ListCard, CardHeading, CardSpan, CardLink } from "../common/listCard";

interface IProps {
  linkUrl: string;
  reservationInfo: IReservation;
}

const ReservationCard = function ({
  linkUrl,
  reservationInfo,
}: IProps): JSX.Element {
  return (
    <ListCard className="user--reservationCard">
      <CardLink className="user--reservationCard__container" to={linkUrl}>
        <CardHeading className="user--reservationCard__container--id">
          {reservationInfo.bikeInfo.model}
        </CardHeading>
        <CardSpan>Location: {reservationInfo.bikeInfo.location}</CardSpan>
        <CardSpan>
          From: {new Date(reservationInfo.startTimestamp).toLocaleString()}
        </CardSpan>
        <CardSpan>
          To: {new Date(reservationInfo.endTimestamp).toLocaleString()}
        </CardSpan>
      </CardLink>
    </ListCard>
  );
};

export default ReservationCard;
