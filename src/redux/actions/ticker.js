import { createAction } from 'redux-actions';
import api from '../../api/api';
import qs from 'qs';
import Toast from 'react-native-root-toast';
import store from '../../configureStore';

export const clearTickerState = createAction('ticker/clear');

export const fetchTickerTagsPending = createAction(
	'ticker/fetchTickerTagsPending'
);

export const fetchTickerTagsSuccess = createAction(
	'ticker/fetchTickerTagsSuccess',
	list => ({ list })
);

export const fetchTickerTagsFailed = createAction(
	'ticker/fetchTickerTagsFailed',
	error => ({ error })
);

export const fetchTickerTagsRequest = ticker => {
	return async (dispatch: Dispatch<any>) => {
		dispatch(fetchTickerTagsPending());
		try {
			const response = await api.get(`/tickers/tags`, {
				params: { ticker }
			});
			if (response.data.error) {
				dispatch(fetchTickerTagsFailed(response.data.error));
				return;
			}
			dispatch(fetchTickerTagsSuccess(response.data));
		} catch (error) {
			console.log(
				'Error fetching ticker tags list  request',
				error,
				error.response
			);
			if (error.response) {
				dispatch(fetchTickerTagsFailed(error.response.data.error));
			}
			dispatch(fetchTickerTagsFailed(error));
		}
	};
};

export const setTickerPriceSnapshot = createAction(
	'ticker/setTickerPriceSnapshot',
	price => ({ price })
);

export const removeTickerPriceSnapshot = createAction(
	'ticker/removeTickerPriceSnapshot'
);
// PRICE ALERTS

export const createPriceAlertPending = createAction('ticker/createPriceAlert');

export const createPriceAlertSuccess = createAction('ticker/createPriceAlert');

export const createPriceAlertFailed = createAction('ticker/createPriceAlert');

export const createPriceAlert = ({ ticker, buy_price, sell_price }) => {
	return async (dispatch: Dispatch<any>) => {
		dispatch(createPriceAlertPending());
		try {
			const response = await api.post(
				`/watchlist/alert/ticker/${ticker}`,
				qs.stringify({ buy_price, sell_price })
			);
			let toast = Toast.show(
				response.data.success || response.data.error,
				{
					duration: Toast.durations.LONG,
					position: Toast.positions.BOTTOM,
					shadow: true,
					animation: true,
					hideOnPress: true,
					delay: 0
				}
			);

			setTimeout(function() {
				Toast.hide(toast);
			}, 2000);
			dispatch(createPriceAlertSuccess());
		} catch (error) {
			console.log(
				'Error fetching ticker tags list  request',
				error,
				error.response
			);
			if (error.response) {
				dispatch(createPriceAlertFailed(error.response.data.error));
			}
			dispatch(createPriceAlertFailed(error));
		}
	};
};
//

// export const setDetailState = createAction(
// 	'ticker/setDetailState',
// 	tickerDetail => ({ detail: tickerDetail })
// );

export const setIsInWatchList = createAction(
	'ticker/setIsInWatchList',
	isInWatchList => ({ isInWatchList })
);
// export const clearDetailState = createAction('ticker/clearDetailState');

