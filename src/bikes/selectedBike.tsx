import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import PageHeader from '../common/pageHeader'
import AssetActions from './assetActions'

const SelectedBike = function (): JSX.Element {
    const selectedBike = useSelector((state: { selectedBike: IBike }) => state.selectedBike)
    const params = useParams() as { bikeId: string }
    console.log(selectedBike)
    useEffect(() => {
        if (!selectedBike && params.bikeId) {
            // get bikes
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return selectedBike ? (
        <StyledSelectedBike className="selectedBike">
            <PageHeader pageName={selectedBike.model} />
            <AssetActions itemId={selectedBike._id} itemType="bike" />
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
