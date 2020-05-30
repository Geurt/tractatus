const express = require('express')

const { readTLP, findProposition } = require('./utilities/readTLP')
const { createTLP } = require('./utilities/createTLP')
const TLPpath = './data/output.json'

const app = express()
const port = 3000
app.use(express.static('public'))
app.listen(port, () => {
    console.log(`Listening on ${port}`)
})

// This is just a very rough-and-ready API for testing purposes
app.get('/api/:number', async (req, res) => {
    const number = req.params.number.replace('.','')    // allow dots

    // Production: read the TLP
    // const TLP = await readTLP(TLPpath)
    
    // Development: create a TLP on the fly
    const TLP = await createTLP()

    // find the proposition in the TLP by number
    const propositionJSON = findProposition(number, TLP)

    // add the dot back just for looks
    const parsedNumber = number.length > 1 ? number.charAt(0) + '.' + number.slice(1) : number

    if (propositionJSON) {
        const proposition = JSON.stringify(propositionJSON.proposition.text)
        res.send(
            '<link rel="stylesheet" type="text/css" href="../proposition.css">' +
            `<div class="proposition">
                <h1 class="proposition__number">${parsedNumber}</h1>
                <p class="proposition__text">${proposition}</p>
            </div>`
            )
    } else {
        res.send(
            '<link rel="stylesheet" type="text/css" href="../proposition.css">' +
            '<h1 class="no_proposition">No such proposition.</h1>'
            )
    }
})
