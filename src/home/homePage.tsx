import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getLoggedInUser } from '../login/loginHelpers'
import MenuOptions from '../navBar/menuOptions'
import OptionsList from '../navBar/optionsList'
import { ROUTES } from '../utils'
import Lamp from './lamp'
import Logo from './logo'
import TimeMoney from './timeMoney'

const HomePage = function (): JSX.Element {
    const [showOptions, setShowOptions] = useState(false)
    const isUserLoggedIn = getLoggedInUser()

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
            <div className="homePage--banner">
                <div className="homePage--banner__background" />
                <div className="homePage--banner__logo">
                    <Logo />
                </div>
            </div>
            <div className="homePage--energy">
                <Lamp className="homePage--energy__lamp" />
                <p className="homePage--energy__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="homePage--timeMoney">
                <p className="homePage--timeMoney__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <TimeMoney className="homePage--timeMoney__image" />
            </div>

            <OptionsList />

            <MenuOptions selectedView={showOptions} setSelectedView={setShowOptions} />
        </StyledHomePage>
    )
}

export default HomePage
const StyledHomePage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 40px;
    .homePage {
        &--menuBtn {
            position: fixed;
            left: 20px;
            top: 20px;
            background: var(--yellow);
            border-radius: 8px;
            padding: 15px;
            color: white;
            border: none;
            font-size: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        &--banner {
            width: 100%;
            height: 60vh;
            min-height: 60vh;
            background: var(--yellow);
            display: flex;
            justify-content: center;
            align-items: center;
        }
        &--energy,
        &--timeMoney {
            width: 90%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 20px;
            &__text {
                color: var(--dark-gray);
                width: 250px;
            }
        }
        &--timeMoney {
            &__text {
                width: 200px;
            }
        }
    }
`
