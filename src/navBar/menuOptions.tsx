import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { getLoggedInUser } from '../login/loginHelpers'
import ConfirmationDialog from '../common/confirmationDialog'
import { ROUTES } from '../utils'
import { SELECTED_BIKE_REDUCER_OPTIONS } from '../reducers/selectedBikeReducer'
import { LOGGED_USER_REDUCER_OPTIONS } from '../reducers/loggedUser'

interface IProps {
    selectedView: boolean
    setSelectedView: (type: boolean) => void
}
const MenuOptions = function ({ selectedView, setSelectedView }: IProps): JSX.Element {
    const [showDialog, setShowDialog] = useState(false)
    const [userIsLogged, setUserIsLogged] = useState(false)
    const [userIsManager, setUserIsManager] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: SELECTED_BIKE_REDUCER_OPTIONS.SET_SELECTED_BIKE, payload: null })
    }, [])

    useEffect(() => {
        const user = getLoggedInUser()

        if (user) {
            setUserIsLogged(true)
            if (user.result.isManager) setUserIsManager(true)
        }
    }, [])

    function handleLogOut(): void {
        dispatch({ type: LOGGED_USER_REDUCER_OPTIONS.LOGOUT_USER })
        setUserIsLogged?.(false)
        setShowDialog(false)
    }

    return (
        <StyledMenuOptions className={`menuOptions ${selectedView ? 'open' : ''}`}>
            <button type="button" className="menuOptions--header " onClick={() => setSelectedView(false)}>
                <h1 className="menuOptions--header__title">Rent a Bike</h1>
                <i className="fas fa-chevron-left" />
            </button>
            <ul className="menuOptions--optionList ">
                {userIsLogged ? (
                    <>
                        <li className="menuOptions--optionList__item ">
                            <Link to={ROUTES.PROFILE} className="menuOptions--optionList__item--button ">
                                <i className="fas fa-user" /> Perfil
                            </Link>
                        </li>
                        {userIsManager ? (
                            <>
                                <li className="menuOptions--optionList__item ">
                                    <Link to={ROUTES.NEW_BIKE} className="menuOptions--optionList__item--button ">
                                        <i className="fas fa-sign-in-alt" />
                                        Add New Bike
                                    </Link>
                                </li>
                                <li className="menuOptions--optionList__item ">
                                    <Link to={ROUTES.RESERVATIONS} className="menuOptions--optionList__item--button ">
                                        <i className="fas fa-sign-in-alt" />
                                        My Reservations
                                    </Link>
                                </li>
                                <li className="menuOptions--optionList__item ">
                                    <Link to={ROUTES.BIKES} className="menuOptions--optionList__item--button ">
                                        <i className="fas fa-map-marker-alt" />
                                        Bikes
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li className="menuOptions--optionList__item ">
                                <Link to={ROUTES.USERS} className="menuOptions--optionList__item--button ">
                                    <i className="far fa-calendar" /> Manage Users
                                </Link>
                            </li>
                        )}
                        <li className="menuOptions--optionList__item ">
                            <button
                                type="button"
                                onClick={() => setShowDialog(true)}
                                className="menuOptions--optionList__item--button "
                            >
                                <i className="fas fa-sign-out-alt" />
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <li className="menuOptions--optionList__item ">
                        <Link to={ROUTES.LOGIN} className="menuOptions--optionList__item--button ">
                            <i className="fas fa-sign-in-alt" />
                            Login
                        </Link>
                    </li>
                )}
            </ul>
            {showDialog ? (
                <ConfirmationDialog onCancel={() => setShowDialog(false)} onDelete={() => handleLogOut()} text="sair" />
            ) : null}
        </StyledMenuOptions>
    )
}
export default MenuOptions
const StyledMenuOptions = styled.nav`
    position: absolute;
    left: -100vh;
    top: 0;
    height: 100vh;
    width: 100%;
    background: white;
    padding: 10px 40px;
    transition: all 0.5s ease-in-out;
    max-height: 0;
    overflow: hidden;
    &.open {
        transform: translateX(100vh);
        max-height: 100vh;
    }
    .menuOptions {
        &--header {
            display: flex;
            border: none;
            background: transparent;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            &__title {
                color: var(--red);
            }
            i {
                color: var(--yellow);
            }
        }
        &--optionList {
            padding: 0;
            &__item {
                list-style: none;
                &--button {
                    display: flex;
                    align-items: center;
                    padding: 10px;
                    border-radius: 10px;
                    padding: 18px 0;
                    border: none;
                    background: white;
                    text-decoration: none;
                    font-size: 18px;
                    &,
                    &:visited {
                        color: var(--dark-blue);
                    }
                    i {
                        margin-right: 8px;
                        color: var(--yellow);
                    }
                }
                &:hover {
                    background: lightblue;
                }
            }
        }
    }
`
