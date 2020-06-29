const errorReducer = (state = { hasError: false }, action) => {
    switch (action.type) {
        case 'SET_ERROR':
            return { hasError: true }
        default:
            return state
    }
}

export default errorReducer
