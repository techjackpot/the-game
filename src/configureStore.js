import { applyMiddleware, combineReducers, createStore } from 'redux';
import { fromJS } from 'immutable'; 
import createReducer from '@reducers';
import createSagaMiddleware from 'redux-saga';

const middleware = [
];
 
function configureStore(initialState = fromJS({})) {
 
	const store = createStore(
		createReducer(),
		initialState,
		applyMiddleware(...middleware),
	);

	return store;
}

module.exports = configureStore;
