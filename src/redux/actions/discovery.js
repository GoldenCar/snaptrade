import { createAction } from 'redux-actions';
import api from '../../api/api';
import { getUserLoggin } from '../selectors/user';
import store from '../../configureStore';

export const clearDiscoveryState = createAction('discovery/clear');

export const fetchDiscoverySuccess = createAction(
	'discovery/fetchDiscoverySuccess',
	discovery => ({ discovery })
);
export const fetchDiscoveryFailed = createAction(
	'discovery/fetchDiscoveryFailed'
);
export const fetchDiscoveryPending = createAction(
	'discovery/fetchDiscoveryPending',
	error => ({
		message: error
	})
);

export const fetchDiscovery = () => {
	return async (dispatch: Dispatch<any>, getState) => {
		const isLogin = getUserLoggin(getState());
		// if user login 2 else 1
		const contentType = Math.abs(~isLogin);
		try {
			dispatch(fetchDiscoveryPending());
			const response = await api.get(`/home/feed?page=${contentType}`);
			console.log('response.data', response.data);
			dispatch(fetchDiscoverySuccess(response.data));
			let arr = [];
			response.data.forEach(value => {
				if (value.items[0].length) return;
				arr = [...arr, ...value.items];
			});
			console.log(arr)
			dispatch(preFetchTicket(arr));
		} catch (error) {
			console.log({ error });
			dispatch(fetchDiscoveryFailed());
			console.log(
				'Error fetching discovery request',
				error,
				error.response
			);
		}
	};
};

export const fetchTopPricesPending = createAction('home/fetchTopPricesPending');
export const fetchTopPricesSuccess = createAction(
	'home/fetchTopPricesSuccess',
	topPrices => ({ topPrices })
);
export const fetchTopPricesFailed = createAction('home/fetchTopPricesFailed');

export const fetchTopPrices = () => {
	return async (dispatch: Dispatch<any>) => {
		try {
			dispatch(fetchTopPricesPending());

			const response = await api.get(
				`index_prices?time_frame=latest_price`
			);

			dispatch(fetchTopPricesSuccess(response.data));
		} catch (error) {
			dispatch(fetchTopPricesFailed());
			console.log(
				'Error fetching top prices unread count  request',
				error,
				error.response
			);
		}
	};
};

export const preFetchTicket = async list => {
	return await Promise.all(
		list.map(async (stock, i) => await fetchStockTicket(stock, i))
	);
};

export const setTicket = createAction('ticker/setTicket', (ticker, data) => ({
	ticker,
	data
}));

export const fetchStockTicket = async (tickerData, i) => {
	try {
		const response = await api.get(
			'/tickers/' + tickerData.ticker + '?period=1d'
		);
		store.dispatch(setTicket(tickerData.ticker, response.data[0]));
		return response.data[0];
	} catch (error) {
		console.log(error);
	}
};
