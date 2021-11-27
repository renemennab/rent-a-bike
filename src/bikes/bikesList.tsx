import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { getBikes } from '../actions/bikeActions'
import { SELECTED_BIKE_REDUCER_OPTIONS } from '../reducers/selectedBikeReducer'

import PageHeader from '../common/pageHeader'
import { CardHeading, CardLink, CardSpan, ListCard } from '../common/listCard'
import { FilterInput } from '../common/styled'
import DateSelector from '../reservation/dateSelector'

const BikesList = function (): JSX.Element {
    const { bikes, bikesByDates } = useSelector((state: { bikes: IBike[]; bikesByDates: IBike[] }) => state)
    const bikesData = bikesByDates.length ? bikesByDates : bikes
    const [filter, setFilter] = useState('')
    const [filteredList, setFilteredList] = useState(bikesData)
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
        if (!bikesData.length) {
            dispatch(getBikes())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const filtered = bikesData?.reduce((acc: IBike[], asset: IBike) => {
            const assetValues = Object.values(asset)
            const matchingValues = assetValues.filter(value =>
                value.toString().toLowerCase().includes(filter.toLowerCase())
            )
            if (matchingValues.length) acc.push(asset)

            return acc
        }, [])

        setFilteredList(filtered)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, bikes, bikesByDates])

    const placeLink = history.location.pathname === '/' ? '' : history.location.pathname

    return (
        <StyledPlacesList>
            <PageHeader pageName="bikes" />
            <FilterInput
                className="bikes--searchInput"
                type="text"
                value={filter}
                onChange={event => setFilter(event.target.value)}
            />
            <DateSelector />
            {filteredList.map((data: IBike) => (
                <ListCard className="bikes--card" key={data._id}>
                    <CardLink
                        className="bikes--card__link"
                        to={`${placeLink}/${data._id}`}
                        onClick={() =>
                            dispatch({ type: SELECTED_BIKE_REDUCER_OPTIONS.SET_SELECTED_BIKE, payload: data })
                        }
                    >
                        <CardHeading className="bikes--card__link--model">{data.model}</CardHeading>
                        <CardSpan className="bikes--card__link--color">{data.color}</CardSpan>
                        <CardSpan className="bikes--card__link--location">{data.location}</CardSpan>
                        <CardSpan className="bikes--card__link--rating">{data.rating}</CardSpan>
                    </CardLink>
                </ListCard>
            ))}
        </StyledPlacesList>
    )
}

export default BikesList

const StyledPlacesList = styled.div`
    padding: var(--padding);
    flex-grow: 1;
    width: 100%;
    list-style: none;
    margin: 0;
`
