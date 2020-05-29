// This structures the propositions into a graph.
// The goal is to structure them into children arrays for efficient searching
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
    let parentNode = TLP 
    // we start at the top level, the TLP node
    // we now step through each digit of the proposition number, left to right
    // stepping through children nodes and creating them along the way if necessary
    const number = proposition.number
    for (level = 0; level < number.length; level++) {
        // get the number up to this level; (eg number 2132 at level 1 yields 21)
        numberSoFar = number.slice(0, level + 1);

        // then we find the node for this number, creating it if it doesn't exist
        const node = nodeForNumber(parentNode, numberSoFar, proposition)

        // and step into that node for the next iteration
        parentNode = node
    }
}

const nodeForNumber = (parentNode, number, proposition) => {
    // the current digit is the last character of the node's number
    // this represents the place in its parents children array; (eg, 213 is third comment on 21)
    const digit = number.slice(-1)
    if (parentNode.children[digit]) {
        // if the node is already among the parent's children, return it
        return node = parentNode.children[digit]
    } else {
        // otherwise we create it
        const node = createNode(number, proposition) 
        // and add it at the right place
        parentNode.children[digit] = node
        // and return it
        return node
    }
}

// NOTE: this expects only propositions to be set on node's that don't already exist
// (It works out, but only because the order is right; 
//  otherwise we'd need to prevent overwriting children arrays)
const createNode = (number, proposition) => {
    if (number === proposition.number) {
        // this is the proposition's final node
        return {
            number,
            proposition,
            children: []
            // TODO: not all propositions need children
        }
    } else {
        return {
            number,
            children: []
        }
    }
}

module.exports = {
    structurePropositions
}
