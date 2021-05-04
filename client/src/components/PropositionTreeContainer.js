import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import { setSavedRootPropositionNode, fetchRootPropositionNode, selectProposition } from '../actions/propositions'
import { setLoading } from '../actions/loader'
import PropositionTree from './PropositionTree'
import PropositionPreview from './PropositionPreview'
import PropositionDisplay from './PropositionDisplay'
import Navigation from './Navigation'
import Loader from './Loader'

class PropositionTreeContainer extends React.Component {
    constructor(props) {
        super(props)
        this.centerView = React.createRef()
    }
    componentDidMount() {
        const propositionNumber = this.props.match.params.number
        const rootNumber = propositionNumber.charAt(0)

        const needsToLoad = !this.props.loadedNumbers[rootNumber]
        // we fetch the rootproposition if it isn't already loaded not already loaded
        // else we use the saved version and don't bother fetching

        if (needsToLoad) {
            this.props.dispatch(setLoading())
            // fetch and set root proposition here
            this.props.dispatch(fetchRootPropositionNode(rootNumber))
        } else {
            this.props.dispatch(setSavedRootPropositionNode(rootNumber))
        }

        // set selectedPropositionNumber on state (for propositions further down the tree)
        // and also for root propositions, but ONLY when on display
        const isOnDisplay = this.props.location.pathname.match(/\/(\d)\/display/)
        if (propositionNumber.length > 1 || isOnDisplay) {
            this.props.dispatch(selectProposition(propositionNumber))
        }
        
        // we scroll the viewContainer into view (so on smaller devices we can scroll)
        if (this.centerView.current) {
            this.centerView.current.scrollIntoView({
                behavior: "auto",
                block: "start",
                inline: "start"
            })
        }
    }
    render() {
        return (
            <div className="viewCanvas">
                {!this.props.loading && <>
                    <Navigation rootNumber={this.props.match.params.number.charAt(0)} />
                    <PropositionPreview />
                    <Route path='/:number/display'>
                        <PropositionDisplay />
                    </Route>
                </>}
                <div className="viewContainer" ref={this.centerView}>                
                    {this.props.loading ? <Loader /> : <>
                        {/*
                        We render the tree once as background and once as foreground;
                        this is a bit of a visual hack to avoid a flickering effect
                        due to the z-index of the selected ancestry changing.
                        Due to stacking context it is unavoidable that non-selected sibling's z-index
                        also changes. So instead we hide non-selected nodes altogether;
                        and we see the background.
                        */}
                        <PropositionTree foreground={true} rootPropositionNode={this.props.rootPropositionNode} />
                        <PropositionTree foreground={false} rootPropositionNode={this.props.rootPropositionNode} />
                        </>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loadedNumbers: state.savedRootPropositions.map(prop => !!prop),
        rootPropositionNode: state.propositions.rootPropositionNode,
        loading: state.loader.loading
    }
}

export default connect(mapStateToProps)(PropositionTreeContainer)

PropositionTreeContainer.propTypes = {
    loading: PropTypes.bool,
    rootPropositionNode: PropTypes.object,
    loadedNumbers: PropTypes.array
}