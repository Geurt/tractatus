const { setLoaded, setLoading } = require('../loader')

test('Should return a loading action', () => {
    const result = setLoading()
    expect(result).toEqual({
        type: 'SET_LOADING'
    })
})

test('Should return a loaded action', () => {
    const result = setLoaded()
    expect(result).toEqual({
        type: 'SET_LOADED'
    })
})