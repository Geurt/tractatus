import React from 'react'

import '../styles/variables.css'
import '../styles/propositionTree.css'

import PropositionNode from '../components/PropositionNode'

const PropositionTree = ({ rootPropositionNode, foreground }) => (
            <div className={ foreground ? "rootNodeContainer foreground" : "rootNodeContainer background"}>
                <PropositionNode node={rootPropositionNode}/>
            </div>
)

export default PropositionTree
