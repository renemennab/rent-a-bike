import React from 'react'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getBikesByDates } from '../actions/bikeByDatesActions'
import { BIKES_BY_DATES_REDUCER_OPTIONS } from '../reducers/bikesByDatesReducer'
import { SELECTED_TIMESTAMPS_REDUCER_OPTIONS } from '../reducers/selectedTimestamps'

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DateSelector = function (): JSX.Element {
    const dispatch = useDispatch()
    const { selectedTimestamps } = useSelector((state: { selectedTimestamps: ITimestamps }) => state)

    const applyDatesFilter = (): void => {
        dispatch(getBikesByDates(selectedTimestamps))
    }

    const clearDatesFilter = (): void => {
        dispatch({ type: BIKES_BY_DATES_REDUCER_OPTIONS.SET_BIKES_BY_DATES, payload: null })
    }

    return (
        <StyledDateSelector className="dateSelector">
            <div className="dateSelector--start">
                <span className="dateSelector--start__text">Start:</span>
                <DatePicker
                    selected={new Date(selectedTimestamps.start)}
                    onChange={date =>
                        dispatch({
                            type: SELECTED_TIMESTAMPS_REDUCER_OPTIONS.SET_SELECTED_START,
                            payload: (date as Date).getTime()
                        })
                    }
                    showTimeSelect
                    dateFormat="Pp"
                    className="dateSelector--start__picker"
                />
            </div>
            <div className="dateSelector--end">
                <span className="dateSelector--end__text">End:</span>
                <DatePicker
                    selected={new Date(selectedTimestamps.end)}
                    onChange={date =>
                        dispatch({
                            type: SELECTED_TIMESTAMPS_REDUCER_OPTIONS.SET_SELECTED_END,
                            payload: (date as Date).getTime()
                        })
                    }
                    showTimeSelect
                    dateFormat="Pp"
                    className="dateSelector--end__picker"
                />
            </div>
            <div className="dateSelector--buttons">
                <button type="button" className="dateSelector--buttons__filter" onClick={applyDatesFilter}>
                    Check Availability
                </button>
                <button type="button" className="dateSelector--buttons__clearFilter" onClick={clearDatesFilter}>
                    Clear date filter
                </button>
            </div>
        </StyledDateSelector>
    )
}

export default DateSelector

const StyledDateSelector = styled.div`
    display: flex;
    flex-direction: column;
    .dateSelector {
        &--start,
        &--end {
            display: flex;
            margin-bottom: 30px;
            font-size: 18px;
            &__text {
                color: var(--dark-blue);
                margin-right: 5px;
                font-weight: 600;
                width: 40px;
            }
            &__picker {
                color: var(--dark-gray);
                font-size: 16px;
                border: none;
                border-bottom: 2px solid var(--yellow);
            }
        }
        &--buttons {
            margin-bottom: 40px;
            &__filter {
                border: none;
                background: var(--dark-blue);
                padding: 10px;
                margin-right: 10px;
                color: white;
                border-radius: 5px;
                font-size: 15px;
                font-weight: 600;
            }
            &__clearFilter {
                border: none;
                background: transparent;
                color: var(--dark-blue);
                font-size: 15px;
            }
        }
    }
`
