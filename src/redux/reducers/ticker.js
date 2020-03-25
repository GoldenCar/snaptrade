import { handleActions, combineActions } from 'redux-actions';

import { clearUserState } from '../actions/user';
import {
	fetchTickerTagsPending,
	fetchTickerTagsSuccess,
	fetchTickerTagsFailed,
	clearTickerState,
	setTickerPriceSnapshot,
	removeTickerPriceSnapshot,
	// setDetailState,
	// clearDetailState,
	// setTickerPeriod,
	setIsInWatchList
} from '../actions/ticker';
import {
	TTagComponent,
	TTag
} from '../../components/TagComponent/TagComponent';
import { logout } from '../../screens/AuthFeed/actions.AuthFeed';
import { getPSTHours } from '../../utils/index.js';

export type TTickerState = {
	pending: boolean,
	list: TTag[],
	error: string,
	priceSnapshot: number
};

const initialState: TTickerState = {
	pending: false,
	list: [],
	// detail: {},
	isInWatchList: false,
	error: '',
	priceSnapshot: null,
	setTicket: {}
};

const reducer = handleActions(
	{
		[fetchTickerTagsPending]: state => ({
			...state,
			pending: true
		}),
		[fetchTickerTagsSuccess]: (state, action) => ({
			...state,
			pending: false,
			list: action.payload.list
		}),
		[fetchTickerTagsFailed]: (state, action) => ({
			...state,
			pending: false,
			error: action.payload.error
		}),

		[setTickerPriceSnapshot]: (state, action) => ({
			...state,
			priceSnapshot: action.payload.price
		}),

		[removeTickerPriceSnapshot]: state => ({
			...state,
			priceSnapshot: null
		}),

		[setIsInWatchList]: (state, action) => ({
			...state,
			isInWatchList: action.payload.isInWatchList
		}),

		// [setDetailState]: (state, action) => ({
		// 	...state,
		// 	detail: action.payload.detail
		// }),

		// [clearDetailState]: state => ({
		// 	...state,
		// 	detail: {},
		// 	period: getPSTHours() < 13 ? '1y_a' : '1d'
		// }),

		[combineActions(logout, clearTickerState)]: state => ({
			setTicket:state.setTicket,
			...initialState
		})
	},
	initialState
);

export default reducer;
