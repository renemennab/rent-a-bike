import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PageHeader from '../common/pageHeader'
import { getLoggedInUser } from './loginHelpers'

interface IUserProfile {
    name: string
    email: string
}

const UserProfile = function (): JSX.Element {
    const [userProfile, setUserProfile] = useState<IUserProfile>({ name: '', email: '' })

    useEffect(() => {
        const profile = getLoggedInUser()

        if (profile) {
            setUserProfile({
                email: profile.result.email,
                name: `${profile.result.firstName} ${profile.result.lastName}`
            })
        }
    }, [])

    return (
        <StyledUserProfile className="userProfile">
            <PageHeader pageName={userProfile.name || ``} />
            <span className="userProfile--email">
                <strong>EMAIL: </strong>
                {userProfile.email}
            </span>
        </StyledUserProfile>
    )
}
export default UserProfile
const StyledUserProfile = styled.div`
    padding: var(--padding);
    display: flex;
    flex-direction: column;
    position: relative;
    .userProfile {
        &--email,
        &--name,
        &--type {
            margin-top: 15px;
            strong {
                color: var(--dark-blue);
            }
        }
    }
`
