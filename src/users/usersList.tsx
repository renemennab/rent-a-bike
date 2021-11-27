import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { SELECTED_USER_REDUCER_OPTIONS } from '../reducers/selectedUserReducer'

import PageHeader from '../common/pageHeader'
import { CardHeading, CardLink, CardSpan, ListCard } from '../common/listCard'
import { FilterInput } from '../common/styled'
import { fetchUsers } from '../actions/userActions'

const UsersList = function (): JSX.Element {
    const usersData = useSelector((state: { users: IStorageResult[] }) => state.users)
    const [filter, setFilter] = useState('')
    const [filteredList, setFilteredList] = useState(usersData)
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
        if (!usersData.length) {
            dispatch(fetchUsers())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const filtered = usersData?.reduce((acc: IStorageResult[], user: IStorageResult) => {
            const { email, firstName, lastName } = user
            const valuesArray = [email, firstName, lastName]
            const matchingValues = valuesArray.filter(value =>
                value?.toString().toLowerCase().includes(filter.toLowerCase())
            )
            if (matchingValues.length) acc.push(user)

            return acc
        }, [])

        setFilteredList(filtered)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, usersData])

    const placeLink = history.location.pathname === '/' ? '' : history.location.pathname

    return (
        <StyledPlacesList>
            <PageHeader pageName="users" />
            <FilterInput
                className="users--searchInput"
                type="text"
                value={filter}
                onChange={event => setFilter(event.target.value)}
            />
            {filteredList.map((user: IStorageResult) => (
                <ListCard className="users--card" key={user._id}>
                    <CardLink
                        className="users--card__link"
                        to={`${placeLink}/${user._id}`}
                        onClick={() =>
                            dispatch({ type: SELECTED_USER_REDUCER_OPTIONS.SET_SELECTED_USER, payload: user })
                        }
                    >
                        <CardHeading className="users--card__link--model">{`${user.firstName} ${user.lastName}`}</CardHeading>
                        <CardSpan className="users--card__link--color">{user.email}</CardSpan>
                    </CardLink>
                </ListCard>
            ))}
        </StyledPlacesList>
    )
}

export default UsersList

const StyledPlacesList = styled.div`
    padding: var(--padding);
    flex-grow: 1;
    width: 100%;
    list-style: none;
    margin: 0;
`
