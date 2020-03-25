import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { LineChart, Line } from 'react-native-svg-charts';
import { colors } from '../../styles/base';

export default class ChartDashed extends Component {
	static defaultProps = {
		prevision: [],
		status: colors.green,
		max: 0,
		min: 0
	};

	shouldComponentUpdate = props =>
		props.prevision.length !== this.props.prevision.length ||
		props.status !== this.props.status;

	render() {
		return (
			<LineChart
				style={StyleSheet.absoluteFill}
				data={this.props.prevision}
				svg={{
					stroke: this.props.status,
					strokeDasharray: 4,
					strokeWidth: 0.7
				}}
				contentInset={{ top: 2, bottom: 2 }}
				numberOfTicks={2}
				gridMax={this.props.max}
				gridMin={this.props.min}
			/>
		);
	}
}
