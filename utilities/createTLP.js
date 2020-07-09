const fs = require('fs');

const { createPropositions } = require('./createPropositions')
const { parsePropositions } = require('./parsePropositions') 
const { structurePropositions } = require('./structureTLP')
const { addStyleParams } = require('./styleTLP')

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
    const propositions = await createPropositions()
    // we parse the proposition text
    await parsePropositions(propositions)
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
