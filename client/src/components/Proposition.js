import React from 'react';
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
