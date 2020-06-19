import React from 'react'

const ConnectedPropositionNode = (props) => (
    <div className="MockedChild">
        Mocked Child {props.node.number}
    </div>
)

export default ConnectedPropositionNode
