import React from 'react';
import { View } from 'react-native';
import { LineChart, StackedAreaChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { colors } from '../../styles/base';

type ChartData = {
	close: number,
	date: string
};

const chartColors = Object.freeze({
	red: 'rgb(244, 0, 0)',
	green: 'rgb(0, 244, 0)'
});

type Color = 'red' | 'green';

type Props = {
	chartData: ChartData[],
	priceIncreaseLastDay: number,
	height: number,
	width: number,
	color: Color,
	chartWidth: number
};

/**
 * Functional component to show a Ticker Card in Feed.
 **/
const TickerChart = (props: Props) => {
	let max = 0;
	let min = null;
	let lastDayData = [];
	let currentDayData = [];

	props.chartData.map(x => {
		let currentPrice = x.close;
		lastDayData.push(x.close_last_day);
		currentDayData.push(currentPrice);
		if (x.close_last_day > max) max = x.close_last_day;
		if (currentPrice > max) max = currentPrice;
		if (min === null || x.close_last_day < min) min = x.close_last_day;
		if (currentPrice < min) min = currentPrice;
	});
	let color =
		currentDayData.length &&
		currentDayData[0] < currentDayData[currentDayData.length - 1]
			? colors.green
			: colors.red;
	return (
		<View style={{ height: props.height, width: props.width }}>
			<LineChart
				style={{
					height: props.height,
					width: props.width,
					position: 'absolute'
				}}
				data={lastDayData}
				svg={{ stroke: color, strokeDasharray: 4, strokeWidth: 0.7 }}
				contentInset={{ top: 2, bottom: 2 }}
				ticks={2}
				gridMax={max}
				gridMin={min}
			/>
			<LineChart
				style={{
					height: props.height,
					width: `${props.chartWidth}%`,
					maxWidth: props.width
				}}
				// data={groupChartsLine(currentDayData)}
				data={currentDayData}
				svg={{ stroke: color, strokeWidth: 1.6 }}
				curve={shape.curveNatural}
				contentInset={{ top: 2, bottom: 2 }}
				ticks={30}
			/>
		</View>
	);
};

export const groupChartsLine = data => {
	let part = 5;
	return data.reduce((acc, value, idx) => {
		const key = Math.floor((idx + 1) / part);
		acc[key] ? (acc[key] = (value + acc[key]) / 2) : (acc[key] = value);
		return acc;
	}, []);
};

const getColor = (color: Color): string => {
	switch (color) {
		case 'red':
			return chartColors.red;
		default:
			return chartColors.green;
	}
};

export default TickerChart;
