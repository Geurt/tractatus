import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import RootProposition from '../components/RootProposition'
import Introduction from '../components/Introduction'
import NotFound from '../components/NotFound'

const AppRouter = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={Introduction} exact={true}/>
            <Route path="/:number" component={RootProposition} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
)

export default AppRouter
