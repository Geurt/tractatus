import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'

import PropositionTreeContainer from '../components/PropositionTreeContainer'
import Introduction from '../components/Introduction'
import NotFound from '../components/NotFound'
import ErrorBoundary from '../components/ErrorBoundary'

import { createBrowserHistory } from "history"

export const history = createBrowserHistory()

const AppRouter = () => (
    <Router history={history}>
        <Switch>
            <Route path="/" component={Introduction} exact={true}/>
            {/* The key is a trick to trigger a new mount when the params change: */}
            <ErrorBoundary>
                <Route 
                    path="/:number"
                    render={props => <PropositionTreeContainer
                        key={props.match.params.number}
                        {...props}/>}
                />
            </ErrorBoundary>
            <Route component={NotFound} />
        </Switch>
    </Router>
)

export default AppRouter
