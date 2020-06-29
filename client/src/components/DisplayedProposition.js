import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { addDot } from '../utilities/propositions'
import parse from 'html-react-parser'

import '../styles/propositionParsing.css'

// we forward the ref from the PropositionDislay container for scrolling to the last element
const DisplayedProposition = React.forwardRef((props, ref) => {
    const proposition = props.proposition
    if (proposition === undefined) {
        return null
    } else {
        return (
            <div ref={ref} className="displayed-proposition">
                <h2 className="displayed-proposition__number">
                    <Link to={`/${proposition.number}/display`}>
                        {addDot(proposition.number)}
                    </Link>
                </h2>
                <p className="displayed-proposition__text proposition__text">
                    {parse(proposition.text)}
                </p>
            </div>
        )
    }
})

export default DisplayedProposition

DisplayedProposition.propTypes = {
    proposition: PropTypes.shape({
        number: PropTypes.string,
        text: PropTypes.string
    })
}