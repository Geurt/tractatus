import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Introduction.css'

const Introduction = () => (
    <div className="Introduction">
        <h1>Tractatus Logico-Philosophicus</h1>
        <Link to='/1'>&gt; enter &lt;</Link>
    </div>
)

export default Introduction
