const express = require('express')
const path = require('path');
const dotenv = require('dotenv')
dotenv.config()

const app = express()
const port = process.env.PORT || 5000
app.use(express.static('public'))
app.listen(port, () => {
    console.log(`Listening on ${port}`)
})

const { readTLP, findProposition } = require('./utilities/readTLP')
const { createTLP } = require('./utilities/createTLP')
const TLPpath = './data/output.json'

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/:number', async (req, res) => {
    // Production: read the TLP
    // const TLP = await readTLP(TLPpath)
    
    // Development: create a TLP on the fly
    const TLP = await createTLP()

    let number = req.params.number.replace('.','')    // allow dots
    number = parseInt(number)

    // find the proposition in the TLP by number
    const propositionNodeJSON = findProposition(number, TLP)

    if (propositionNodeJSON) {
        res.send(propositionNodeJSON)
    } else {
        console.log('error')
        res.send({ error: "No such proposition."})
    }
})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
    });
