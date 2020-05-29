const fs = require('fs').promises

const readTLP = async (tlpPath) => {
    const TLPjson = await fs.readFile(tlpPath)
    const TLP = JSON.parse(TLPjson)
    return TLP
}

// because of the way we've structured the data, we can find propositions very efficiently:
const findProposition = (number, TLP) => {
    // we start at the top node, the TLP
    let node = TLP
    // then we decend along the children, each digit representing a child
    // eg: '113' yields TLP.children[1].children[1].children[3]
    number.split('').forEach((digit) => {
        node = node.children[digit]
    })
    return node ? node : undefined
}

module.exports = {
    readTLP,
    findProposition
}
