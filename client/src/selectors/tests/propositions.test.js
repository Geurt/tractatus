const { isInSelectedAncestry } = require('../propositions')

test('Tests if a proposition is in the anscestry of another', () => {
    let result = isInSelectedAncestry('12','1234')
    expect(result).toBeTruthy()
})

test('Tests if a proposition is not in the anscestry of another', () => {
    let result = isInSelectedAncestry('132','1234')
    expect(result).toBeFalsy()
})