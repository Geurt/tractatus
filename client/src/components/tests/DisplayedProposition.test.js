import React from 'react'
import { render } from '@testing-library/react'
import DisplayedProposition from '../DisplayedProposition'
import { proposition } from '../../fixtures/testPropositions'
import { BrowserRouter as Router } from 'react-router-dom'

it('renders a proposition correctly', () => {
    const { getByText } = render(
        <Router>
            <DisplayedProposition 
                proposition={proposition}/>
        </Router>)
    expect(getByText(/Proposition/).textContent).toBe('Proposition 123')
})