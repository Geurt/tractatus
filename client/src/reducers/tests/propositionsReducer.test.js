import propositionsReducer from '../propositionsReducer'
import { rootPropositionNode } from '../../fixtures/testPropositions'

it('should select a proposition', () => {
    const action = {
        type: 'SELECT_PROPOSITION',
        propositionNumber: '123'
    }
    const result = propositionsReducer({}, action)

    expect(result.selectedPropositionNumber).toBe('123')
})

it('should set the root proposition correctly', () => {
    const action = {
        type: 'SET_ROOT_PROPOSITION_NODE',
        propositionNode: rootPropositionNode
    }
    const result = propositionsReducer({}, action)

    expect(result.rootPropositionNode).toBe(rootPropositionNode)
})