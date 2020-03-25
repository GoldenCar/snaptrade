import { State } from '../actions/types';
import { createSelector } from 'reselect';
// import { UserFeedState } from '../reducers/user';
const getRootPath = (state: State = {}) => {
	return state.ticker;
};

export const gitTickerTagsList = createSelector(
	getRootPath,
	ticker => ticker.list
);

export const selectTickerPriceSnapshot = createSelector(
	getRootPath,
	ticker => {
		return ticker.priceSnapshot;
	}
);

// export const selectTickerPeriod = createSelector(
// 	getRootPath,
// 	ticker => {
// 		return ticker.period;
// 	}
// );

// export const selectTickerDetail = createSelector(
// 	getRootPath,
// 	ticker => {
// 		return ticker.detail;
// 	}
// );
