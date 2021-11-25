import { API_PATHS } from '../api'

export const SESSION_DATA = {
    NAME: 'name',
    EMAIL: 'email',
    ID: 'id',
    IS_MANAGER: false
}
const URL_BASE = 'https://localhost:3000/'

export function loginUser(params: LoginParams): Promise<Response> {
    const { email, password } = params

    return fetch(URL_BASE + API_PATHS.LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha: password })
    })
        .then(response => response.json())
        .then((data: LogInResponse) => {
            window.sessionStorage.setItem(SESSION_DATA.ID, data.id)
            window.sessionStorage.setItem(SESSION_DATA.NAME, data.name)
            window.sessionStorage.setItem(SESSION_DATA.EMAIL, params.email)

            return { status: 200 }
        })
        .catch(err => err)
}

export function logOutUser(): void {
    window.sessionStorage.clear()
}
