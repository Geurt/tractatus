const { mergeLanguages } = require('../createPropositions')

const germanPropositions = [
    {
        number: '1',
        german: 'Deutsche tekst eins.'
    },
    {
        number: '2',
        german: 'Deutsche tekst zwei.'
    }
]

const englishPropositions = [
    {
        number: '1',
        english: 'English text one.'
    },
    {
        number: '2',
        english: 'English text two.'
    }
]

const expectedResult = [
    {
        number: '1',
        english: 'English text one.',
        german: 'Deutsche tekst eins.'
    },
    {
        number: '2',
        english: 'English text two.',
        german: 'Deutsche tekst zwei.'
    }
]

test('It should merge two arrays of objects correctly', () => {
    const result = mergeLanguages(englishPropositions, germanPropositions)
    expect(result).toEqual(expectedResult)
})
