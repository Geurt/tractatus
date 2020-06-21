const { isInSelectedAncestry, findProposition } = require('../propositions')
const { rootPropositionNode } = require('../../fixtures/testPropositions')

test('Tests if a proposition is in the anscestry of another', () => {
    let result = isInSelectedAncestry('12','1234')
    expect(result).toBeTruthy()
})

test('Tests if a proposition is not in the anscestry of another', () => {
    let result = isInSelectedAncestry('132','1234')
    expect(result).toBeFalsy()
})

test('It should find a proposition by number', () => {
    const result = findProposition('11', rootPropositionNode)
    const expectedResult = rootPropositionNode.children[1].proposition
    expect(result).toBe(expectedResult)
})

test('It should return falsy on nonexistent propositions', () => {
    const result = findProposition('3', rootPropositionNode)
    const expectedResult = rootPropositionNode.children[1].proposition
    expect(result).toBeFalsy()
})

test('It should return the last matching parent for nonexistent children', () => {
    const result = findProposition('113', rootPropositionNode)
    const expectedResult = rootPropositionNode.children[1].proposition
    expect(result).toBe(expectedResult)
})
