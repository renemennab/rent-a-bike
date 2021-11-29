import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { fetchUser, deleteUser } from '../actions/userActions'
import { fetchUserReservations } from '../api'
import { ListOfCards, ListCard, CardHeading, CardSpan, CardLink } from '../common/listCard'
import PageHeader from '../common/pageHeader'
import SelectedAssetButtons from '../common/selectedAssetButtons'
import { getLoggedInUser } from '../login/loginHelpers'
import { ROUTES } from '../utils'

const SelectedUser = function (): JSX.Element {
    const loggedInUser = getLoggedInUser().result
    const selectedUser = useSelector((state: { selectedUser: IStorageResult }) => state.selectedUser)
    const params = useParams() as { userId: string }
    const dispatch = useDispatch()
    const history = useHistory()
    const [userReservaitons, setUserReservaitons] = useState<IReservation[]>([])
    useEffect(() => {
        if (!selectedUser && params.userId) {
            dispatch(fetchUser(params.userId))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        if (selectedUser && params.userId) {
            fetchUserReservations(params.userId).then(response => setUserReservaitons(response.data))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedUser])

    const onDelete = (): void => {
        dispatch(deleteUser(user))
        history.push(ROUTES.USERS)
    }

    const user = selectedUser || loggedInUser

    const placeLink = history.location.pathname === '/' ? '' : history.location.pathname

    return (
        <StyledSelectedUser className="selectedUser">
            <PageHeader pageName={`${user.firstName} ${user.lastName}`} />
            {selectedUser ? <SelectedAssetButtons onDelete={onDelete} /> : null}
            <span className="selectedUser--email">
                <strong>email: </strong> {user.email}
            </span>
            <span className="selectedUser--managerStatus">
                <strong>Manager: </strong> {user.isManager ? 'Yes' : 'No'}
            </span>
            {selectedUser ? (
                <>
                    <h3>Reservations</h3>
                    <ListOfCards>
                        {userReservaitons.map(data => (
                            <ListCard className="user--reservationCard" key={data._id}>
                                <CardLink
                                    className="user--reservationCard__container"
                                    to={`${placeLink}${ROUTES.RESERVATIONS}/${data._id}`}
                                >
                                    <CardHeading className="user--reservationCard__container--id">
                                        {data.bikeId}
                                    </CardHeading>
                                    <CardSpan>From: {new Date(data.startTimestamp).toLocaleString()}</CardSpan>
                                    <CardSpan>To: {new Date(data.endTimestamp).toLocaleString()}</CardSpan>
                                </CardLink>
                            </ListCard>
                        ))}
                    </ListOfCards>
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
