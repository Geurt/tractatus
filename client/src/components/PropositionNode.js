import React from 'react'
import { connect } from 'react-redux'

import Proposition from './Proposition'
import { displayProposition } from '../actions/display'
import { selectProposition } from '../actions/propositions'
import { isInSelectedAncestry } from '../selectors/propositions'

// A difficulty here: we cannot use the CONNECTED component recursively in the same file
// So we create a separate connected version, and use that for the child nodes below:
import ConnectedPropositionNode from './ConnectedPropositionNode'

export class PropositionNode extends React.Component {
    onSelectProposition = (e) => {
        e.stopPropagation()
        this.props.dispatch(selectProposition(this.props.node.number))
    }
    onDisplayProosition = (e) => {
        e.stopPropagation()
        this.props.dispatch(selectProposition(this.props.node.number))
        this.props.dispatch(displayProposition())
    }
    render() {
        const proposition = this.props.node.proposition
        // There may be empty elements in the children (corresponding to the sometimes 
        // unused zero indices in the Tractatus). We remove these in rendering.
        const children = this.props.node.children.filter((child) => child !== null)

        // In here we pass some layout params to the CSS through CSS-vars:
        const angle = this.props.node.angle
        const compensatingAngle = this.props.node.compensatingAngle

        // Finally, each node will recursively render its children:
        return (
            <div 
                onMouseOver={this.onSelectProposition}
                onClick={this.onDisplayProosition}
                className= {this.props.isInSelectedAncestry ? "PropositionNode active" : "PropositionNode"}
                style={{
                        "--rotation-angle": angle + "deg", 
                        "--compensating-angle": compensatingAngle + "deg"
                    }}>

                {proposition && <Proposition proposition={proposition} />}

                {children.length > 0 && 
                    <ul className="PropositionNode__children">
                        {children.map((child) =>
                            <li key={child.number} className="PropositionNode__child">
                                <ConnectedPropositionNode node={child}/>
                            </li>
                        )}
                    </ul>}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    // check if the proposition is in the ancestry path of the selected proposition
    isInSelectedAncestry: isInSelectedAncestry(ownProps.node.number, state.propositions.selectedPropositionNumber)
})

export default connect(mapStateToProps)(PropositionNode)
