import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import PropositionTreeContainer from '../components/PropositionTreeContainer'
import Introduction from '../components/Introduction'
import NotFound from '../components/NotFound'

const AppRouter = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={Introduction} exact={true}/>
            <Route path="/:number" component={PropositionTreeContainer} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
)

export default AppRouter
