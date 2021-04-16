import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import propositionsReducer from '../reducers/propositionsReducer'
import loaderReducer from '../reducers/loaderReducer'
import errorReducer from '../reducers/errorReducer'
import languageReducer from '../reducers/languageReducer'
import expandReducer from '../reducers/expandReducer'
import { saveRootPropositionsReducer } from '../reducers/saveRootPropositionsReducer'

// this is just because we want to use redux devtools with thunk:
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    return createStore(
        combineReducers({
            propositions: propositionsReducer,
            loader: loaderReducer,
            errors: errorReducer,
            language: languageReducer,
            savedRootPropositions: saveRootPropositionsReducer,
            expandContract: expandReducer
        }),
        // without redux devtools, applying middleware is simple:
        // applyMiddleware(thunk),
        // with redux devtools howerver (see above for definition):
        composeEnhancers(applyMiddleware(thunk))
    );
}