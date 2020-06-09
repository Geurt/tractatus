import React from 'react'
import Proposition from './Proposition'

const PropositionNode = (props) => {
    const proposition = props.node.proposition
    // There may be empty elements in the children (corresponding to the sometimes 
    // unused zero indices in the Tractatus). We remove these in rendering.
    const children = props.node.children.filter((child) => child !== null)

    return (
        <div>
            {proposition && 
                <Proposition 
                    proposition={proposition}
                    />}

            {children.length > 0 && <ul>
                    {children.map((child) =>
                        <li>
                            <PropositionNode node={child}/>
                        </li>
                    )}
                </ul>}
                
        </div>
    )
}

export default PropositionNode