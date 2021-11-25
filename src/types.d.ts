interface IBike extends PostBike {
    id: string
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

type AssetType = 'user' | 'bike'
