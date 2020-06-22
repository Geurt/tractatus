import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import PropositionTreeContainer from '../components/PropositionTreeContainer'
import Introduction from '../components/Introduction'
import NotFound from '../components/NotFound'

const AppRouter = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={Introduction} exact={true}/>
            {/* The key is a trick to trigger a new mount when the params change: */}
            <Route 
            path="/:number"
            render={props => <PropositionTreeContainer
                key={props.match.params.number}
                {...props}/>}
                />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
)

export default AppRouter
