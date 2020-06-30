import React from 'react'
import { render } from '@testing-library/react'

import PropositionTree from '../PropositionTree'
import { rootPropositionNode } from '../../fixtures/testPropositions'

// mock store
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
const mockStore = configureStore()

it('should render a tree of propositions', () => {
    const initialState = {
        propositions: {
            selectedPropositionNumber: undefined
        }
    }
    const store = mockStore(initialState)
    const { getByText } = render(
        <Provider store={store}>
            <PropositionTree 
                rootPropositionNode = { rootPropositionNode }
                foreground = { false }
            />
        </Provider>
        )

    // Let's just check the leaf node:
    expect(getByText(/1.11/).textContent).toBe('1.11')
});
