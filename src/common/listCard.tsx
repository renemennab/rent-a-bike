import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const ListCard = styled.li`
    padding: 20px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    border-radius: 3px;
    box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.22);
    &.unavailable {
        opacity: 0.4;
    }
`

export const CardLink = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
`

export const CardHeading = styled.h2`
    font-size: 14px;
    margin-bottom: 15px;
    color: var(--dark-blue);
    text-transform: capitalize;
    font-weight: 700;
    font-size: 18px;
`

export const CardSpan = styled.span`
    font-size: 14px;
    margin-bottom: 15px;
    text-transform: capitalize;
`
export const ListOfCards = styled.ul`
    padding: var(--padding);
    flex-grow: 1;
    width: 100%;
    list-style: none;
    margin: 0;
`

export const CardRating = styled.span`
    position: absolute;
    font-size: 40px;
    right: 30px;
    top: 0;
    font-weight: 700;
    color: var(--rating);
    &.rating1 {
        --rating: #bc2026;
    }
    &.rating2 {
        --rating: #f58e1d;
    }
    &.rating3 {
        --rating: #fecb08;
    }
    &.rating4 {
        --rating: #7ebb43;
    }
    &.rating5 {
        --rating: #0b9547;
    }
`

export const CardAvailability = styled.span`
    position: absolute;
    position: absolute;
    font-size: 16px;
    right: 30px;
    bottom: 20px;
    font-weight: 700;
    color: #0b9547;
    display: flex;
    align-items: center;
    &.unavailable {
        color: var(--dark-gray);
    }
    i {
        font-size: 20px;
        margin-right: 5px;
    }
`
