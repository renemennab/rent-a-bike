import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { getBikes, setBikeRatingFilter } from '../actions/bikeActions'
import { SELECTED_BIKE_REDUCER_OPTIONS } from '../reducers/selectedBikeReducer'

import PageHeader from '../common/pageHeader'
import { CardHeading, CardLink, CardSpan, ListCard } from '../common/listCard'
import { FilterInput } from '../common/styled'
import DateSelector from '../reservation/dateSelector'
import { RATING_OPTIONS, SEARCH_FILTERS_REDUCER_OPTIONS } from '../reducers/searchFiltersReducer'
import { checkIfFilterMatchesBike } from '../common/utils'

const BikesList = function (): JSX.Element {
    const { bikes, bikesByDates } = useSelector((state: { bikes: IBike[]; bikesByDates: IBike[] }) => state)
    const { bikeRating } = useSelector((state: { searchFilters: ISearchFilters }) => state.searchFilters)

    const bikesData = bikesByDates || bikes
    const [filter, setFilter] = useState('')
    const [filteredList, setFilteredList] = useState(bikesData)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBikes())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const filtered = bikesData?.reduce(
            (acc: IBike[], bike: IBike) => (checkIfFilterMatchesBike(bike, filter) ? [...acc, bike] : acc),
            []
        )

        setFilteredList(filtered)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, bikes, bikesByDates, bikeRating])

    const placeLink = history.location.pathname === '/' ? '' : history.location.pathname

    useEffect(() => {
        const { BIKE_RATING } = SEARCH_FILTERS_REDUCER_OPTIONS

        const sessionValue = window.sessionStorage.getItem(BIKE_RATING) || '0'
        if (sessionValue !== bikeRating?.toString()) {
            dispatch(setBikeRatingFilter(Number(sessionValue)))
        }
    }, [bikeRating])

    const handleRatingFilterClick = (value: string): void => {
        dispatch(setBikeRatingFilter(Number(value)))
    }

    return (
        <StyledBikesList className="bikesList">
            <PageHeader pageName="Bikes" />
            <FilterInput
                className="bikesList--searchInput"
                type="text"
                value={filter}
                onChange={event => setFilter(event.target.value)}
            />
            <div className="bikesList--ratingInputs">
                {RATING_OPTIONS.map((option, index) => {
                    return (
                        <label
                            key={option}
                            htmlFor={`ratingFilterOption${index}`}
                            className="bikesList--ratingInputs__label"
                        >
                            <input
                                type="radio"
                                value={index}
                                checked={index === bikeRating}
                                name="rating"
                                id={`ratingFilterOption${index}`}
                                className="bikesList--ratingInputs__label--inputs"
                                onChange={event => handleRatingFilterClick(event.target.value)}
                            />
                            {index ? `${index}+` : 'All'}
                        </label>
                    )
                })}
            </div>
            <DateSelector />
            {filteredList.map((data: IBike) => {
                if (data.rateAverage < bikeRating) return null
                return (
                    <ListCard className="bikesList--card" key={data._id}>
                        <CardLink
                            className="bikesList--card__link"
                            to={`${placeLink}/${data._id}`}
                            onClick={() =>
                                dispatch({ type: SELECTED_BIKE_REDUCER_OPTIONS.SET_SELECTED_BIKE, payload: data })
                            }
                        >
                            <CardHeading className="bikesList--card__link--model">{data.model}</CardHeading>
                            <CardSpan className="bikesList--card__link--color">{data.color}</CardSpan>
                            <CardSpan className="bikesList--card__link--location">{data.location}</CardSpan>
                            <CardSpan className="bikesList--card__link--rating">{data.rateAverage}</CardSpan>
                        </CardLink>
                    </ListCard>
                )
            })}
        </StyledBikesList>
    )
}

export default BikesList

const StyledBikesList = styled.div`
    padding: var(--padding);
    flex-grow: 1;
    width: 100%;
    list-style: none;
    margin: 0;
    .bikesList {
        &--ratingInputs {
            margin: 10px 0 40px;
            width: 100%;
            max-width: 500px;
            display: flex;
            justify-content: space-around;
        }
    }
`
