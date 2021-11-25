import React, { FormEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createBike } from '../api'
import PageHeader from '../common/pageHeader'
import { StyledButton, StyledForm, StyledInput, StyledLabel } from '../common/styled'

const BikeForm = function (): JSX.Element {
    const dispatch = useDispatch()
    const bikes: IBike[] = useSelector((state: { bikes: IBike[] }) => state.bikes)
    const selectedBike = bikes[0]

    const [model, setModel] = useState(selectedBike?.model || ``)
    const [color, setColor] = useState(selectedBike?.color || ``)
    const [location, setLocation] = useState(selectedBike?.location || ``)
    const [rating, setRating] = useState(selectedBike?.rating || '')

    const history = useHistory()
    const params = useParams() as { BikeId: string }
    console.log(params)
    console.log(selectedBike)

    // const [relatedEvents, setRelatedEvents] = useState(``)
    useEffect(() => {
        if (!selectedBike && params.BikeId) {
            console.log(selectedBike)
            // setModel(selectedBike.model)
            // setColor(selectedBike.color)
            // setLocation(selectedBike.location)
            // setRating(selectedBike.rating)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleBikeSubmit(event: FormEvent<HTMLFormElement>): void {
        const bikeData: PostBike = { isAvailable: true, color, location, model, rating }
        event.preventDefault()
        dispatch(createBike(bikeData))
    }

    return (
        <StyledNewColectionBike className="newBike">
            <PageHeader pageName="Novo Ponto de Coleta" />
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
                        value={rating}
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
