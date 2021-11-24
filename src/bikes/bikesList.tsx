import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBike } from '../actions/bikeActions'

const BikesList = function (): JSX.Element {
    const bikes = useSelector<{ bikes: string[] }>(state => state.bikes)
    const dispatch = useDispatch()
    const bikeData: IBike = { isAvailable: true, color: 'black', location: 'brazil', model: '123', rating: 1 }
    console.log('state', bikes)

    function handleSubmit(e: React.MouseEvent<HTMLButtonElement>): void {
        e.preventDefault()
        dispatch(createBike(bikeData))
    }

    return (
        <div>
            bikes list
            <button type="button" onClick={handleSubmit}>
                {' '}
                post bike
            </button>
        </div>
    )
}
export default BikesList
