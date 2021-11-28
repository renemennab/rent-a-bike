interface IBike extends PostBike {
    _id: string
}

interface PostBike {
    model: string
    color: string
    location: string
    rating: string
    isAvailable: boolean
}
interface IReservation extends PostReservation {
    _id: string
    userId: string
    creator: string
    createdAt: number
}

interface PostReservation {
    bikeId: string
    startTimestamp: number
    endTimestamp: number
}
interface IUpdateUserParams extends ISignupParams {
    userId: string
}

interface LoginParams {
    email: string
    password: string
}
interface LogInResponse {
    name: string
    id: string
    email: string
}
interface ILoginParams {
    email: string
    password: string
}

interface ISignupParams extends ILoginParams {
    firstName: string
    lastName: string
}

interface IlocalStorageProfile {
    result: IStorageResult
    token: string
}

interface IStorageResult extends ISignupParams {
    isManager: false
    reservations: IReservation[]
    _id: string
}

interface ITimestamps {
    start: number
    end: number
}

interface ISearchFilters {
    showUserWithReservation?: boolean
    bikeRating?: number
}

type AssetType = 'user' | 'bike'
