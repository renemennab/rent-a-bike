import React, { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import PageHeader from '../components/pageHeader'
import { StyledButton, StyledForm } from '../components/styled'
import UserInfo from '../components/userInfo'
import { ROUTES } from '../utils'
import { loginUser } from './loginHelpers'

const Login = function (): JSX.Element {
    const [email, setEmail] = useState(``)
    const [password, setPassword] = useState(``)
    const [userNotFound, setUserNotFound] = useState(false)
    const history = useHistory()

    function handleLogin(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault()
        loginUser({ email, password }).then(response => {
            if (response?.status === 200) {
                // setUserIsLogged?.(true)
                history.push('/')
            } else {
                setUserNotFound(true)
            }
        })
    }

    return (
        <StyledLogin>
            <PageHeader pageName="Login" />
            <StyledForm action="" onSubmit={event => handleLogin(event)}>
                <UserInfo email={email} setEmail={setEmail} password={password} setPassword={setPassword} />
                <StyledButton>
                    Login <i className="fas fa-sign-in-alt" />
                </StyledButton>
            </StyledForm>
            {userNotFound ? <span className="login--userNotFound">USUÁRIO NÃO ENCONTRADO</span> : null}
            <Link to={ROUTES.SIGNIN} className="login--signInLink">
                Não tem uma conta? Cadastre-se aqui
            </Link>
        </StyledLogin>
    )
}

export default Login
const StyledLogin = styled.div`
    padding: var(--padding);
    display: flex;
    flex-direction: column;
    .login {
        &--signInLink {
            align-self: center;
            text-decoration: none;
            color: var(--dark-blue);
            margin-top: 50px;
        }
        &--userNotFound {
            color: var(--red);
            margin-top: 40px;
            align-self: center;
        }
    }
`
