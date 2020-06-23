// here we save already loaded root propositions
// (we fetch them one by one as needed; but once should be enough)

export const saveRootPropositionsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SAVE_ROOT_PROPOSITION':
            const newState = [...state]
            const index = action.rootProposition.number
            newState[index] = action.rootProposition
            return newState
        default:
            return state
    }
}