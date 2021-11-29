import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { getUserReservations } from '../actions/reservationActions'
import PageHeader from '../common/pageHeader'
import { FilterInput } from '../common/styled'
import { getLoggedInUser } from '../login/loginHelpers'
import { handleGoBack } from '../common/utils'
import ReservationCard from './reservationCard'

const ReservationsList = function (): JSX.Element {
    const { reservations, reservationsByDates } = useSelector(
        (state: { reservations: IReservation[]; reservationsByDates: IReservation[] }) => state
    )
    const reservationsData = reservationsByDates || reservations
    const [filter, setFilter] = useState('')
    const [filteredList, setFilteredList] = useState(reservationsData)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        const user = getLoggedInUser()
        if (user.result.isManager) handleGoBack(history)
        if (!reservationsData.length) {
            dispatch(getUserReservations(user.result._id))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const filtered = reservationsData?.reduce((acc: IReservation[], asset: IReservation) => {
            const assetValues = Object.values(asset)
            const matchingValues = assetValues.filter(value =>
                value.toString().toLowerCase().includes(filter.toLowerCase())
            )
            if (matchingValues.length) acc.push(asset)

            return acc
        }, [])

        setFilteredList(filtered)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, reservations, reservationsByDates])

    const placeLink = history.location.pathname === '/' ? '' : history.location.pathname

    return (
        <StyledPlacesList>
            <PageHeader pageName="Reservations" />
            <FilterInput
                className="reservations--searchInput"
                type="text"
                value={filter}
                onChange={event => setFilter(event.target.value)}
            />
            {filteredList.map((data: IReservation) => (
                <ReservationCard key={data._id} reservationInfo={data} linkUrl={`${placeLink}/${data._id}`} />
            ))}
        </StyledPlacesList>
    )
}

export default ReservationsList

const StyledPlacesList = styled.div`
    padding: var(--padding);
    flex-grow: 1;
    width: 100%;
    list-style: none;
    margin: 0;
`
