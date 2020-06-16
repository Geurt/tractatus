import React from 'react'
import Proposition from './Proposition'

const PropositionNode = (props) => {
    const proposition = props.node.proposition
    // There may be empty elements in the children (corresponding to the sometimes 
    // unused zero indices in the Tractatus). We remove these in rendering.
    const children = props.node.children.filter((child) => child !== null)

    // In here we pass some layout params to the CSS through CSS-vars:
    const angle = props.node.angle
    const compensatingAngle = props.node.compensatingAngle

    // Finally, each node will recursively render its children:
    return (
        <div 
            className="PropositionNode"
            style={{
                    "--rotation-angle": angle + "deg", 
                    "--compensating-angle": compensatingAngle + "deg"
                }}>

            {proposition && <Proposition proposition={proposition} />}

            {children.length > 0 && 
                <ul className="PropositionNode__children">
                    {children.map((child) =>
                        <li key={child.number} className="PropositionNode__child">
                            <PropositionNode node={child}/>
                        </li>
                    )}
                </ul>}
        </div>
    )
}

export default PropositionNode