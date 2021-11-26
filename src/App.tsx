import React, { useEffect } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getBikes } from './actions/bikeActions'
import { ROUTES } from './utils'
import BikesList from './bikes/bikesList'
import SelectedBike from './bikes/selectedBike'
import BikeForm from './bikes/bikeForm'
import HomePage from './home/homePage'
import Login from './login/login'
import UserProfileForm from './login/userProfileForm'

const App = function (): JSX.Element {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBikes)
    }, [])

    return (
        <Router>
            <AppStyles className="App">
                <main>
                    <Switch>
                        <Route path={`${ROUTES.NEW_BIKE}`}>
                            <BikeForm />
                        </Route>
                        <Route path={`${ROUTES.BIKES}/:bikeId/edit`}>
                            <BikeForm />
                        </Route>
                        <Route path={`${ROUTES.BIKES}/:bikeId`}>
                            <SelectedBike />
                        </Route>
                        <Route path={ROUTES.BIKES}>
                            <BikesList />
                        </Route>
                        <Route path="/signIn">
                            <UserProfileForm />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/">
                            <HomePage />
                        </Route>
                    </Switch>
                </main>
            </AppStyles>
        </Router>
    )
}

const AppStyles = styled.div`
    height: 100vh;
    width: 100%;
    main {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
`
export default App
