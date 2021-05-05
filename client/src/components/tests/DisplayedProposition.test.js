import React from 'react'
import { render } from '@testing-library/react'
import DisplayedProposition from '../DisplayedProposition'
import { proposition, rootPropositionNode } from '../../fixtures/testPropositions'
import { BrowserRouter as Router } from 'react-router-dom'

// mock store
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
const mockStore = configureStore()
const initialState = {
    language: 'english',
    propositions: {
        rootPropositionNode
    }
}
const store = mockStore(initialState)

it('renders a proposition correctly', () => {
    const { getByText } = render(
        <Router>
            <Provider store={store}>
                <DisplayedProposition 
                    proposition={proposition}/>
            </Provider>
        </Router>)
    expect(getByText(/Proposition/).textContent).toBe('Proposition 123')
})