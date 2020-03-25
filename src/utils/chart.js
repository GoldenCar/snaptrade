import { colors } from '../styles/base';
import { MAX_CHART_POINTS } from '../constants';

if (!window.CHART_WIDTH && typeof window.CHART_WIDTH !== 'number') {
	window.CHART_WIDTH = 0;
}

export const getChartWidth = () => {
	if (window.CHART_WIDTH) return window.CHART_WIDTH;
	const date = new Date();
	if (date.getUTCDay() >= 6) {
		window.CHART_WIDTH = 100;
		return window.CHART_WIDTH;
	}
	const hour = date.getUTCHours();
	const minutes = date.getUTCMinutes();
	const end = 20;
	const start = 13.3;

	const max = 100;
	const part = max / (end - start);

	if (hour < start || hour >= end) {
		window.CHART_WIDTH = max;
		return window.CHART_WIDTH;
	}
	window.CHART_WIDTH = (hour + minutes / 100 - start) * part;
	return window.CHART_WIDTH;
};

export const getChartWidthByDots = (dotsCount, max = 60) => {
	const per = 100 / max;
	return Math.round(dotsCount * per);
};

const reduceChart = ([data, labels, events, max, min], item, index) => {
	if (item.close) {
		data = [...data, item.close];
		// prevision = [...prevision, item.close_last_day];
		labels = [...labels, item.date];

		if (item.event_category) {
			events = [...events, { event: item.event_category, index, name: item.event_name }];
		}

		if (item.close > max) max = item.close;
		if (item.close_last_day > max) max = item.close_last_day;

		if (min === null || item.close < min || item.close_last_day < min)
			min =
				item.close_last_day < item.close
					? item.close_last_day
					: item.close;
	}
	return [data, labels, events, max, min];
};

// const reduceChart = ([data, labels, max, min], item) => {
// 	if (item.close) {
// 		data = [...data, item.close];
// 		labels = [...labels, item.date];
// 	}

// 	if (item.close > max) max = item.close;
// 	if (item.close_last_day > max) max = item.close_last_day;

// 	if (min === null || item.close < min) min = item.close
// 	if (tem.close_last_day < min) min = item.close_last_day

// 	return [data, labels, max, min];
// };

const calculateChartWidth = (currentLength = 70, max = 70) =>
	Math.round((100 / max) * currentLength);

// if (item.event_category) {
// 	events = [...events, { event: item.event_category, index }];
// }
export const apiChartTransformed = (requestChart, period) => {
	if (!requestChart || !requestChart[0]) return {};
	// detail
	const [data, labels, events, max, min] = requestChart.reduce(reduceChart, [
		[],
		[],
		[],
		0,
		null
	]);

	// prevision chart data
	const prevision = requestChart[0].close_last_day;

	// chart status
	const status = data[0] < data[data.length - 1] ? colors.green : colors.red;

	// width if chart period exist in MAX_CHART_POINTS
	let width = MAX_CHART_POINTS[period]
		? calculateChartWidth(data.length, MAX_CHART_POINTS[period])
		: 100;
	// chart width can't be more 100 !
	if (width > 100) width = 100;
	// min chart width is 5
	if (width < 5) width = 5;

	const chart = {
		data,
		labels,
		status,
		events,
		prevision,
		width,
		min,
		max,
		updatedAt: Date.now()
	};

	return chart;
};
