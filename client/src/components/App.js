import React from 'react'
import { connect } from 'react-redux'
import '../styles/main.css'

import { fetchRootPropositionNode } from '../actions/propositions'
import PropositionNode from '../components/PropositionNode'

class App extends React.Component {
    componentDidMount() {
        // fetch and set root proposition here
        this.props.dispatch(fetchRootPropositionNode())
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

export default connect(mapStateToProps)(App)
