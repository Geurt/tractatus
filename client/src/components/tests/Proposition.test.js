import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from "react-dom/test-utils"

import Proposition from '../Proposition'

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

test('Should display the formatted proposition number', () => {
    const proposition = { 
        number: "123"
    }

    const formattedNumber = "1.23"

    act(() => {
        render(
            <Proposition proposition={proposition} />
            , container)
    })

    expect(container.querySelector('.Proposition__number').textContent).toEqual(formattedNumber)
})
