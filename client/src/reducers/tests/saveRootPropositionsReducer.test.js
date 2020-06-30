import { saveRootPropositionsReducer } from '../saveRootPropositionsReducer'
import { rootPropositionNode } from '../../fixtures/testPropositions'

it('should save newly loaded root propositions', () => {
    const action = {
        type: 'SAVE_ROOT_PROPOSITION',
        rootProposition: rootPropositionNode
    }

    const result = saveRootPropositionsReducer([],action)

    expect(result).toEqual([,rootPropositionNode])
})

it('should save newly loaded root propositions at the right position', () => {
    rootPropositionNode.number = 4

    const action = {
        type: 'SAVE_ROOT_PROPOSITION',
        rootProposition: rootPropositionNode
    }

    const result = saveRootPropositionsReducer([],action)

    expect(result[4]).toEqual(rootPropositionNode)
})

