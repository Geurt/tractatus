import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import propositionsReducer from '../reducers/propositionsReducer';

// this is just because we want to use redux devtools with thunk:
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    return createStore(
        propositionsReducer,
        // without redux devtools, applying middleware is simple:
        // applyMiddleware(thunk),
        // with redux devtools howerver (see above for definition):
        composeEnhancers(applyMiddleware(thunk))
    );
}