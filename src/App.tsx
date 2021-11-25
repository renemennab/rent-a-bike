import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getBikes } from './actions/bikeActions'
import MenuOptions from './navBar/menuOptions'
import NavBar from './navBar/navBar'

const App = function (): JSX.Element {
    const dispatch = useDispatch()
    const [selectedView, setSelectedView] = useState('map')

    useEffect(() => {
        dispatch(getBikes)
    }, [])

    return (
        <Router>
            <AppStyles className="App">
                <main>
                    <Switch>
                        <Route path="/">
                            <NavBar selectedView={selectedView} setSelectedView={setSelectedView} />
                            <MenuOptions selectedView={selectedView} setSelectedView={setSelectedView} />
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
