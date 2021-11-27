import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { fetchUser } from '../actions/userActions'
import { ListOfCards, ListCard, CardHeading } from '../common/listCard'
import PageHeader from '../common/pageHeader'
import { getLoggedInUser } from '../login/loginHelpers'
import { SELECTED_USER_REDUCER_OPTIONS } from '../reducers/selectedUserReducer'
// import AssetActions from './assetActions'

const SelectedUser = function (): JSX.Element {
    const loggedInUser = getLoggedInUser().result
    const selectedUser = useSelector((state: { selectedUser: IStorageResult }) => state.selectedUser)
    const params = useParams() as { userId: string }
    const dispatch = useDispatch()

    useEffect(() => {
        if (!selectedUser && params.userId) {
            dispatch(fetchUser(params.userId))
        }
        return () => {
            dispatch({ type: SELECTED_USER_REDUCER_OPTIONS.SET_SELECTED_USER, payload: null })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const user = selectedUser || loggedInUser

    return (
        <StyledSelectedUser className="selectedUser">
            <PageHeader pageName={`${user.firstName} ${user.lastName}`} />
            <span className="selectedUser--email">
                <strong>email: </strong> {user.email}
            </span>
            <span className="selectedUser--managerStatus">
                <strong>Manager: </strong> {user.isManager ? 'yes' : 'no'}
            </span>
            {selectedUser ? (
                <>
                    <h3>Reservations</h3>
                    <ListOfCards>
                        {user.reservations.map((data: string) => (
                            <ListCard className="user--reservationCard" key={data}>
                                <div className="user--reservationCard__container">
                                    <CardHeading className="user--reservationCard__container--id">{data}</CardHeading>
                                </div>
                            </ListCard>
                        ))}
                    </ListOfCards>
                    <span className="selectedUser--description">
                        <strong>Reservations: </strong> {user.reservations}
                    </span>
                </>
            ) : (
                <div />
            )}
        </StyledSelectedUser>
    )
}

export default SelectedUser

const StyledSelectedUser = styled.div`
    padding: var(--padding);
    display: flex;
    flex-direction: column;
    position: relative;
    .selectedUser {
        &--email,
        &--managerStatus {
            margin-bottom: 40px;

            strong {
                color: var(--dark-blue);
                text-transform: uppercase;
            }
        }
    }
`
