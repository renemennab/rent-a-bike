import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getLoggedInUser } from '../login/loginHelpers'
import MenuOptions from '../navBar/menuOptions'
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
            {isUserLoggedIn ? null : (
                <Link to={ROUTES.LOGIN} className="homePage--login ">
                    <i className="fas fa-sign-in-alt" />
                    LOGIN
                </Link>
            )}
            <MenuOptions selectedView={showOptions} setSelectedView={setShowOptions} />
        </StyledHomePage>
    )
}

export default HomePage
const StyledHomePage = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    .homePage {
        &--menuBtn {
            position: fixed;
            left: 20px;
            top: 20px;
            background: transparent;
            color: white;
            border: none;
            font-size: 40px;
        }
        &--banner {
            width: 100%;
            height: 60vh;
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
        &--login {
            width: 300px;
            padding: 20px;
            color: white;
            background: var(--yellow);
            font-weight: 600;
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 20px;
            margin-top: 20px;
            i {
                margin-right: 5px;
            }
        }
    }
`
