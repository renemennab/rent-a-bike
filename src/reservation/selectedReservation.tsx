import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { deleteReservation, getReservation } from '../actions/reservationActions'
import ConfirmationDialog from '../common/confirmationDialog'
import PageHeader from '../common/pageHeader'
import { ROUTES } from '../utils'

const SelectedReservation = function (): JSX.Element {
    const [showModal, setShowModal] = useState(false)
    const { selectedReservation } = useSelector(
        (state: { selectedReservation: IReservation; selectedTimestamps: ITimestamps }) => state
    )
    const params = useParams() as { reservationId: string }
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
        if (!selectedReservation && params.reservationId) {
            dispatch(getReservation(params.reservationId))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleCancelation(): void {
        dispatch(deleteReservation(selectedReservation))
        history.push(ROUTES.RESERVATIONS)
        setShowModal(false)
    }
    return selectedReservation ? (
        <StyledSelectedReservation className="selectedReservation">
            <PageHeader pageName={selectedReservation.bikeId} />
            <span className="selectedReservation--start">
                <strong>Start: </strong> {selectedReservation.startTimestamp}
            </span>
            <span className="selectedReservation--end">
                <strong>End: </strong> {selectedReservation.endTimestamp}
            </span>
            <button className="selectedReservation--cancel" type="button" onClick={() => setShowModal(true)}>
                Cancel Reservation
            </button>
            {showModal ? (
                <ConfirmationDialog
                    onCancel={() => setShowModal(false)}
                    onDelete={() => handleCancelation()}
                    text="cancel"
                />
            ) : null}
        </StyledSelectedReservation>
    ) : (
        <div />
    )
}

export default SelectedReservation

const StyledSelectedReservation = styled.div`
    padding: var(--padding);
    display: flex;
    flex-direction: column;
    position: relative;
    .selectedReservation {
        &--start,
        &--end {
            margin-bottom: 40px;

            strong {
                color: var(--dark-blue);
                text-transform: uppercase;
            }
        }
    }
`
