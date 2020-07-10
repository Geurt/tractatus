const fs = require('fs')
const { createTLP } = require('./createTLP')

const TLPpath = '../data/TLP.json'

// utility function to write a static JSON TLP
const writeTLP = async () => {
    const TLP = await createTLP()
    const tlpJSON = JSON.stringify(TLP)

    fs.writeFile(TLPpath, tlpJSON, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("TLP json written successfully");
        }
    });
}

writeTLP()

module.exports = {
    writeTLP
}