import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/navigation.css'

export const Navigation = ({ rootNumber }) => {
    const number = parseInt(rootNumber)
    return (
        <nav className="Navigation">
            { number > 1 && <Link className="Navigation__link" to={`/${number - 1}`}>{`<${number - 1} `}</Link> }
            { number < 7 && <Link className="Navigation__link" to={`/${number + 1}`}>{` ${number + 1}>`}</Link> }
        </nav>
    )
}
