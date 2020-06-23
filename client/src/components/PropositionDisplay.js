import React from 'react'
import { connect } from 'react-redux'

import Modal from './Modal'
import DisplayedProposition from './DisplayedProposition'
import { findAncestry } from '../selectors/propositions'
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
    }
}

const mapStateToProps = (state) => ({
    selectedPropositionNumber: state.propositions.selectedPropositionNumber,
    propositionAncestry: findAncestry(state.propositions.selectedPropositionNumber, state.propositions.rootPropositionNode)
})

export default connect(mapStateToProps)(PropositionDisplay)
