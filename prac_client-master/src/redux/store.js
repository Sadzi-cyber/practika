import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import notesReducer from './notesReducer';

let reducers = combineReducers({
    notes: notesReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));


window.store = store;

export default store; 