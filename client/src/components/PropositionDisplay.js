import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Modal from './Modal'
import DisplayedProposition from './DisplayedProposition'
import { findAncestry, findPreviousSiblingNumber, findNextSiblingNumber } from '../selectors/propositions'
import { history } from '../router/AppRouter'

import '../styles/PropositionDisplay.css'

class PropositionDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.lastProposition = React.createRef()
    }
    componentDidUpdate() {
        if (this.lastProposition.current) {
            this.lastProposition.current.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        }
    }
    onExit = () => {
        history.push(`/${this.props.selectedPropositionNumber}`)
    }
    render() {
        const propositionAncestry = this.props.propositionAncestry
        return (
            <Modal onExit={this.onExit} >
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
    propositionAncestry: findAncestry(state.propositions.selectedPropositionNumber, state.propositions.rootPropositionNode)
})

export default connect(mapStateToProps)(PropositionDisplay)
