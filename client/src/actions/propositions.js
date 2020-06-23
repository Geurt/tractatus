import { setLoaded } from './loader'
import { saveRootProposition } from './saveRootPropositions'

// fetchPropositions
export const fetchRootPropositionNode = (rootNumber = '1') => {
    // return a thunk
    return (dispatch) => {  // thunks are called with dispatch
        // we return this fetch promise only for testing!
        return fetch(`/api/${rootNumber}`)
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(setLoaded())
                dispatch(setRootPropositionNode(json))
                dispatch(saveRootProposition(json))
            })
            .catch(error => console.log)
    }
}

export const setSavedRootPropositionNode = (rootNumber = '1') => {
    return (dispatch, getState) => {
        const rootNode = getState().savedRootPropositions[rootNumber]
        dispatch(setRootPropositionNode(rootNode))
    }
}

const handleErrors = (response) => {
    if (!response.ok) {     // fetch provides .ok
        throw Error(response.statusText);
    }
    return response
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
