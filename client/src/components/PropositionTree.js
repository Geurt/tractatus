import React from 'react'

import '../styles/propositionTree.css'

import PropositionNode from '../components/PropositionNode'

const PropositionTree = ({ rootPropositionNode }) => (
            <div className="rootNodeContainer">
                <PropositionNode node={rootPropositionNode}/>
            </div>
)

export default PropositionTree
