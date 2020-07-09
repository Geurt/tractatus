import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../styles/Navigation.css'

import { setGerman, setEnglish } from '../actions/languages'

class Navigation extends React.Component {
    changeLanguage = () => {
        if (this.props.language === 'english') { 
            this.props.dispatch(setGerman()) 
        } else if (this.props.language === 'german') {
            this.props.dispatch(setEnglish()) 
        }
    }
    render() {
        const number = parseInt(this.props.rootNumber)
        return (
            <nav className="Navigation">
                { number > 1 && <Link className="Navigation__link Navigation__link--previous" to={`/${number - 1}`}>{`<${number - 1} `}</Link> }
                { number < 7 && <Link className="Navigation__link Navigation__link--next" to={`/${number + 1}`}>{` ${number + 1}>`}</Link> }
                <p
                    className="toggle_language"
                    data-testid="toggle_language"
                    onClick={this.changeLanguage}
                >E|D</p>
            </nav>
        )
    }
}

const mapStateToProps = (state) => ({
    language: state.language
})

export default connect(mapStateToProps)(Navigation)