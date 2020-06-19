import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from "react-dom/test-utils"

import { Navigation } from '../Navigation'

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

test('Should render the right links', () => {
    act(() => {
        render(
            <Router>
                <Navigation rootNumber={"3"}/>
            </Router>
            , container)
    })

    expect(container.querySelector('.Navigation__link--previous').textContent).toContain("2")
    expect(container.querySelector('.Navigation__link--next').textContent).toContain("4")
})
