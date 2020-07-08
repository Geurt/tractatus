const fs = require('fs');
const path = require('path');

const { getPropositions } = require('./getPropositions')
const { structurePropositions } = require('./structureTLP')
const { addStyleParams } = require('./styleTLP')

//const tlpPath = path.join(__dirname, '../data/tlp-german.tex')
const tlpPath = path.join(__dirname, '../data/tlp-english.tex')

// utility function to write a static JSON TLP
const writeTLP = () => {
    getPropositions(tlpPath).then((propositions) => {
        addPrevAndNext(propositions) // do this before structuring
        const TLP = structurePropositions(propositions)
        addStyleParams(TLP)
        const tlpJSON = JSON.stringify(TLP)
    
        fs.writeFile('../data/output.json', tlpJSON, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log("TLP json written");
            }
        });
    })
}

// create a TLP on the fly for development purposes
const createTLP = async () => {
    // we get the unstructured propositions
    const propositions = await getPropositions(tlpPath)
    // before structuring we remember the prev & next order as it was in the linear Tractatus
    addPrevAndNext(propositions) 
    // now we structure the TLP graph
    const TLP = structurePropositions(propositions)
    // we add some params used in styling
    addStyleParams(TLP)
    return TLP
}

const addPrevAndNext = (propositions) => {
    let previousProposition = undefined
    propositions.forEach((proposition) => {
        if (previousProposition) {
            proposition.previous = previousProposition.number
            previousProposition.next = proposition.number
        }
        previousProposition = proposition
    })
}

module.exports = {
    createTLP,
    writeTLP
}
