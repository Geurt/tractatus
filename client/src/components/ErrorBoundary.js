import React from 'react'
import { connect } from 'react-redux'
import { setError } from '../actions/errors'
import '../styles/ErrorBoundary.css'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    componentDidCatch(error) {
        // I set errors through the store to have their handling centralized
        // (so we can use this on fetch calls as well)
        this.props.dispatch(setError())
    }

    render() {
        if (this.props.hasError) {
            return (
                <div className="error_message">
                    <h2>Something went wrong.</h2>
                    <p>(try <span className="try_reloading" onClick={()=>{window.location.reload()}}>reloading</span> the page)</p>
                </div>
            )}
        return this.props.children
    }
}

const mapStateToProps = (state) => ({
    hasError: state.errors.hasError
})

export default connect(mapStateToProps)(ErrorBoundary)
