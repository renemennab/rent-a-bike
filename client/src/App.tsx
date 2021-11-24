import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = function(): JSX.Element {
    return (
        <Router>
            <AppStyles className="App">
                <main>
                    <Switch>
                        <Route path="/">
                            <div>Hello Ionut</div>
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
