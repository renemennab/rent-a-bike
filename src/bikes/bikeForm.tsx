import React, { FormEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createBike, getBike, updateBike } from '../actions/bikeActions'
import PageHeader from '../common/pageHeader'
import { StyledButton, StyledForm, StyledInput, StyledLabel } from '../common/styled'
import { ROUTES } from '../utils'
import { SELECTED_BIKE_REDUCER_OPTIONS } from '../reducers/selectedBikeReducer'

const BikeForm = function (): JSX.Element {
    const dispatch = useDispatch()
    const { selectedBike } = useSelector((state: { selectedBike?: IBike }) => state)

    const [model, setModel] = useState(selectedBike?.model || ``)
    const [color, setColor] = useState(selectedBike?.color || ``)
    const [location, setLocation] = useState(selectedBike?.location || ``)
    const [rating, setRating] = useState(selectedBike?.rating || '')

    const history = useHistory()
    const params = useParams() as { bikeId: string }

    // const [relatedEvents, setRelatedEvents] = useState(``)
    useEffect(() => {
        if (!selectedBike && params.bikeId) {
            dispatch(getBike(params.bikeId))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        if (selectedBike) {
            setModel(selectedBike.model)
            setColor(selectedBike.color)
            setLocation(selectedBike.location)
            setRating(selectedBike.rating)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedBike])

    function handleBikeSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault()
        const bikeData: PostBike = { isAvailable: true, color, location, model, rating }
        if (params.bikeId && selectedBike) {
            dispatch(updateBike(selectedBike._id, bikeData))
        } else {
            dispatch(createBike(bikeData))
        }
        dispatch({ type: SELECTED_BIKE_REDUCER_OPTIONS.SET_SELECTED_BIKE, payload: null })
        history.push(ROUTES.BIKES)
    }

    return (
        <StyledNewColectionBike className="newBike">
            <PageHeader pageName={params.bikeId ? 'Edit Bike' : 'New Bike'} />
            <StyledForm action="" onSubmit={event => handleBikeSubmit(event)}>
                <StyledLabel className="column">
                    Model
                    <StyledInput required type="text" value={model} onChange={event => setModel(event.target.value)} />
                </StyledLabel>
                <StyledLabel className="column">
                    color
                    <StyledInput required type="text" value={color} onChange={event => setColor(event.target.value)} />
                </StyledLabel>
                <StyledLabel className="column">
                    location
                    <StyledInput
                        required
                        type="text"
                        value={location}
                        onChange={event => setLocation(event.target.value)}
                    />
                </StyledLabel>
                <StyledLabel className="column">
                    rating
                    <StyledInput
                        required
                        type="text"
                        value={rating}
                        onChange={event => setRating(event.target.value)}
                    />
                </StyledLabel>

                <StyledButton>
                    {selectedBike ? 'Update' : 'Save'} <i className="fa fa-save" />
                </StyledButton>
            </StyledForm>
        </StyledNewColectionBike>
    )
}

export default BikeForm

const StyledNewColectionBike = styled.div`
    padding: var(--padding);
    fieldset {
        border: none;
        width: 100%;
        .userType {
            &--input {
                margin-right: 10px;
            }
        }
    }
`
