import React from 'react'
import { render as renderDOM, unmountComponentAtNode } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from "react-dom/test-utils"

import { render, fireEvent } from '@testing-library/react'

// mock store
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
const mockStore = configureStore()
const initialState = { language: 'english'}
const store = mockStore(initialState)


import Navigation from '../Navigation'

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
        renderDOM(
            <Provider store={store}>
                <Router>
                    <Navigation rootNumber={"3"}/>
                </Router>
            </Provider>
            , container)
    })

    expect(container.querySelector('.Menu__navigation-link--previous').textContent).toBeTruthy()
    expect(container.querySelector('.Menu__navigation-link--next').textContent).toBeTruthy()
})

test('Should toggle language on click', () => {
    const { getByTestId } = render(
        <Router>
            <Provider store={store}>
                <Navigation rootNumber={"3"}/>
            </Provider>
        </Router>)

    fireEvent.click(getByTestId('toggle_language'))
    const actions = store.getActions()
    expect(actions[0]).toEqual({
        type: 'SET_GERMAN'
    })
})