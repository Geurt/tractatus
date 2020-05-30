const fs = require('fs');
const path = require('path');

const { getPropositions } = require('./getPropositions')
const { structurePropositions } = require('./structure')

//const tlpPath = path.join(__dirname, './data/test.txt')
//const tlpPath = path.join(__dirname, './data/tlp-german.tex')
const tlpPath = path.join(__dirname, '../data/tlp-english.tex')

// utility function to write a static JSON TLP
const writeTLP = () => {
    getPropositions(tlpPath).then((propositions) => {
        const TLP = structurePropositions(propositions)
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
    const propositions = await getPropositions(tlpPath)
    const TLP = structurePropositions(propositions)
    return TLP
}

module.exports = {
    createTLP,
    writeTLP
}
