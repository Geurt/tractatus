const fs = require('fs').promises
const path = require('path');

const { propositionDelimiter } = require('./regexps')
const { numberRegex } = require('./regexps');

const tlpGermanPath = path.join(__dirname, '../data/tlp-german.tex')
const tlpEnglishPath = path.join(__dirname, '../data/tlp-english.tex')

class Proposition {
    constructor(rawProposition, language) {
        // This is called with the raw proposition text

        // First we extract the raw number and text
        //      (There is balanced parenthesis nesting going on here.
        //      Unfortunately, recursive regex is hard in js (although possible by hand)
        //      But the data structure here allows an easy workaround:}
        const rawNumber = rawProposition.match(numberRegex)[0]
        const rawText = rawProposition.replace(numberRegex, '')
        
        this.number = rawNumber
        this[language] = rawText
    }
}

async function getRawPropositions(texFilePath) {
    const data = await fs.readFile(texFilePath);
    const rawPropositions = data.toString().split(propositionDelimiter)

    // remove the first bogus entry
    rawPropositions.shift();

    return rawPropositions;
}

async function getPropositions(tlpPath, language) {
    const rawPropositions = await getRawPropositions(tlpPath)
    const propositions = rawPropositions.map((rawProposition) => {
        return new Proposition(rawProposition, language)
    })

    return propositions
}

function mergeLanguages(propositionsEnglish, propositionsGerman) {
    if (propositionsEnglish.length !== propositionsGerman.length) throw new Error()

    const mergedPropositions = propositionsEnglish.map((proposition, i) => {
        if (proposition.number !== propositionsGerman[i].number) throw new Error()

        return {
            ...proposition,
            ...propositionsGerman[i]
        }
    })

    return mergedPropositions
}

async function createPropositions() {
    const propositionsEnglish = await getPropositions(tlpEnglishPath, 'english')
    const propositionsGerman = await getPropositions(tlpGermanPath, 'german')

    const propositions = mergeLanguages(propositionsEnglish, propositionsGerman)

    return propositions
}

module.exports = {
    createPropositions,
    mergeLanguages
}