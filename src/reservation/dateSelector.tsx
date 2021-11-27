import React from 'react'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { SELECTED_TIMESTAMPS_REDUCER_OPTIONS } from '../reducers/selectedTimestamps'

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DateSelector = function (): JSX.Element {
    const dispatch = useDispatch()
    const { selectedTimestamps } = useSelector((state: { selectedTimestamps: ITimestamps }) => state)

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
    }
`
