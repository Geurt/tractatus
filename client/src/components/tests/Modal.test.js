import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Modal from '../Modal'

it('displays content passed to it', () => {
    const child = <p>Passed content</p>
    const { getByText } = render(<Modal children={ child }/>)

    expect(getByText(/Passed/).textContent).toBe('Passed content')
})

it('exits on clicking background', () => {
    const onExit = jest.fn()

    const { getByTestId } = render(<Modal onExit={onExit}/>)

    fireEvent.click(getByTestId('modal-background'))

    expect(onExit).toHaveBeenCalledTimes(1)
})