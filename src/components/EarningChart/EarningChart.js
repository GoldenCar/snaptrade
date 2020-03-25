import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { LineChart } from 'react-native-svg-charts';

import { EarningChartStyled } from './styles';
import ChartPoint from './ChartPoint';
import ChartActivePointTooltip from './ChartActivePointTooltip';

const Decorator = ({ x, y, data, color, onTouch, onTouchEnd }) => {
	return data.map((value, index) => (
		<ChartPoint
			key={index}
			index={index}
			x={x}
			y={y}
			onTouch={onTouch}
			onTouchEnd={onTouchEnd}
			color={color}
			value={value}
		/>
	));
};

export default class Chart extends Component {
	static defaultProps = {
		data: [],
		color: ''
	};

	state = {
		touchedValue: 0,
		touchedIndex: undefined
	};

	onTouch = (x, y, value, index) => {
		this.setState(() => ({ touchedValue: value, touchedIndex: index }));
	};

	onTouchEnd = () =>
		this.setState(() => ({ touchedValue: 0, touchedIndex: undefined }));

	render() {
	return (
			<LineChart
				style={[StyleSheet.absoluteFill, EarningChartStyled.chart]}
				contentInset={{ top: 50, bottom: 50, left: 50, right: 50 }}
				data={this.props.data}
				gridMin={this.props.min}
				gridMax={this.props.max}
				svg={{
					fillRule: 'nonzero',
					strokeLinecap: 'round',
					scale: 1.002,
					strokeWidth: 0
				}}
				animate>
				<Decorator
					onTouch={this.onTouch}
					onTouchEnd={this.onTouchEnd}
					color={this.props.color}
				/>
				<ChartActivePointTooltip
					touchedValue={this.state.touchedValue}
					touchedIndex={this.state.touchedIndex}
				/>
			</LineChart>
		);
	}
}
