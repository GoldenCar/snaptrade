import { createAction } from 'redux-actions';
import api from '../../api/api';
import qs from 'qs';
import audioNotification from '../../components/AudioNotification';
import {
	FETCH_SEARCH_COMPANY_PENDING,
	FETCH_SEARCH_COMPANY_SUCCESS,
	FETCH_SEARCH_COMPANY_FAILED
} from './actionTypes';
import Toast from 'react-native-root-toast';
import { preFetchTicket } from './discovery';
import { fetchStockChart } from './charts';

import { getSortedWatchList } from '../selectors/watchlist';

export const deleteTickerFromWatchlistPending = createAction(
	'watchlist/deleteTickerFromWatchlist'
);
export const deleteTickerFromWatchlistSuccess = createAction(
	'watchlist/deleteTickerFromWatchlistSuccess',
	ticker => ({ ticker })
);
export const deleteTickerFromWatchlistFailed = createAction(
	'watchlist/deleteTickerFromWatchlistFailed'
);

export const fetchWatchListPending = createAction(
	'watchlist/fetchWatchListPending'
);
export const fetchWatchListSuccess = createAction(
	'watchlist/fetchWatchListSuccess',
	list => ({ list })
);
export const fetchWatchListFailed = createAction(
	'watchlist/fetchWatchListFailed'
);

export const fetchWatchList = () => {
	return async (dispatch: Dispatch<any>) => {
		try {
			dispatch(fetchWatchListPending());
			const response = await api.get(`mobile/watchlist/tickers`);
			dispatch(fetchWatchListSuccess(response.data));
			// dispatch(preFetchTicket(response.data));
			dispatch(preFetchCharts(response.data));
			return response;
		} catch (error) {
			dispatch(fetchWatchListFailed(error));
		}
	};
};

export const deleteTickerFromWatchlistRequest = (ticker: string = '') => {
	return async (dispatch: Dispatch<any>) => {
		try {
			dispatch(deleteTickerFromWatchlistPending);

			const response = await api.delete(
				`/mobile/watchlist/tickers/${ticker}`
			);

			if (response.data.error) {
				dispatch(deleteTickerFromWatchlistFailed(response.data.error));
				return;
			}
			console.log(
				'fetching delete ticker from watchlist success: ',
				ticker
			);

			audioNotification.play();
			dispatch(deleteTickerFromWatchlistSuccess(ticker));
		} catch (error) {
			console.log(
				'Error fetching delete ticker from watchlist',
				error,
				error.response
			);
			if (error.response) {
				dispatch(
					deleteTickerFromWatchlistFailed(error.response.data.error)
				);
			}
			dispatch(deleteTickerFromWatchlistFailed(error));
		}
	};
};

export const fetchSearchCompanyPending = () => ({
	type: FETCH_SEARCH_COMPANY_PENDING
});

export const fetchSearchCompanySuccess = companys => ({
	type: FETCH_SEARCH_COMPANY_SUCCESS,
	paylaod: { companys }
});

export const fetchSearchCompanyFailed = error => ({
	type: FETCH_SEARCH_COMPANY_FAILED,
	payload: { error: error }
});

export const fetchSearchCompany = keyword => {
	return (dispatch: Dispatch<any>) => {
		dispatch(fetchSearchCompanyPending());

		return api
			.get(`tickers/search?filter=${keyword}`)
			.then(response => {
				dispatch(fetchSearchCompanySuccess(response.data));
			})
			.catch(error => {
				console.log('Error fetching search company', error);
				dispatch(fetchSearchCompanyFailed(error));
			});
	};
};

export const addStockToWatchListPending = createAction(
	'home/addStockToWatchListPending'
);

// TODO: change data format
export const addStockToWatchListSuccess = createAction(
	'home/addStockToWatchListSuccess',
	data => ({ data })
);

export const addStockToWatchListFailed = createAction(
	'home/addStockToWatchListFailed',
	errors => ({ errors })
);

export const clearSearchBox = createAction('home/clearSearchBox');
export const addStockToWatchList = (ticker: string, cb?: () => void) => {
	return (dispatch: Dispatch<any>) => {
		dispatch(addStockToWatchListPending());

		return api
			.post(
				`/mobile/watchlist/tickers`,
				qs.stringify({
					ticker
				})
			)
			.then(response => {
				if (response.data.success) {
					// Toast.show({
					// 	text: response.data.success,
					// 	onClose: cb
					// });
					audioNotification.play();
					let toast = Toast.show(response.data.success, {
						duration: Toast.durations.LONG,
						position: Toast.positions.BOTTOM,
						shadow: true,
						animation: true,
						hideOnPress: true,
						delay: 0
					});
					setTimeout(function() {
						Toast.hide(toast);
						cb && cb();
					}, 2000);
				}

				dispatch(addStockToWatchListSuccess(response.data));
			})
			.catch(error => {
				console.log('Error fetching search company', error);
				dispatch(fetchSearchCompanyFailed(error));
			});
	};
};

export const setWatchlistSortingKey = createAction(
	'home/setWatchlistSortingKey',
	key => ({ key })
);

export const nextActivePriceType = createAction(
	'watchlist/nextActivePriceType'
);

const preFetchedCharts = ['1d', '1y_a'];
export const preFetchCharts = async list => {
	return await Promise.all(
		list.map(stock =>
			Promise.all(
				preFetchedCharts.map(
					async period => await fetchStockChart(stock.ticker, period)
				)
			)
		)
	);
};
