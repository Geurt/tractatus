const propositionsReducerDefaultState = {
    rootPropositionNode: {
        number: '',
        proposition: {
            number: '',
            text: ''
        },
        children: []
    }
}

const propositionsReducer = (state = propositionsReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_ROOT_PROPOSITION_NODE':
            return {
                ...state,
                rootPropositionNode: action.propositionNode
            }
        default:
            return state
    }
}

export default propositionsReducer
