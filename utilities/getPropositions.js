const fs = require('fs').promises
const { propositionDelimiter } = require('./regexps')
const { parsePropositions } = require('./parsePropositions') 

async function getRawPropositions(textFilePath) {
    const data = await fs.readFile(textFilePath);
    const rawPropositions = data.toString().split(propositionDelimiter)

    // remove the first bogus entry
    rawPropositions.shift();

    return rawPropositions;
}

async function getPropositions(tlpPath) {
    const rawPropositions = await getRawPropositions(tlpPath)
    const propositions = parsePropositions(rawPropositions)
    return propositions
}

module.exports = {
    getPropositions
}