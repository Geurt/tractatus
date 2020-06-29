import { setLoaded } from './loader'
import { setError } from '../actions/errors'
import { saveRootProposition } from './saveRootPropositions'

// fetchPropositions
export const fetchRootPropositionNode = (rootNumber = '1') => {
    // return a thunk
    return (dispatch) => {  // thunks are called with dispatch
        // we return this fetch promise only for testing!
        return fetch(`/api/${rootNumber}`)
            .then((res) => {
                // fetch marks 500s with a falsy ok flag
                // (they won't trigger the catch below, so we catch them here)
                if (!res.ok) { 
                    dispatch(setError())
                }
                return res
            })
            .then(res => res.json())
            .then(json => {
                dispatch(setLoaded())
                dispatch(setRootPropositionNode(json))
                dispatch(saveRootProposition(json))
            })
            .catch(error => {
                console.error(error)
                dispatch(setError())
            })
    }
}

export const setSavedRootPropositionNode = (rootNumber = '1') => {
    return (dispatch, getState) => {
        const rootNode = getState().savedRootPropositions[rootNumber]
        dispatch(setRootPropositionNode(rootNode))
    }
}

// action generators
export const setRootPropositionNode = (propositionNode = {}) => {
    return {
        type: 'SET_ROOT_PROPOSITION_NODE',
        propositionNode
    }
}

export const selectProposition = (propositionNumber = '') => {
    return {
        type: 'SELECT_PROPOSITION',
        propositionNumber
    }
}
