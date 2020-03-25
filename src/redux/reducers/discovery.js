import { handleActions, combineActions } from 'redux-actions';
import { logout } from '../../screens/AuthFeed/actions.AuthFeed';
import {
	clearDiscoveryState,
	fetchDiscoverySuccess,
	fetchDiscoveryFailed,
	fetchDiscoveryPending,
	fetchTopPricesPending,
	fetchTopPricesSuccess,
	fetchTopPricesFailed,
	setTicket
} from '../actions/discovery';

export type TDiscoveryState = {|
	list: array,
	pending: boolean,
	setTicket: object,
	message: string,
	topPrices: {
		list: array,
		pending: boolean,
		message: ''
	}
|};

const initialState: TDiscoveryState = {
	list: [],
	pending: false,
	setTicket: {},
	message: '',
	topPrices: {
		list: [],
		pending: false,
		message: ''
	}
};

const reducer = handleActions(
	{
		[fetchDiscoveryPending]: state => ({
			...state,
			pending: true
		}),
		[fetchDiscoverySuccess]: (state, action) => ({
			...state,
			pending: false,
			list: action.payload.discovery
		}),
		[fetchDiscoveryFailed]: (state, action) => ({
			...state,
			pending: false,
			message: action.payload.message
		}),
		[fetchTopPricesPending]: state => {
			return {
				...state,
				topPrices: {
					...state.topPrices,
					pending: true
				}
			};
		},
		[fetchTopPricesSuccess]: (state, action) => ({
			...state,
			topPrices: {
				...state.topPrices,
				pending: false,
				list: action.payload.topPrices
			}
		}),
		[fetchTopPricesFailed]: (state, action) => ({
			...state,
			topPrices: {
				...state.topPrices,
				pending: false,
				message: action.payload.topPrices.message
			}
		}),
		[setTicket]: (state, action) => {
			return {
				...state,
				setTicket: {
					...state.setTicket,
					[action.payload.ticker]: {
						...action.payload.data
					}
				}
			};
		},
		[combineActions(logout, clearDiscoveryState)]: () => ({
			...initialState
		})
	},
	initialState
);

export default reducer;
