import { handleActions, combineActions } from 'redux-actions';

import {
	fetchWatchListPending,
	fetchWatchListSuccess,
	fetchWatchListFailed,
	setWatchlistSortingKey,
	deleteTickerFromWatchlistSuccess,
	nextActivePriceType,
	clearSearchBox
} from '../actions/watchlist';
import {
	FETCH_SEARCH_COMPANY_PENDING,
	FETCH_SEARCH_COMPANY_SUCCESS,
	FETCH_SEARCH_COMPANY_FAILED
} from '../actions/actionTypes';

const initialState = {
	pending: 0,
	list: [],
	tickers: null,
	isLoading: true,
	error: null,
	pendingCompany: false,
	searchCompany: [],
	searchCompanyError: '',
	sortingKey: 'ticker',
	sortingDirection: 1,
	activePriceType: 0
};
const max = 2;
const min = 0;
const reducer = handleActions(
	{
		[fetchWatchListPending]: (state, action) => ({
			...state,
			isLoading: true
		}),
		[fetchWatchListSuccess]: (state, action) => ({
			...state,
			list: action.payload.list,
			isLoading: false
		}),
		[fetchWatchListFailed]: (state, action) => ({
			...state,
			isLoading: false
		}),
		[FETCH_SEARCH_COMPANY_PENDING]: (state) => ({
			...state,
			pendingCompany: true,
			searchCompany: [],
			searchCompanyError: null
		}),
		[FETCH_SEARCH_COMPANY_SUCCESS]: (state, action) => ({
			...state,
			pendingCompany: false,
			searchCompany: action.paylaod.companys,
			searchCompanyError: null
		}),
		[FETCH_SEARCH_COMPANY_FAILED]: (state, action) => ({
			...state,
			pendingCompany: false,
			searchCompany: [],
			searchCompanyError: action.payload.error
		}),
		[setWatchlistSortingKey]: (state, action) => {
			if (state.sortingKey === action.payload.key) {
				return {
					...state,
					sortingDirection: state.sortingDirection === 1 ? -1 : 1
				};
			}

			return {
				...state,
				sortingKey: action.payload.key,
				sortingDirection: 1
			};
		},

		[deleteTickerFromWatchlistSuccess]: (state, action) => {
			return ({
				...state,
				list: state.list.filter(ticker => {
					return ticker.ticker !== action.payload.ticker;
				})
			})
		},

		[nextActivePriceType]: (state, action) => {
			const next = state.activePriceType + 1 || min;
			const activePriceType = next > max ? min : next;
			return {
				...state,
				activePriceType: activePriceType
			};
		},

		[clearSearchBox]: state => ({
			...state,
			searchCompany: [],
			pendingCompany: false
		})
	},
	initialState
);

export default reducer;
