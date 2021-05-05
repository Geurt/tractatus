import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import { PropositionDisplay } from '../PropositionDisplay'
import { propositionAncestry, rootPropositionNode } from '../../fixtures/testPropositions'

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

beforeEach(() => {
    jest.mock('../../router/AppRouter')
})

it('should render the proposition ancestry', () => {
    const { getAllByText, getByText } = render(
        <Router>
            <Provider store={store}>
                <PropositionDisplay propositionAncestry={ propositionAncestry } />
            </Provider>
        </Router>
        )
    expect(getAllByText(/Proposition/)).toHaveLength(3)
    expect(getByText(/Proposition 123/)).toHaveTextContent('Proposition 123')
})

it('should exit on clicking background', () => {
    const mockHistory = {
        push: jest.fn()
    }

    const { getByTestId } = render(
        <Router>
            <Provider store={store}>
                <PropositionDisplay propositionAncestry={ propositionAncestry } history={ mockHistory } />
            </Provider>    
        </Router>
        )

    fireEvent.click(getByTestId('modal-background'))

    expect(mockHistory.push).toHaveBeenCalled()

})
