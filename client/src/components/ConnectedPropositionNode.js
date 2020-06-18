import React from 'react';
import PropositionNode from './PropositionNode'

import { connect } from 'react-redux'

// This onlyexists as a separate component because we use it recursively in PropositionNode,
// and then we cannot use the connected version in the same file
const ConnectedPropositionNode = (props) => (<PropositionNode {...props}/>)

export default connect()(ConnectedPropositionNode)
