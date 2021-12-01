export function getBikeTestData(): IBike {
  return {
    model: "bike model",
    color: "bike color",
    location: "bike location",
    _id: "bikeId",
    rateAverage: 5,
    userRatingValue: 5,
    isAvailable: true,
  };
}
export function getNewBikeTestData(): IBike {
  return {
    model: "new model",
    color: "new color",
    location: "new location",
    _id: "newId",
    rateAverage: 5,
    userRatingValue: 5,
    isAvailable: true,
  };
}

export function getReservationTestData(): IReservation {
  const bikeInfo = getBikeTestData();
  return {
    bikeInfo,
    _id: "reservationId",
    userId: "user Id",
    creator: "user Id",
    createdAt: new Date().getTime(),
    bikeId: bikeInfo._id,
    startTimestamp: new Date().getTime(),
    endTimestamp: new Date().getTime(),
  };
}
export function getNewReservationTestData(): IReservation {
  const bikeInfo = getBikeTestData();
  return {
    bikeInfo,
    _id: "new reservationId",
    userId: "new Id",
    creator: "new user Id",
    createdAt: new Date().getTime(),
    bikeId: bikeInfo._id,
    startTimestamp: new Date().getTime(),
    endTimestamp: new Date().getTime(),
  };
}

export function getUserTestData(type: "user" | "manager"): IStorageResult {
  return {
    _id: "reservationId",
    isManager: type === "manager",
    reservations: [],
    firstName: "user name",
    lastName: "user last name",
    email: "user@email.com",
    password: "12345678",
  };
}
