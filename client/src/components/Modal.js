import React from 'react'
import '../styles/Modal.css'

const Modal = (props) => (
    <div className="Modal">
        <div className="Modal--background"
                onClick={props.onExit}></div>
        <div className="Modal--children">
            { props.children }
        </div>
    </div>
)

export default Modal
