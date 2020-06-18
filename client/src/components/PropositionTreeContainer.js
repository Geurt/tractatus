import React from 'react'
import { connect } from 'react-redux'

import { fetchRootPropositionNode } from '../actions/propositions'
import PropositionTree from './PropositionTree'

class PropositionTreeContainer extends React.Component {
    componentDidMount() {
        const propositionNumber = this.props.match.params.number
        const rootNumber = propositionNumber.charAt(0)

        // fetch and set root proposition here
        this.props.dispatch(fetchRootPropositionNode(rootNumber))
    }
    render() {
        return (
            <PropositionTree rootPropositionNode={this.props.rootPropositionNode}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        rootPropositionNode: state.rootPropositionNode
    }
}

export default connect(mapStateToProps)(PropositionTreeContainer)
