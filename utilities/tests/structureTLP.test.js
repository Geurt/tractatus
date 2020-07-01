const { structurePropositions } = require('../structureTLP')
const { unstructuredPropositions } = require('../fixtures/propositions')

const expectedStructure = {
    children: [
        undefined,
        {
            number: "1",
            proposition: {
                number: "1"
            },
            children: [
                undefined,
                {
                    number: "11",
                    proposition: {
                        number: "11"
                    },
                    children: []
                },
                {
                    number: "12",
                    proposition: {
                        number: "12"
                    },
                    children: []
                }
            ]
        }
    ]
}

it('should structure propositions into a tree', () => {
    const structuredPropositions = structurePropositions(unstructuredPropositions)
    expect(structuredPropositions).toEqual(expectedStructure)
})