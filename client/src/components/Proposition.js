import React from 'react'
import PropTypes from 'prop-types'

import { addDot } from '../utilities/propositions'

const Proposition = ({ proposition }) => {
    const number = addDot(proposition.number)

    return (
        <div className="Proposition">
            <p className="Proposition__number">{number}</p>
        </div>
    )
}

export default Proposition

Proposition.propTypes = {
    proposition: PropTypes.shape({
        number: PropTypes.string
    })
}