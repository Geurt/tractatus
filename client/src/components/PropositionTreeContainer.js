import React from 'react'
import { connect } from 'react-redux'

import { fetchRootPropositionNode, selectProposition } from '../actions/propositions'
import { setLoading } from '../actions/loader'
import PropositionTree from './PropositionTree'
import { Navigation } from './Navigation'
import Loader from './Loader'

import '../styles/main.css'

class PropositionTreeContainer extends React.Component {
    componentDidMount() {
        const propositionNumber = this.props.match.params.number
        const rootNumber = propositionNumber.charAt(0)

        // set loading state
        this.props.dispatch(setLoading())
        // fetch and set root proposition here
        this.props.dispatch(fetchRootPropositionNode(rootNumber))

        // set selectedPropositionNumber on state
        if (propositionNumber.length > 1) {
            this.props.dispatch(selectProposition(propositionNumber))
        }
    }

    render() {
        return (
            this.props.loading ? <Loader /> :
            <div>
                <PropositionTree rootPropositionNode={this.props.rootPropositionNode} />
                <Navigation rootNumber={this.props.match.params.number.charAt(0)} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        rootPropositionNode: state.propositions.rootPropositionNode,
        loading: state.loader.loading
    }
}

export default connect(mapStateToProps)(PropositionTreeContainer)
