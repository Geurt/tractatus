import React from 'react'
import '../styles/Modal.css'
import PropTypes from 'prop-types'

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

Modal.propTypes = {
    children: PropTypes.element,
    onExit: PropTypes.func
}
