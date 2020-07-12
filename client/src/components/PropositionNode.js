import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group'

import Proposition from './Proposition'
import { selectProposition } from '../actions/propositions'
import { isInSelectedAncestry, isSelected } from '../selectors/propositions'
import { history } from '../router/AppRouter'

// A difficulty here: we cannot use the CONNECTED component recursively in the same file
// So we create a separate connected version, and use that for the child nodes below:
import ConnectedPropositionNode from './ConnectedPropositionNode'

export class PropositionNode extends React.Component {
    onSelectProposition = (e) => {
        e.stopPropagation()
        this.props.dispatch(selectProposition(this.props.node.number))
    }
    onDisplayProposition = (e) => {
        e.stopPropagation()
        this.props.dispatch(selectProposition(this.props.node.number))
        history.push(`/${this.props.node.number}/display`)

    }
    render() {
        const proposition = this.props.node.proposition
        // There may be empty elements in the children (corresponding to the sometimes 
        // unused zero indices in the Tractatus). We remove these in rendering.
        const children = this.props.node.children.filter((child) => child !== null)

        // In here we pass some layout params to the CSS through CSS-vars:
        const angle = this.props.node.angle
        const compensatingAngle = this.props.node.compensatingAngle

        // classnames for highlighting effects
        const className = classNames({
            'PropositionNode': true,
            'active': this.props.isInSelectedAncestry,
            'selected': this.props.isSelected
        })

        // Finally, each node will recursively render its children:
        return (
            <CSSTransition
                    in={true}
                    timeout={10000}
                    classNames="grow"
                    appear>  
                <div 
                    onMouseOver={this.onSelectProposition}
                    onClick={this.onDisplayProposition}
                    className= {className}
                    style={{
                            "--rotation-angle": angle + "deg", 
                            "--compensating-angle": compensatingAngle + "deg",
                            "--level": this.props.node.number.length + "ms"
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
            </CSSTransition>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    // check if the proposition is in the ancestry path of the selected proposition
    isInSelectedAncestry: isInSelectedAncestry(ownProps.node.number, state.propositions.selectedPropositionNumber),
    isSelected: isSelected(ownProps.node.number, state.propositions.selectedPropositionNumber)
})

export default connect(mapStateToProps)(PropositionNode)

PropositionNode.propTypes = {
    isInSelectedAncestry: PropTypes.bool,
    node: PropTypes.shape({
        proposition: PropTypes.object,
        number: PropTypes.string,
        angle: PropTypes.number,
        compensatingAngle: PropTypes.number,
        children: PropTypes.array
    })
}
