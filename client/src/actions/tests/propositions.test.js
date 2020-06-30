const { fetchRootPropositionNode, setRootPropositionNode, selectProposition } = require('../propositions')
const { setLoaded } = require('../loader')

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Async actions', () => {
    afterEach(() => {
        fetchMock.restore()
      })
    
    test('Should dispatch SET_ROOT_PROPOSITION_NODE, SAVE_ROOT_PROPOSITION and SET_LOADED after fecthing root node', () => {
        const mockPropositionNode = {
            number: '3'
        }
        // we set up fetchMock to intercept fetch calls
        // responsing with a mock node
        fetchMock.getOnce('/api/3', mockPropositionNode)

        // we mock a store
        const store = mockStore({})

        // we will expect these actions after a fetchPropositionNode:
        const expectedActions = [
            setLoaded(),    // returns a SET_LOADED action
            {
                type: 'SET_ROOT_PROPOSITION_NODE',
                propositionNode: mockPropositionNode
            },
            {
                type: 'SAVE_ROOT_PROPOSITION',
                rootProposition: mockPropositionNode
            }
        ]

        // now we check if fetchRootPropositionNode fires the set root node action
        // (we ask our mockStore for its called actions through getActions())
        // (note that this chaining requires fetchRootPropositionNode to return a promise!)
        // (below we also need to return because it's async, promise based, so Jest knows the test finishes)
        return store.dispatch(fetchRootPropositionNode('3')).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})

test('Should return a set root-proposition action', () => {
    const propositionNode = {
        somekey: "somevalue"
    }
    const result = setRootPropositionNode(propositionNode)
    expect(result).toEqual({
        type: 'SET_ROOT_PROPOSITION_NODE',
        propositionNode
    })
})

test('Should return a select proposition action', () => {
    const propositionNumber = "1234"
    const result = selectProposition(propositionNumber)
    expect(result).toEqual({
        type: 'SELECT_PROPOSITION',
        propositionNumber
    })
})