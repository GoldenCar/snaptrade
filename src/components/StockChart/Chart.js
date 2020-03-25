import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import * as shape from 'd3-shape';
import { LineChart } from 'react-native-svg-charts';
import { colors } from '../../styles/base';

export default class Chart extends Component {
	static defaultProps = {
		data: [],
		status: colors.green,
		width: 100,
		max: 0,
		min: 0
	};

	shouldComponentUpdate = props =>
		props.data.length !== this.props.data.length ||
		props.status !== this.props.status;

	render() {
		return (
			<LineChart
				style={[
					StyleSheet.absoluteFill,
					{ width: `${this.props.width}%` }
				]}
				data={this.props.data}
				svg={{ stroke: this.props.status, strokeWidth: 0.8 }}
				curve={shape.curveNatural}
				contentInset={{ top: 2, bottom: 2 }}
				numberOfTicks={30}
			/>
		);
	}
}
