import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reduceres';

const initailState = {
	users: []
}

const middleware = [thunk];

const store = createStore(
	allReducers, initailState, 
	compose(applyMiddleware(...middleware),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
		);

export default store;