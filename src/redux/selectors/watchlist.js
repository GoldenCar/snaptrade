import { State } from '../actions/types';
import { createSelector } from 'reselect';
import orm from '../orm';

const getRootPath = (state: State = {}) => {
	return state.watchlist;
};

const getOrmPath = (state: State = {}) => {
	return state.orm;
};

export const getFeedLoading = createSelector(
	getRootPath,
	watchlist => watchlist.isLoading
);

export const getWatchlistSortingKey = createSelector(
	getRootPath,
	watchlist => watchlist.sortingKey
);

export const getWatchlistSortingDirection = createSelector(
	getRootPath,
	watchlist => watchlist.sortingDirection
);

export const getFeedError = createSelector(
	getRootPath,
	watchlist => watchlist.error
);

export const getActivePriceType = createSelector(
	getRootPath,
	watchlist => {
		return watchlist.activePriceType;
	}
);

export const getFeedSortingType = createSelector(
	getRootPath,
	watchlist => watchlist.sorting
);

export const getWatchlist = createSelector(
	getRootPath,
	watchlist => {
		return watchlist.list;
	}
);

export const getSortedWatchList = createSelector(
	getWatchlist,
	getWatchlistSortingKey,
	getWatchlistSortingDirection,
	(watchlist, key, direction = -1) => {
		if (!watchlist || !watchlist.length) return [];
		return watchlist
			.sort((ticker, _ticker) => {
				if (ticker[key] > _ticker[key]) {
					return 1 * direction;
				}
				if (ticker[key] < _ticker[key]) {
					return -1 * direction;
				}
				return 0;
			})
			.slice();
	}
);
