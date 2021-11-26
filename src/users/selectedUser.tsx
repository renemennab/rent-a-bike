import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { fetchUser } from '../actions/userActions'
import { ListOfCards, ListCard, CardHeading } from '../common/listCard'
import PageHeader from '../common/pageHeader'
// import AssetActions from './assetActions'

const SelectedUser = function (): JSX.Element {
    const selectedUser = useSelector((state: { selectedUser: IStorageResult }) => state.selectedUser)
    const params = useParams() as { userId: string }
    console.log('selectedUser', selectedUser)
    console.log('params.userId', params.userId)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!selectedUser && params.userId) {
            dispatch(fetchUser(params.userId))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return selectedUser ? (
        <StyledSelectedUser className="selectedUser">
            <PageHeader pageName={`${selectedUser.firstName} ${selectedUser.lastName}`} />
            {/* <AssetActions itemId={selectedUser._id} itemType="user" /> */}
            <span className="selectedUser--email">
                <strong>email: </strong> {selectedUser.email}
            </span>
            <span className="selectedUser--managerStatus">
                <strong>Manager: </strong> {selectedUser.isManager ? 'yes' : 'no'}
            </span>
            <h3>Reservations</h3>
            <ListOfCards>
                {selectedUser.reservations.map((data: string) => (
                    <ListCard className="user--reservationCard" key={data}>
                        <div className="user--reservationCard__container">
                            <CardHeading className="user--reservationCard__container--id">{data}</CardHeading>
                        </div>
                    </ListCard>
                ))}
            </ListOfCards>
            <span className="selectedUser--description">
                <strong>Reservations: </strong> {selectedUser.reservations}
            </span>
        </StyledSelectedUser>
    ) : (
        <div />
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
