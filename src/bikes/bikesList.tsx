import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import styled from 'styled-components'
import { getBikes } from '../actions/bikeActions'
import { SELECTED_BIKE_REDUCER_OPTIONS } from '../reducers/selectedBikeReducer'

import PageHeader from '../common/pageHeader'

const BikesList = function (): JSX.Element {
    const bikesData = useSelector((state: { bikes: IBike[] }) => state.bikes)
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
    }, [filter, bikesData])

    const placeLink = history.location.pathname === '/' ? '' : history.location.pathname

    return (
        <StyledPlacesList>
            <PageHeader pageName="Bikes" />
            <input
                className="assetList--input"
                type="text"
                value={filter}
                onChange={event => setFilter(event.target.value)}
            />
            {filteredList.map((data: IBike) => (
                <li className="assetList--card" key={data._id}>
                    <Link
                        className="assetList--card__link"
                        to={`${placeLink}/${data._id}`}
                        onClick={() =>
                            dispatch({ type: SELECTED_BIKE_REDUCER_OPTIONS.SET_SELECTED_BIKE, payload: data })
                        }
                    >
                        <h2 className="assetList--card__link--model">{data.model}</h2>
                        <span className="assetList--card__link--color">{data.color}</span>
                        <span className="assetList--card__link--location">{data.location}</span>
                        <span className="assetList--card__link--rating">{data.rating}</span>
                    </Link>
                </li>
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
    .assetList {
        &--input {
            width: 100%;
            height: 30px;
            border-radius: 35px;
            margin-bottom: 20px;
            border: 1px solid var(--black);
            padding-left: 16px;
        }
        &--card {
            padding: 20px;
            margin-bottom: 10px;
            display: flex;
            flex-direction: column;
            border-radius: 3px;
            box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.22);
            &__link {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                &--model,
                &--color,
                &--workingHours,
                &--description,
                &--location {
                    font-size: 14px;
                    margin-bottom: 15px;
                }
                &--model {
                    color: var(--dark-blue);
                    text-transform: capitalize;
                    font-weight: 700;
                    font-size: 18px;
                }
            }
        }
    }
`
