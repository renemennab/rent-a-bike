import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { fetchUser, deleteUser } from '../actions/userActions'
import { ListOfCards, ListCard, CardHeading } from '../common/listCard'
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

    useEffect(() => {
        if (!selectedUser && params.userId) {
            dispatch(fetchUser(params.userId))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onDelete = (): void => {
        dispatch(deleteUser(user))
        history.push(ROUTES.USERS)
    }

    const user = selectedUser || loggedInUser

    return (
        <StyledSelectedUser className="selectedUser">
            <PageHeader pageName={`${user.firstName} ${user.lastName}`} />
            <SelectedAssetButtons onDelete={onDelete} />
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
