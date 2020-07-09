const { createPropositions } = require('../createPropositions')
const { parsePropositions } = require('../parsePropositions') 

const path = require('path');

test('Expect all propositions to match their snapshots', () => {
    jest.setTimeout(60000);     // latex parsing takes longer than the default 5000ms
    return createPropositions()
        .then(propositions => parsePropositions(propositions))
        .then(propositions => {
            propositions.forEach((proposition) => {
                expect(proposition.english).toMatchSnapshot(`Proposition ${proposition.number} english`)
                expect(proposition.german).toMatchSnapshot(`Proposition ${proposition.number} german`)
            })
        })
})