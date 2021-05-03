import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../styles/navigation.css'
import { ReactComponent as ChevronUp } from '../images/lnr-chevron-up.svg'
import { ReactComponent as ChevronDown } from '../images/lnr-chevron-down.svg'
import { ReactComponent as ExpandIcon } from '../images/lnr-frame-expand.svg'

import { setGerman, setEnglish } from '../actions/languages'

class Navigation extends React.Component {
    changeLanguage = () => {
        if (this.props.language === 'english') { 
            this.props.dispatch(setGerman()) 
        } else if (this.props.language === 'german') {
            this.props.dispatch(setEnglish()) 
        }
    }
    toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen()
          }
        }
    }
    render() {
        const number = parseInt(this.props.rootNumber)
        return (
            <div className="Menu">
                <div className="Menu__group">
                    <Link className="Menu__button Menu__button--info" to='/introduction'>?</Link>
                </div>
                <nav className="Menu__group Menu__navigation">
                    { number > 1 && 
                        <Link className="Menu__navigation-link Menu__navigation-link--previous" to={`/${number - 1}`}>
                            <ChevronUp className="Menu__icon"/>
                        </Link> }
                    { [1,2,3,4,5,6,7].map((i) => 
                        <Link 
                            className={i === number ? "Menu__navigation-link active" : "Menu__navigation-link"}
                            key={i} 
                            to={`/${i}`}>
                            {i}
                        </Link>) }
                    { number < 7 && 
                        <Link className="Menu__navigation-link Menu__navigation-link--next" to={`/${number + 1}`}>
                            <ChevronDown className="Menu__icon"/>
                        </Link> }
                </nav>
                <div className="Menu__group">
                    <button
                        className="Menu__button toggle_language"
                        data-testid="toggle_language"
                        onClick={this.changeLanguage}
                    >E|D</button>
                    <button className="Menu__button" onClick={this.toggleFullScreen}>
                        <ExpandIcon className="Menu__icon"/>
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    language: state.language
})

export default connect(mapStateToProps)(Navigation)