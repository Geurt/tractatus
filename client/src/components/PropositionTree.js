import React from 'react'
import PropTypes from 'prop-types'

import '../styles/variables.css'
import '../styles/propositionTree.css'

import PropositionNode from '../components/PropositionNode'

const PropositionTree = ({ rootPropositionNode, foreground }) => (
            <div className={ foreground ? "rootNodeContainer foreground" : "rootNodeContainer background"}>
                <PropositionNode node={rootPropositionNode}/>
            </div>
)

export default PropositionTree

PropositionTree.propTypes = {
    foreground: PropTypes.bool,
    rootPropositionNode: PropTypes.object
}