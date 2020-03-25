import { createAction } from 'redux-actions';
import api from '../../api/api';
import { apiChartTransformed } from '../../utils/chart';
import store from '../../configureStore';

export const setChart = createAction(
	'charts/setChart',
	(ticker, period, chart) => ({ ticker, period, chart })
);

export const fetchStockChart = async (ticker, period) => {
	try {
		const response = await api.get(
			`/chart/tickers/${ticker}?period=${period}&mobile=1`
		);
		const res = await api.get(`/tickers/alerts/${ticker}`);
		const chartData = apiChartTransformed(response.data, period);
		chartData.alerts = res.data;
		store.dispatch(setChart(ticker, period, chartData));
		return chartData;
	} catch (error) {
		console.log(error);
	}
};
