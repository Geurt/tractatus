// This structures the propositions into a graph for efficient searching
// Happily, the number of children never goes beyond 10
// So we can just find the place in their parent's childrens array by their decimal:
// E.g. 2131 should be the first child of 213

// IMPORANT NOTE:
// Some propositions have zeroes, eg 201
// And sometimes we need these as "empty nodes" (notes without a proposition)
// But most often these are not used; and this yields empty items in the children array
// eg [,node,node]
// For consistency I will leave this as is, and take care of skipping them in rendering.

// We start with an empty tractatus, and fill it in
const TLP = {
    children: []
}

const structurePropositions = (propositions) => {
    propositions.forEach((proposition) => {
        processProposition(proposition)
    })
    return TLP
}

const processProposition = (proposition) => {
    // we start at the top level, the TLP node
    let parentNode = TLP
    // we now step through each digit of the proposition number, left to right
    // stepping through children nodes and creating them along the way if necessary
    let numberSoFar = ''
    proposition.number.split('').forEach((digit) => {
        numberSoFar += digit
        // then we find the node for this number, creating it if it doesn't exist
        const node = nodeForNumber(parentNode, numberSoFar)
         // if this is the proposition's final node, assign the proposition
         if (numberSoFar === proposition.number) node.proposition = proposition
        // and step into the node for the next iteration
        parentNode = node
    })
}


const nodeForNumber = (parentNode, number) => {
    // the current digit is the last character of the node's number
    // this represents the place in its parents children array; (eg, 213 is third comment on 21)
    const digit = number.slice(-1)
    if (parentNode.children[digit]) {
        // if the node is already among the parent's children, return it
        return node = parentNode.children[digit]
    } else {
        // otherwise we create it
        const node = createNode(number)
        // and add it at the right place
        parentNode.children[digit] = node
        // and return it
        return node
    }
}

const createNode = (number) => {
    return {
        number,
        children: []
    }
}

module.exports = {
    structurePropositions
}
