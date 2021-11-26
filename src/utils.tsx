import jwtDecode from 'jwt-decode'

export const ROUTES = {
    LOGIN: `/login`,
    SIGNIN: `/signIn`,
    PROFILE: `/profile`,
    NEW_BIKE: `/newBike`,
    BIKES: `/bikes`,
    USERS: `/users`,
    RESERVATIONS: `/reservations`
}

interface IDecodedToken {
    name: string
    exp: number
}

export function checkIfTokenIsExpired(token: string): boolean {
    const decodedToken = jwtDecode<IDecodedToken>(token)
    if (decodedToken.exp * 1000 < new Date().getTime()) return true
    return false
}
