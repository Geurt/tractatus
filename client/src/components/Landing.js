import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Landing.css'
import TLPpic from '../images/tlpmotto.png'

const Landing = () => (
    <div className="Cover-container">
        <Link className="Cover-link" to='/1'>
            <img className="tlp-cover" src={TLPpic} alt="TLP cover"/>
        </Link>
    </div>
)

export default Landing
