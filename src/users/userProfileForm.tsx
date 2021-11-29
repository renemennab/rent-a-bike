import React, { FormEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PageHeader from '../common/pageHeader'
import { StyledButton, StyledForm, StyledInput, StyledLabel } from '../common/styled'
import UserInfo from '../common/userInfo'
import { createUser, fetchUser, updateUser } from '../actions/userActions'
import { getLoggedInUser } from '../login/loginHelpers'

export const OCASIONS = {
    SIGNUP: 'SIGNUP',
    CREATE: 'CREATE',
    EDIT: 'EDIT'
} as const

type IOcasions = typeof OCASIONS
interface IProps {
    ocasion: keyof IOcasions
}
const UserProfileForm = function ({ ocasion }: IProps): JSX.Element {
    const { selectedUser } = useSelector((state: { selectedUser?: IStorageResult }) => state)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [firstName, setFirstName] = useState(selectedUser?.firstName || ``)
    const [lastName, setLastName] = useState(selectedUser?.lastName || ``)
    const [email, setEmail] = useState(selectedUser?.email || ``)
    const [isManager, setIsManager] = useState(selectedUser?.isManager || false)
    const [password, setPassword] = useState(``)

    const dispatch = useDispatch()
    const history = useHistory()
    const params = useParams() as { userId: string }

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault()
        const postParams = { firstName, lastName, email, password, isManager }
        if (selectedUser) {
            dispatch(updateUser({ ...postParams, userId: selectedUser._id }, history))
        } else {
            dispatch(createUser(postParams, history, !isLoggedIn))
        }
    }

    useEffect(() => {
        const user = getLoggedInUser()
        if (user) setIsLoggedIn(true)
    }, [])

    useEffect(() => {
        if (!selectedUser && params.userId) {
            dispatch(fetchUser(params.userId))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (selectedUser) {
            setFirstName(selectedUser.firstName)
            setLastName(selectedUser.lastName)
            setEmail(selectedUser.email)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedUser])

    const pageName = {
        [OCASIONS.SIGNUP]: 'Signup',
        [OCASIONS.CREATE]: 'Add new user',
        [OCASIONS.EDIT]: 'Edit user'
    }

    return (
        <StyledSignup>
            <PageHeader pageName={pageName[ocasion]} />
            <StyledForm action="" onSubmit={event => handleSubmit(event)}>
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
                    <UserInfo
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        newPassword={!!selectedUser}
                    />
                    {ocasion === OCASIONS.CREATE || ocasion === OCASIONS.EDIT ? (
                        <StyledLabel>
                            Allow manager permissions:
                            <StyledInput
                                type="checkbox"
                                checked={isManager}
                                onChange={() => setIsManager(!isManager)}
                            />
                        </StyledLabel>
                    ) : null}
                </fieldset>

                <StyledButton>
                    Save <i className="fa fa-save" />
                </StyledButton>
            </StyledForm>
        </StyledSignup>
    )
}
export default UserProfileForm
const StyledSignup = styled.div`
    padding: var(--padding);
    fieldset {
        border: none;
        width: 100%;
    }
`
