import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { deleteBike, getBike } from '../actions/bikeActions'
import { createReservation } from '../actions/reservationActions'
import PageHeader from '../common/pageHeader'
import SelectedAssetButtons from '../common/selectedAssetButtons'
import DateSelector from '../reservation/dateSelector'
import { ROUTES } from '../utils'

const SelectedBike = function (): JSX.Element {
    const { selectedBike, selectedTimestamps } = useSelector(
        (state: { selectedBike: IBike; selectedTimestamps: ITimestamps }) => state
    )
    const params = useParams() as { bikeId: string }
    const history = useHistory()
    const dispatch = useDispatch()
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
        dispatch(createReservation(reservationParams))
    }

    return selectedBike ? (
        <StyledSelectedBike className="selectedBike">
            <PageHeader pageName={selectedBike.model} />
            <SelectedAssetButtons onDelete={onDelete} />
            <span className="selectedBike--buildingNum">
                <strong>Color: </strong> {selectedBike.color}
            </span>
            <span className="selectedBike--cep">
                <strong>Location: </strong> {selectedBike.location}
            </span>
            <span className="selectedBike--description">
                <strong>IsAvailable: </strong> {selectedBike.isAvailable}
            </span>
            <span className="selectedBike--latitude">
                <strong>Rating: </strong> {selectedBike.rating}
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
        &--acceptableItems,
        &--buildingNum,
        &--cep,
        &--description,
        &--latitude,
        &--longitude,
        &--phone,
        &--workingDays,
        &--workingHoursFrom,
        &--workingHoursTo {
            margin-bottom: 40px;

            strong {
                color: var(--dark-blue);
                text-transform: uppercase;
            }
        }

        &--events {
            &__card {
                padding: 20px;
                margin-bottom: 10px;
                display: flex;
                flex-direction: column;
                border-radius: 3px;
                box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.22);
                &--link {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    &--name,
                    &--date,
                    &--time {
                        font-size: 14px;
                        margin-bottom: 15px;
                    }
                    &--name {
                        color: var(--dark-blue);
                        text-transform: capitalize;
                        font-weight: 700;
                        font-size: 18px;
                    }
                }
            }
        }

        &--message {
            color: white;
            border: none;
            background: #25d366;
            padding: 15px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            i {
                margin-left: 8px;
            }
        }
    }
`
