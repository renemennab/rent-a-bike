import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { getBikes } from '../actions/bikeActions'
import AssetList from '../common/assetList'
import PageHeader from '../common/pageHeader'

const BikesList = function (): JSX.Element {
    const bikes = useSelector((state: { bikes: IBike[] }) => state.bikes)

    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
        if (!bikes) {
            dispatch(getBikes())
        } else {
            history.push('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <StyledPlacesList>
            <PageHeader pageName="Bikes" />
            <AssetList bikesData={bikes} />
        </StyledPlacesList>
    )
}

export default BikesList

const StyledPlacesList = styled.div`
    padding: var(--padding);
    flex-grow: 1;
`
