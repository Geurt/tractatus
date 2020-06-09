import React from 'react';
import PropositionNode from './PropositionNode';

const Proposition = ({ proposition }) => {
    return (
        <div>
            <p>{proposition.number}</p>
        </div>
    )
}

export default Proposition
