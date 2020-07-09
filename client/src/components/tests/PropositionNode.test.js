import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from "react-dom/test-utils"

import { PropositionNode } from '../PropositionNode'

let container = null

// we mock the connected component that is rendered as a child
jest.mock('../ConnectedPropositionNode')

beforeEach(() => {
    // set up
    container = document.createElement("div")
    document.body.appendChild(container)

})

afterEach(() => {
    // clean up
    jest.clearAllMocks()
    unmountComponentAtNode(container)
    container.remove()
    container = null
})

test('Should render its proposition', () => {
    const propositionNode = {
        number: "123",
        angle: 10,
        compensatingAngle: -10,
        proposition: {
            number: "123",
            text: "Lorem"
        },
        children: []
    }

    act(() => {
        render(
            <PropositionNode node={propositionNode} />
            , container)
    })

    expect(container.querySelector('.Proposition__number').textContent).toContain("1.23")
})

test('Should render its children recursively', () => {
    const childNode = {
        number: "456",
        angle: 10,
        compensatingAngle: -10,
        proposition: {
            number: "456",
            text: "Lorem"
        },
        children: []
    }

    const propositionNode = {
        number: "123",
        angle: 10,
        compensatingAngle: -10,
        proposition: {
            number: "123",
            text: "Lorem"
        },
        children: [ childNode ]
    }

    act(() => {
        render(
            <PropositionNode node={propositionNode} />
            , container)
    })

    expect(container.querySelector('.MockedChild').textContent).toContain("Mocked Child")
    expect(container.querySelector('.MockedChild').textContent).toContain(childNode.number)
})
