import React, { FormEvent, useContext, useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import PageHeader from '../common/pageHeader'
import { StyledButton, StyledForm, StyledInput, StyledLabel } from '../common/styled'
import UserInfo from '../common/userInfo'
import { loginUser } from './loginHelpers'

const UserProfileForm = function (): JSX.Element {
    const [firstName, setFirstName] = useState(``)
    const [lastName, setLastName] = useState(``)
    const [email, setEmail] = useState(``)
    const [password, setPassword] = useState(``)

    const history = useHistory()

    function handleSignIn(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault()
        const params = { firstName, lastName, email, password }
        // postUser(params).then(response => {
        //     if (response?.status === 200) {
        //         console.log('usuário criado')
        //         loginUser({ email, password }).then(response => {
        //             if (response.status === 200) {
        //                 console.log('usuário logado')
        //                 setUserIsLogged?.(true)
        //                 history.push('/')
        //             }
        //         })
        //     }
        // })
    }

    return (
        <StyledSignIn>
            <PageHeader pageName="Cadastro" />
            <StyledForm action="" onSubmit={event => handleSignIn(event)}>
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
                    Save <i className="fa fa-save" />
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
function postUser(params: { name: string; email: string; password: string }) {
    throw new Error('Function not implemented.')
}
