import { handleActions, combineActions } from 'redux-actions';

import { setChart } from '../actions/charts';

const chartsState = {};

const reducer = handleActions(
	{
		// save chart by ticker and period
		[setChart]: (state, action) => {
			return {
				...state,
				[action.payload.ticker]: {
					...(state[action.payload.ticker] || {}),
					[action.payload.period]: action.payload.chart
				}
			};
		}
	},
	chartsState
);

export default reducer;
