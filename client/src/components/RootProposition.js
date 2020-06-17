import React from 'react'
import { connect } from 'react-redux'
import '../styles/main.css'

import { fetchRootPropositionNode } from '../actions/propositions'
import PropositionNode from '../components/PropositionNode'

class RootProposition extends React.Component {
    componentDidMount() {
        const propositionNumber = this.props.match.params.number
        const rootNumber = propositionNumber.charAt(0)

        // fetch and set root proposition here
        this.props.dispatch(fetchRootPropositionNode(rootNumber))
    }
    render() {
        return (
            <div className="rootNodeContainer">
                <PropositionNode node={this.props.rootPropositionNode}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        rootPropositionNode: state.rootPropositionNode
    }
}

export default connect(mapStateToProps)(RootProposition)
