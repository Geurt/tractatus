import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import Modal from './Modal'
import DisplayedProposition from './DisplayedProposition'
import { findAncestry, findPreviousSiblingNumber, findNextSiblingNumber } from '../selectors/propositions'
import { setExpand, setContract } from '../actions/expand'

import '../styles/PropositionDisplay.css'

export class PropositionDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.lastProposition = React.createRef()
    }
    componentDidMount() {
        if (this.lastProposition.current) {
            this.lastProposition.current.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        }
    }
    onExit = () => {
        // to access history on props, we export below through withRouter()
        this.props.history.push(`/${this.props.selectedPropositionNumber}`)
    }
    expandContract = () => {
        if (this.props.expandContract === 'contracted') { 
            this.props.dispatch(setExpand()) 
        } else if (this.props.expandContract === 'expanded') {
            this.props.dispatch(setContract()) 
        }
    }
    render() {
        const propositionAncestry = this.props.propositionAncestry

        return (
            <Modal onExit={this.onExit} >
                <button onClick={this.expandContract} className="displayed-propositions-expand-contract-button">
                    {this.props.expandContract === 'contracted' ? '+' : '\u2013'}
                </button>
                <div className="displayed-propositions-container">
                    { propositionAncestry.map((proposition, i, arr) => (
                        <DisplayedProposition 
                            key={ i }
                            ref={ i === arr.length - 1 ? this.lastProposition : undefined }
                            proposition={ proposition } />
                    ))}
                    <nav className="displayed-propositions-container__link-container">
                        { this.props.previousSiblingNumber &&
                            <Link className="ddisplayed-propositions-container__link--previous displayed-propositions-container__link" 
                                to={`/${this.props.previousSiblingNumber}/display`}>{ `< ${this.props.previousSiblingNumber}` }</Link>
                        }
                        { this.props.nextSiblingNumber &&
                            <Link className="displayed-propositions-container__link--next displayed-propositions-container__link" 
                            to={`/${this.props.nextSiblingNumber}/display`}>{ `${this.props.nextSiblingNumber} >` }</Link>
                        }
                    </nav>
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => ({
    previousSiblingNumber: findPreviousSiblingNumber(state.propositions.selectedPropositionNumber, state.propositions.rootPropositionNode),
    nextSiblingNumber: findNextSiblingNumber(state.propositions.selectedPropositionNumber, state.propositions.rootPropositionNode),
    selectedPropositionNumber: state.propositions.selectedPropositionNumber,
    propositionAncestry: findAncestry(state.propositions.selectedPropositionNumber, state.propositions.rootPropositionNode),
    expandContract: state.expandContract
})

export default connect(mapStateToProps)(withRouter(PropositionDisplay))

PropositionDisplay.propTypes = {
    propositionAncestry: PropTypes.array,
    nextSiblingNumber: PropTypes.string,
    previousSiblingNumber: PropTypes.string,
    selectedPropositionNumber: PropTypes.string
}