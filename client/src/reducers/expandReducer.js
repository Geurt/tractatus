const expandReducer = (state = 'contracted', action) => {
    switch (action.type) {
        case 'SET_EXPANDED': 
            console.log('set exp')
            return 'expanded'
        case 'SET_CONTRACTED': 
            console.log('set contr')
            return 'contracted'
        default:
            return state
    }
}

export default expandReducer