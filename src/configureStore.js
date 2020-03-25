import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistCombineReducers } from 'redux-persist';
import {
	applyMiddleware,
	compose,
	createStore,
	type Store,
	type Dispatch
} from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';

import allReducers from './redux/reducers';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

import type { Action, State } from '/redux/types';

const writeFailHandler = (error: Error) => {
	console.error('Failed to write: ' + error.description);
	// the following line clears the persisted store - useful for developing
	(async () => {
		await persistor.purge();
	})();
};

const persistConfig = {
	key: 'root',
	storage,
	debug: true,
	keyPrefix: 'persist',
	writeFailHandler: writeFailHandler,
	stateReconciler: hardSet
};

const cfgStore = (): Store<State, Action, Dispatch<Action>> => {
	const middlewares = [thunk];
	const middlewareEnhancer = applyMiddleware(...middlewares);

	const enhancers = [middlewareEnhancer];
	const composedEnhancers = composeWithDevTools(...enhancers);

	const persistedReducer = persistCombineReducers(persistConfig, allReducers);
	const store = createStore(persistedReducer, composedEnhancers);
	return store;
};

const store = cfgStore();
export const persistor = persistStore(store);
export default store;
