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
interface IUser extends PostUser {
    id: string
}

interface PostUser extends LoginParams {
    name: string
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
interface IUser {
    firstName: string
    lastName: string
}

interface IlocalStorageProfile {
    result: IStorageResult
    token: string
}

interface IStorageResult {
    firstName: string
    lastName: string
    email: string
    password: string
    isManager: false
    reservations: string[]
    _id: string
}

type AssetType = 'user' | 'bike'
