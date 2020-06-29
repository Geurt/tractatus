export const isInSelectedAncestry = (number, selectedNumber = '') => {
    return selectedNumber.toString().startsWith(number.toString())
}

// because of the way we've structured the data, we can find proposition nodes very efficiently:
export const findNode = (number, rootNode) => {
    try {
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
    
        return node
    } catch(e) {
        throw new Error(e)
    }
}

export const findProposition = (number, rootNode) => {
    try {
        const node = findNode(number, rootNode)
    
        if (node === undefined) return false
        return node.proposition ? node.proposition : undefined
    } catch(e) {
        throw new Error(e)
    }
}

export const findAncestry = (number, rootNode) => {
    // take '113'...
    let ancestryNumbers = []
    let runningNumber = ''
    number.split('').forEach((digit) => {
        runningNumber += digit
        ancestryNumbers.push(runningNumber)
    })
    // ...yields ['1','11','113']

    try {
        // now map these to their propositions:
        let ancestry = ancestryNumbers.map((number) => findProposition(number, rootNode))

        // filter out the nodes that did not have a proposition, and returned undefined
        ancestry = ancestry.filter((proposition) => !!proposition)

        // There may be duplicates because I choose to let findProposition return the
        // nearest defined ancestor upon undefined (seems desirable)
        // So remove those duplicates with a neat trick:
        ancestry = [...new Set(ancestry)]

        return ancestry
    } catch(e) {
        throw new Error(e)
    }
}

export const findSiblings = (number, rootNode) => {
    const parentNumber = number.slice(0,-1)
    const parentNode = findNode(parentNumber, rootNode)
    if (parentNode === undefined) return undefined
    try {
        const siblings = parentNode.children
        return siblings
    } catch(e) {
        throw new Error(e)
    }

}

export const findPreviousSiblingNumber = (number, rootNode) => {
    const siblings = findSiblings(number, rootNode) // may be undefined
    if (!siblings) return undefined
    try  {
        const currentIndex = number.slice(-1)
        const previousSibling = siblings[parseInt(currentIndex) - 1]
        return previousSibling ? previousSibling.number : undefined
    } catch(e) {
        throw new Error(e)
    }
}

export const findNextSiblingNumber = (number, rootNode) => {
    const siblings = findSiblings(number, rootNode) // may be undefined
    if (!siblings) return undefined
    try  {
        const currentIndex = number.slice(-1)
        const nextSibling = siblings[parseInt(currentIndex) + 1]
        return nextSibling ? nextSibling.number : undefined
    } catch(e) {
        throw new Error(e)
    }
}