import React, { FormEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import PageHeader from '../common/pageHeader'
import { StyledButton, StyledForm, StyledInput, StyledLabel } from '../common/styled'
import UserInfo from '../common/userInfo'
import { createUser } from '../actions/userActions'
import { getLoggedInUser } from '../login/loginHelpers'

const UserProfileForm = function (): JSX.Element {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [firstName, setFirstName] = useState(``)
    const [lastName, setLastName] = useState(``)
    const [email, setEmail] = useState(``)
    const [password, setPassword] = useState(``)
    const dispatch = useDispatch()
    const history = useHistory()

    function handleSignUp(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault()
        const params = { firstName, lastName, email, password }

        dispatch(createUser(params, history, !isLoggedIn))
    }

    useEffect(() => {
        const user = getLoggedInUser()
        if (user) setIsLoggedIn(true)
    }, [])

    return (
        <StyledSignIn>
            <PageHeader pageName="Cadastro" />
            <StyledForm action="" onSubmit={event => handleSignUp(event)}>
                <fieldset className="userInfo">
                    <StyledLabel className="column">
                        First Name
                        <StyledInput
                            required
                            type="text"
                            value={firstName}
                            onChange={event => setFirstName(event.target.value)}
                        />
                    </StyledLabel>
                    <StyledLabel className="column">
                        Last Name
                        <StyledInput
                            required
                            type="text"
                            value={lastName}
                            onChange={event => setLastName(event.target.value)}
                        />
                    </StyledLabel>
                    <UserInfo email={email} setEmail={setEmail} password={password} setPassword={setPassword} />
                </fieldset>

                <StyledButton>
                    {isLoggedIn ? 'Create User' : 'Sign up'} <i className="fa fa-save" />
                </StyledButton>
            </StyledForm>
        </StyledSignIn>
    )
}
export default UserProfileForm
const StyledSignIn = styled.div`
    padding: var(--padding);
    fieldset {
        border: none;
        width: 100%;
    }
`
