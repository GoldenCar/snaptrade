import { State } from '../actions/types';
import { createSelector } from 'reselect';
// import { UserFeedState } from '../reducers/user';
const getRootPath = (state: State = {}) => {
	return state.charts;
};

export const getChartState = (ticker, period) => {
	return createSelector(
		getRootPath,
		charts => {
			const tickerChart = charts[ticker] || {};

			const tickerPeriodCharts = tickerChart[period] || {};
			return tickerPeriodCharts;
		}
	);
};
