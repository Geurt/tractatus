import React from 'react'
import { connect } from 'react-redux'
import parse from 'html-react-parser'

import '../styles/PropositionPreview.css'
import { findProposition } from '../selectors/propositions'
import { addDot } from '../utilities/propositions'

class PropositionPreview extends React.Component {
    render() {
        const proposition = this.props.proposition
        const propositionNumber = proposition ? addDot(proposition.number) : undefined
        const propositionText = proposition ? proposition.text : undefined

        return (
            <div className="PropositionPreview">
                <h2 className="PropositionPreview--number">{ propositionNumber }</h2>
                <p className="PropositionPreview--text">{ propositionText ? parse(propositionText) : null }</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    display: state.display.displayProposition,
    propositionNumber: state.propositions.selectedPropositionNumber,
    proposition: findProposition(state.propositions.selectedPropositionNumber, state.propositions.rootPropositionNode)
})

export default connect(mapStateToProps)(PropositionPreview)
