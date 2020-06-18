const loaderReducer = (state = { loading: false }, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return { loading: true }
        case 'SET_LOADED':
            return { loading: false }
        default:
            return state
    }
}

export default loaderReducer
