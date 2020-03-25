import { State } from '../actions/types';
import { createSelector } from 'reselect';

const getRootPath = (state: State = {}) => {
	return state.discovery;
};

export const getDiscoveryList = createSelector(
	getRootPath,
	state => state.list
);

export const getDiscoveryPending = createSelector(
	getRootPath,
	state => state.pending
);

export const getTopPrices = createSelector(
	getRootPath,
	state => state.topPrices || {}
);

export const getTopPricesPending = createSelector(
	getRootPath,
	getTopPrices,
	topPrices => topPrices.pending
);

export const getTopPricesList = createSelector(
	getTopPrices,
	topPrices => topPrices.list || []
);
