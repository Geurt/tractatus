import React from 'react';

const Proposition = ({ proposition }) => {
    let number = proposition.number
    if (number.length > 1) {
        number = number[0] + '.' + number.slice(1,)
    }

    return (
        <div className="Proposition">
            <p className="Proposition__number">{number}</p>
        </div>
    )
}

export default Proposition
