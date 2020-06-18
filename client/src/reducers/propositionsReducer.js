const propositionsReducerDefaultState = {
    rootPropositionNode: {
        number: '',
        proposition: {
            number: '',
            text: ''
        },
        children: []
    },
    selectedPropositionNumber: ''
}

const propositionsReducer = (state = propositionsReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_ROOT_PROPOSITION_NODE':
            return {
                ...state,
                rootPropositionNode: action.propositionNode
            }
        case 'SELECT_PROPOSITION':
            return {
                ...state,
                selectedPropositionNumber: action.propositionNumber
            }
        default:
            return state
    }
}

export default propositionsReducer
