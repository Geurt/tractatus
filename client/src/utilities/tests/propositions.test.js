const { addDot } = require('../propositions')

test('Should add a dot to a multidigit number', () => {
    const result = addDot('1234')
    expect(result).toBe('1.234')
})

test('Should not add a dot to a single digit number', () => {
    const result = addDot('2')
    expect(result).toBe('2')
})
