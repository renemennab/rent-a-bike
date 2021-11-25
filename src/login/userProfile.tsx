import React from 'react'
import styled from 'styled-components'
import PageHeader from '../common/pageHeader'
import { SESSION_DATA } from './loginHelpers'

const UserProfile = function (): JSX.Element {
    return (
        <StyledUserProfile className="userProfile">
            <PageHeader pageName={window.sessionStorage.getItem(SESSION_DATA.NAME) || ``} />
            <span className="userProfile--email">
                <strong>EMAIL: </strong>
                {window.sessionStorage.getItem(SESSION_DATA.EMAIL)}
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
