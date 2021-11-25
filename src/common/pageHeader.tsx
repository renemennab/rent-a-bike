import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

interface IProps {
    pageName: string
}

const PageHeader = function ({ pageName }: IProps): JSX.Element {
    const history = useHistory()

    function handleGoBack(): void {
        const currentUrl = history.location.pathname
        const splitUrl = currentUrl.split('/')
        splitUrl.pop()
        const newUrl = splitUrl.join('/')
        history.push(newUrl)
    }

    return (
        <StyledBackArrow>
            <button type="button" onClick={handleGoBack}>
                <i className="fa fa-arrow-left" />
            </button>
            <h1>{pageName}</h1>
        </StyledBackArrow>
    )
}

export default PageHeader
const StyledBackArrow = styled.header`
    button {
        color: var(--red);
        border: none;
        background: transparent;
        font-size: 20px;
    }
`
