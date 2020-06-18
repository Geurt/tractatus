import React from 'react'
import { connect } from 'react-redux'

import { fetchRootPropositionNode } from '../actions/propositions'
import PropositionTree from './PropositionTree'
import { Navigation } from './Navigation'

import '../styles/main.css'

class PropositionTreeContainer extends React.Component {
    componentDidMount() {
        const propositionNumber = this.props.match.params.number
        const rootNumber = propositionNumber.charAt(0)

        // fetch and set root proposition here
        this.props.dispatch(fetchRootPropositionNode(rootNumber))

        // set selectedPropositionNumber on state
        // set loading state
    }
    // componentDidUpdate() {
    //     console.log("updated")
    // }
    render() {
        return (
            <div>
                <PropositionTree rootPropositionNode={this.props.rootPropositionNode} />
                <Navigation rootNumber={this.props.match.params.number.charAt(0)} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        rootPropositionNode: state.rootPropositionNode
    }
}

export default connect(mapStateToProps)(PropositionTreeContainer)
