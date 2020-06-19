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
                {/*
                We render the tree once as background and once as foreground;
                this is a bit of a visual hack to avoid a flickering effect
                due to the z-index of the selected ancestry changing.
                Due to stacking context it is unavoidable that non-selected sibling's z-index
                also changes. So instead we hide non-selected nodes altogether;
                and we see the background.
                */}
                <PropositionTree foreground={false} rootPropositionNode={this.props.rootPropositionNode} />
                <PropositionTree foreground={true} rootPropositionNode={this.props.rootPropositionNode} />
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
