import React, { useState } from 'react'
import styled from 'styled-components'
import MenuOptions from '../navBar/menuOptions'

const HomePage = function (): JSX.Element {
    const [showOptions, setShowOptions] = useState(false)

    return (
        <StyledHomePage>
            <button
                className="homePage--menuBtn"
                type="button"
                aria-label="open menu"
                onClick={() => setShowOptions(true)}
            >
                <i className="fas fa-bars" />
            </button>
            <MenuOptions selectedView={showOptions} setSelectedView={setShowOptions} />
        </StyledHomePage>
    )
}

export default HomePage
const StyledHomePage = styled.div`
    height: 100vh;
`
