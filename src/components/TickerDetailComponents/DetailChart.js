import React from 'react';
import { Text, View } from 'react-native';
import * as shape from 'd3-shape';
import { Defs, Stop, LinearGradient, G, Line } from 'react-native-svg';
import { AreaChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import {
	colors,
	fillcolors,
	textColors,
	backgroundColor,
	borderColor,
	fonts
} from '../../styles/base.js';
import StyledText from '../StyledText/index.js';

type ChartData = {
	close: number,
	date: string
};

const chartColors = Object.freeze({
	red: colors.red,
	green: colors.green
});

// FIXME: Do not use undeclarated variables or don't commit
// const chartFillColors = Object.freeze({
//   red: fillcolors.red,
//   green: fillcolors.green,
// });
const chartFillColors = Object.freeze({
	red: colors.red,
	green: colors.green
});

type Color = 'red' | 'green';

type Props = {
	chartData: ChartData[],
	height: number,
	width: number,
	color: Color
};
/**
 * Functional component to show a Ticker Card in Feed.
 **/

const DetailChart = (props: Props) => {
	let priceData = props.chartData.map(x => x.close);
	let dateData = props.chartData.map(x => x.date);
	//  let priceData = props.chartData.map(x => parseInt(x.close, 10));
	let color =
		priceData[0] < priceData[priceData.length - 1]
			? colors.green
			: colors.red;
	// let fillcolor = getFillColor(props.color);
	const Gradient = ({ index }) => (
		<Defs key={index}>
			<LinearGradient
				id={'gradient'}
				x1={'0%'}
				y={'0%'}
				x2={'0%'}
				y2={'100%'}>
				<Stop offset={'0%'} stopColor={color} stopOpacity={10} />
				<Stop
					offset={'100%'}
					stopColor={backgroundColor.primary}
					stopOpacity={-1}
				/>
			</LinearGradient>
		</Defs>
	);
	const CustomGrid = ({ x, y, data, ticks }) => (
		<G>
			{// Horizontal grid
			ticks.map(tick => (
				<Line
					key={tick}
					x1={'0%'}
					y1={y(tick) * 3}
					x2={'100%'}
					y2={y(tick) * 3}
					stroke={textColors.tertiary}
					strokeWidth="0.5"
				/>
			))}
			{// Vertical grid
			ticks.map(tick => (
				<Line
					key={tick}
					x1={y(tick) * 3}
					y1={'0%'}
					x2={y(tick) * 3}
					y2={'100%'}
					stroke={textColors.tertiary}
					strokeWidth="0.5"
				/>
			))}
		</G>
	);
	return (
		<View
			style={{
				height: props.height + 20,
				width: props.width,
				flexDirection: 'row',
				backgroundColor: backgroundColor.primary
			}}>
			<YAxis
				data={priceData}
				style={{ marginBottom: props.isSmall ? 0 : 30, padding: 2 }}
				contentInset={{ top: 10, bottom: 10 }}
				svg={{
					fill: textColors.primary,
					fontSize: props.isSmall ? 7 : 10
				}}
				numberOfTicks={4}
				formatLabel={value => value}
			/>
			<View
				style={{
					marginLeft: 1,
					flex: 1,
					backgroundColor: backgroundColor.primary
				}}>
				<AreaChart
					style={{ flex: 1, width: '100%' }}
					data={priceData}
					svg={{
						fill: 'url(#gradient)',
						stroke: color,
						fillOpacity: 0.5,
						scale: 1.002,
						strokeWidth: 2
					}}
					contentInset={{ top: 2, bottom: 2 }}
					curve={shape.curveNatural}
					animate>
					<Gradient />
					<CustomGrid belowChart={false} />
				</AreaChart>
				{!props.isSmall ? (
					<XAxis
						style={{
							padding: props.isSmall ? 5 : 10,
							height: props.isSmall ? 15 : 30,
							backgroundColor: backgroundColor.primary,
							width: '100%'
						}}
						data={dateData}
						formatLabel={(value, index) => value}
						contentInset={{ left: 10, right: 10 }}
						svg={{
							fontSize: props.isSmall ? 7 : 10,
							fill: textColors.primary
						}}
						numberOfTicks={6}
					/>
				) : (
					<Text
						style={{
							color: textColors.primary,
							width: '100%',
							textAlign: 'center',
							fontSize: fonts.xsmall_text
						}}>
						1 year chart
					</Text>
				)}
			</View>
		</View>
	);
};

export default DetailChart;
