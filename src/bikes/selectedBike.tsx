import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { deleteBike, getBike } from '../actions/bikeActions'
import { createReservation } from '../actions/reservationActions'
import { rateBike } from '../api'
import PageHeader from '../common/pageHeader'
import SelectedAssetButtons from '../common/selectedAssetButtons'
import { getLoggedInUser } from '../login/loginHelpers'
import DateSelector from '../reservation/dateSelector'
import { ROUTES } from '../utils'

const SelectedBike = function (): JSX.Element {
    const { selectedBike, selectedTimestamps } = useSelector(
        (state: { selectedBike: IBike; selectedTimestamps: ITimestamps }) => state
    )
    const params = useParams() as { bikeId: string }
    const history = useHistory()
    const dispatch = useDispatch()
    const userRating = selectedBike?.userRatingValue

    useEffect(() => {
        if (!selectedBike && params.bikeId) {
            dispatch(getBike(params.bikeId))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onDelete = (): void => {
        dispatch(deleteBike(selectedBike))
        history.push(ROUTES.BIKES)
    }

    const handleBikeBooking = (): void => {
        const reservationParams = {
            bikeId: selectedBike._id,
            startTimestamp: selectedTimestamps.start,
            endTimestamp: selectedTimestamps.end
        }
        dispatch(createReservation(reservationParams, history))
    }

    const handleRatingClick = (event: React.MouseEvent<HTMLElement>): void => {
        event.preventDefault()

        const rating = (event.target as HTMLButtonElement).textContent as string
        rateBike(selectedBike._id, Number(rating)).then(() => dispatch(getBike(params.bikeId)))
    }
    const ratingOptions = [1, 2, 3, 4, 5]
    return selectedBike ? (
        <StyledSelectedBike className="selectedBike">
            <PageHeader pageName={selectedBike.model} />
            <SelectedAssetButtons onDelete={onDelete} />
            <span className="selectedBike--color">
                <strong>Color: </strong> {selectedBike.color}
            </span>
            <span className="selectedBike--location">
                <strong>Location: </strong> {selectedBike.location}
            </span>
            <span className="selectedBike--isAvailable">
                <strong>IsAvailable: </strong> {selectedBike.isAvailable}
            </span>
            <span className="selectedBike--rating">
                <h3 className="selectedBike--rating__title">Rate Bike: </h3>
                <div className="selectedBike--rating__buttons">
                    {ratingOptions.map(ratingValue => (
                        <button
                            className={userRating === ratingValue ? 'selectedRating' : ''}
                            type="button"
                            onClick={handleRatingClick}
                            key={ratingValue}
                        >
                            {ratingValue}
                        </button>
                    ))}
                </div>
                {selectedBike.rateAverage}
            </span>
            <DateSelector />
            <button type="button" className="dateSelector--buttons__clearFilter" onClick={handleBikeBooking}>
                Book Bike
            </button>
        </StyledSelectedBike>
    ) : (
        <div />
    )
}

export default SelectedBike

const StyledSelectedBike = styled.div`
    padding: var(--padding);
    display: flex;
    flex-direction: column;
    position: relative;
    .selectedBike {
        &--color,
        &--location,
        &--isAvailable {
            margin-bottom: 40px;

            strong {
                color: var(--dark-blue);
                text-transform: uppercase;
            }
        }
        &--rating {
            &__buttons {
                button.selectedRating {
                    color: var(--red);
                }
            }
        }
    }
`
