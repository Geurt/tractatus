import React from 'react'
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
                    {addDot(proposition.number)}
                </h2>
                <p className="displayed-proposition__text proposition__text">
                    {parse(proposition.text)}
                </p>
            </div>
        )
    }
})

export default DisplayedProposition
