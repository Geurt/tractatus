import React from 'react'
import { connect } from 'react-redux'

import Modal from './Modal'
import DisplayedProposition from './DisplayedProposition'
import { hideProposition } from '../actions/display'
import { findAncestry } from '../selectors/propositions'

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
        this.props.dispatch(hideProposition())
    }
    render() {
        const propositionAncestry = this.props.propositionAncestry
        if (this.props.display) {
            return (
                <Modal onExit={this.onExit} >
                    <div className="displayedPropositionsContainer">
                        { propositionAncestry.map((proposition, i, arr) => (
                            <DisplayedProposition 
                                key={ i }
                                ref={ i === arr.length - 1 ? this.lastProposition : undefined }
                                proposition={ proposition } />
                        ))}
                    </div>
                </Modal>
            )
        } else { return null }
    }
}

const mapStateToProps = (state) => ({
    display: state.display.displayProposition,
    propositionAncestry: findAncestry(state.propositions.selectedPropositionNumber, state.propositions.rootPropositionNode)
})

export default connect(mapStateToProps)(PropositionDisplay)
