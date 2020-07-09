const languageReducer = (state = 'english', action) => {
    switch (action.type) {
        case 'SET_ENGLISH': 
            return 'english'
        case 'SET_GERMAN': 
            return 'german'
        default:
            return state
    }
}

export default languageReducer