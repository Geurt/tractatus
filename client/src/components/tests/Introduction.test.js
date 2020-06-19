import React from "react"
import { render, unmountComponentAtNode } from "react-dom"
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from "react-dom/test-utils"

import Introduction from '../Introduction'

let container = null
beforeEach(() => {
    // set up
    container = document.createElement("div")
    document.body.appendChild(container)
})

afterEach(() => {
    // clean up
    unmountComponentAtNode(container)
    container.remove()
    container = null
})

test('Introduction renders', () => {
    act(() => {
        // needs router because of a Link component; these cant be used outside router (as when rendering here on its own)
        render(
            <Router>
                <Introduction />
            </Router>
            , container)
    })
    expect(container.textContent).toContain('Tractatus')
})
