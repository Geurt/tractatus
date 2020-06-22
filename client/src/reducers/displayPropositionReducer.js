const displayPropositionReducer = (state = { displayProposition: false }, action) => {
    switch(action.type) {
        case 'DISPLAY_PROPOSITION':
            return { displayProposition: true }
        case 'HIDE_PROPOSITION':
            return { displayProposition: false }
        default:
            return state
    }
}

export default displayPropositionReducer
