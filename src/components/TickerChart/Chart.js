import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { LineChart } from 'react-native-svg-charts';

import { Circle, Rect, G, Line, Text } from 'react-native-svg';
import { colors, textColors, padding } from '../../styles/base';

import { TickerChartStyled } from './styles';
import { TooltipDecorator } from './decorators';
import { EventDecorator } from './EventDecorator';
import ChartActivePointTooltip from './activeTooltipPoint';

export default class Chart extends Component {
	static defaultProps = {
		data: [],
		labels: [],
		events: [],
		status: colors.green,
		width: 100,
		height: 210,
		withPoints: false
	};

	state = {
		touchedValue: 0,
		touchedIndex: undefined,
		touchedLabel: ''
	};

	onTouch = (...props) => {
		this.props.onTouch(...props);
	};

	onTouchEnd = () => this.props.onTouchEnd();

	// shouldComponentUpdate = (props, state) =>
	// 	props.current !== this.props.current ||
	// 	props.data.length !== this.props.data.length ||
	// 	props.status !== this.props.status ||
	// 	state.touchedValue !== this.state.touchedValue;

	render() {
		const Point = ({ x, y, data, color, current }) => {
			const size = 8;
			const value = data[current] || 10;
			const xCoord = current ? x(current) : -100;
			const yCoord = current ? y(value) : -100;
			return (
				<React.Fragment>
					<Rect
						height={this.props.height}
						width={1}
						fill={color}
						x={xCoord}
						y={y(this.props.max)}
					/>

					<Circle
						key={current}
						cx={xCoord}
						cy={yCoord}
						r={size}
						stroke={textColors.primary}
						fill={color}
					/>
					{/* <G x={xCoord} y={y(this.props.max)}>
					<G height={20} width={50} x={-25}>
						<Text stroke={textColors.primary}>{this.props.labels[current] || 'date'}</Text>
					</G>
				</G> */}
				</React.Fragment>
			);
		};
		const Buy_price_alert = ({ y }) => (
			<G>
				<Line
					key={'zero-axis'}
					x1={'0%'}
					x2={'100%'}
					y1={y(this.props.alerts[0].buy_price_alert)}
					y2={y(this.props.alerts[0].buy_price_alert)}
					stroke={'grey'}
					strokeWidth={1}
					strokeDasharray={[4, 8]}
				/>
				<Text
					fill={this.props.mode ? '#fff' : "#000"}
					x="100"
					y={y(this.props.alerts[0].buy_price_alert) - 5}
					fontSize="12"
					textAnchor="middle">
					Buy
				</Text>
			</G>
		);

		const Sell_price_alert = ({ y }) => (
			<G>
				<Line
					key={'zero-axis'}
					x1={'0%'}
					x2={'100%'}
					y1={y(this.props.alerts[0].sell_price_alert)}
					y2={y(this.props.alerts[0].sell_price_alert)}
					stroke={'grey'}
					strokeWidth={1}
					strokeDasharray={[4, 8]}
				/>
				<Text
					fill={this.props.mode ? '#fff' : "#000"}
					x="100"
					y={y(this.props.alerts[0].sell_price_alert) - 5}
					fontSize="12"
					textAnchor="middle">
					Sell
				</Text>
			</G>
		);
		return (
			<LineChart
				style={[
					StyleSheet.absoluteFill,
					TickerChartStyled.chart,
					{ width: `${this.props.width}%` }
				]}
				{...this.props.panA}
				// contentInset={{
				// 	left: this.props.yAxis ? 30 : padding.large,
				// 	right: padding.large,
				// 	bottom: this.props.xAxis ? 30 : 0
				// }}
				contentInset={{
					left: this.props.yAxis ? 30 : 0,
					right: 0,
					bottom: this.props.xAxis ? 30 : 0
				}}
				data={this.props.data}
				gridMin={this.props.min}
				gridMax={this.props.topMax}
				// contentInset={{  }}
				svg={{
					// stroke: colors.violet,
					stroke: this.props.status,
					fillRule: 'nonzero',
					strokeLinecap: 'round',

					strokeWidth: 2
				}}>
				{this.props.period === '1y_a' && this.props.alerts.length !== 0 &&
					this.props.alerts[0].buy_price_alert !== null && (
						<Buy_price_alert />
					)}
				{this.props.period === '1y_a' && this.props.alerts.length !== 0 &&
					this.props.alerts[0].sell_price_alert !== null && (
						<Sell_price_alert />
					)}
				{this.props.withPoints && (
					<Point
						current={this.props.current}
						color={this.props.status}
					/>
				)}
				{this.props.withPoints && (
					<TooltipDecorator
						mode={this.props.mode}
						min={this.props.min}
						max={this.props.topMax}
						index={this.props.current}
						value={this.props.data[this.props.current]}
					/>
				)}

				{this.props.markers && (
					<EventDecorator
						onTouch={this.onTouch}
						onTouchEnd={this.onTouchEnd}
						events={this.props.events}
					/>
				)}

				<ChartActivePointTooltip
					touchedValue={this.state.touchedValue}
					touchedIndex={this.state.touchedIndex}
					touchedLabel={this.state.touchedLabel}
				/>
			</LineChart>
		);
	}
}
