// This sets some parameters to be passed to CSS as vars for the visual graph layout
// (angles, edge length etc)
// We do this here, because pure CSS is not up to the job; 
// (almost, but not quite... problems include compensating rotation angle; while allowing overrides)

// We will call this with TLP and apply to all children
const addStyleParams = (node, parentNode = undefined) => {
    addParamsForNode(node, parentNode)
    if (node.children) {
        node.children.forEach((childNode) => addStyleParams(childNode, node))
    }
}

const addParamsForNode = (node, parentNode) => {
    // All params are based on: depth level, number of sibling, and sibling index.
    // First compute these.

    // the depth level to the propositions (distance from root)
    // (note that the TLP is 0; the seven main props are level 1)
    node.level = parentNode ? parentNode.level + 1 : 0
    // the number of siblings including self (remove empty slots first)
    const siblings = parentNode ? parentNode.children.filter((c) => c !== null) : undefined
    const siblingsNumber = siblings ? siblings.length : 1
    // finally, the index in the siblings
    const siblingsIndex = siblings ? siblings.indexOf(node) : 0

    // Now on the base of the depth we set a maximum spread angle for the children
    const spreadsForLevels = [0,0,360,100,100,100,100]
    const spread = spreadsForLevels[node.level]

    // From this we compute the node's desired rotation angle
    // (first check is not to divide by zero; 
    // if there are multiple siblings, they all get an equal piece of the spread;
    // and the whole is offset by half the spread, to set it symmetrically)
    node.angle = siblingsNumber > 1 ? spread / 2 - siblingsIndex * spread / ( siblingsNumber - 1 ) : 0

    // The children of the root proposition are an exception here:
    // (they are spread over a "closed" 360 degrees, so their formula works differently)
    if (node.level === 2) {
        node.angle = siblingsIndex * spread / siblingsNumber
    }

    // We keep track of a compensating angle to set the proposition text horizontally:
    node.compensatingAngle = parentNode ? parentNode.compensatingAngle - node.angle : 0

}

module.exports = {
    addStyleParams
}
