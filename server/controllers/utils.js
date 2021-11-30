export function checkIfDatesOverlap(
  selectedTimestamps,
  reservationStart,
  reservationEnd
) {
  if (
    (selectedTimestamps.start < reservationEnd &&
      selectedTimestamps.end > reservationEnd) ||
    (selectedTimestamps.end > reservationStart &&
      selectedTimestamps.start < reservationStart)
  ) {
    return true;
  }

  return false;
}

export function getBikeAgregationModel(userId) {
  return [
    {
      $addFields: {
        rateAverage: { $avg: "$ratings.rating" },
        userRating: {
          $filter: {
            input: "$ratings",
            as: "userRating",
            cond: { $eq: ["$$userRating.userId", userId] },
          },
        },
      },
    },
    {
      $addFields: {
        userRatingValue: { $sum: "$userRating.rating" },
      },
    },
    { $unset: ["ratings", "userRating"] },
  ];
}
