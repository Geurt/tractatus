export const isInSelectedAncestry = (number, selectedNumber = '') => {
    return selectedNumber.toString().startsWith(number.toString())
}

// because of the way we've structured the data, we can find propositions very efficiently:
export const findProposition = (number, rootNode) => {
    if (isNaN(number)) return undefined

    // a check if the number is in the right rootNode
    if (rootNode.number.toString() !== number.toString().charAt(0)) return undefined

    // we start at the top node
    let node = rootNode

    // We remove the first digit, which is the root proposition number
    // then we decend along the children, each digit representing a child
    // eg: '113' yields rootNode.children[1].children[1].children[3]
    number.toString().substr(1).split('').forEach((digit) => {
        if (node.children && node.children[digit]) {
            node = node.children[digit]
        }
    })

    if (node === undefined) return false
    return node.proposition ? node.proposition : undefined
}
