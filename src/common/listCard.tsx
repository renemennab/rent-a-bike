import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const ListCard = styled.li`
    padding: 20px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    border-radius: 3px;
    box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.22);
    a {
    }
`

export const CardLink = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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
`
