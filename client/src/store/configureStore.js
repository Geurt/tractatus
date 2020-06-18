import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import propositionsReducer from '../reducers/propositionsReducer';
import loaderReducer from '../reducers/loaderReducer';

// this is just because we want to use redux devtools with thunk:
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    return createStore(
        combineReducers({
            propositions: propositionsReducer,
            loader: loaderReducer
        }),
        // without redux devtools, applying middleware is simple:
        // applyMiddleware(thunk),
        // with redux devtools howerver (see above for definition):
        composeEnhancers(applyMiddleware(thunk))
    );
}