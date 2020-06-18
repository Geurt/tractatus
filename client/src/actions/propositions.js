// fetchPropositions
export const fetchRootPropositionNode = (rootNumber) => {
    // return a thunk
    return (dispatch) => {  // thunks are called with dispatch
        fetch(`/api/${rootNumber}`)
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(setRootPropositionNode(json))
            })
            .catch(error => console.log)
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

export const setTLP = (TLP = {}) => {
    return {
        type: 'SET_TLP',
        TLP
    }
}