import React from 'react'
import { Link } from 'react-router-dom'

import { addDot } from '../utilities/propositions'
import parse from 'html-react-parser'

const DisplayedPropositionContent = ({proposition, language}) => (
    <>
        <h2 className="displayed-proposition__number">
            <Link to={`/${proposition.number}/display`}>
                {addDot(proposition.number)}
            </Link>
        </h2>
        <p className="displayed-proposition__text proposition__text">
            {parse(proposition[language])}
            {proposition[`${language}Footnote`] && <sup>*</sup>}
        </p>
        {proposition[`${language}Footnote`] &&
            <p className="footnote">
                {parse(proposition[`${language}Footnote`])}
            </p>}
    </>
)

export default DisplayedPropositionContent
