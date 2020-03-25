export const FETCH_NOTIFICATION_UNREAD_INTERVAL = 2.5 * 60 * 1000;

export const DOMAIN = `https://${
	__DEV__ ? 'api-dev.snaptrade' : 'api.snaptrade'
}.us/`;

export const MAX_CHART_POINTS = {
	'1d': 65
};

export const STOCK_CHARTS_UPDATE_TIMEOUT = 3 * 60 * 1000;

export const PERIODS = {
	year: '1y_a',
	month: '30d',
	week: '7d',
	day: '1d',
}