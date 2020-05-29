const fs = require('fs').promises
const { propositionDelimiter } = require('./regexps')
const { parseProposition } = require('./parseProposition') 

async function getRawPropositions(textFilePath) {
    const data = await fs.readFile(textFilePath);
    const rawPropositions = data.toString().split(propositionDelimiter)

    // remove the first bogus entry
    rawPropositions.shift();

    return rawPropositions;
}

function parsePropositions(rawPropositions) {
    return rawPropositions.map(rawProposition => parseProposition(rawProposition))
}

async function getPropositions(tlpPath) {
    const rawPropositions = await getRawPropositions(tlpPath)
    const propositions = parsePropositions(rawPropositions)
    return propositions
}

module.exports = {
    getPropositions
}