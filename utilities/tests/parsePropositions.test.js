const { getPropositions } = require('../getPropositions')
const path = require('path');
const tlpPath = path.join(__dirname, '../../data/tlp-english.tex')

test('Expect all propositions to match their snapshots', () => {
    jest.setTimeout(30000);     // latex parsing takes longer than the default 5000ms
    return getPropositions(tlpPath).then(propositions => {
        propositions.forEach((proposition) => {
            expect(proposition.text).toMatchSnapshot(`Proposition ${proposition.number}`)
        })
    })
})