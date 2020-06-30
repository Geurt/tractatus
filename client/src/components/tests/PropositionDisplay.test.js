import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import { PropositionDisplay } from '../PropositionDisplay'
import { propositionAncestry } from '../../fixtures/testPropositions'

beforeEach(() => {
    jest.mock('../../router/AppRouter')
})

it('should render the proposition ancestry', () => {
    const { getAllByText, getByText } = render(
        <Router>
            <PropositionDisplay propositionAncestry={ propositionAncestry } />
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
            <PropositionDisplay propositionAncestry={ propositionAncestry } history={ mockHistory } />
        </Router>
        )

    fireEvent.click(getByTestId('modal-background'))

    expect(mockHistory.push).toHaveBeenCalled()

})
