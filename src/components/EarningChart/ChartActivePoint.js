import React, { Component } from 'react';
import { colors } from '../../styles/base';
import { Circle } from 'react-native-svg';

export default class ChartActivePoint extends Component {
	render() {
		const { x, y, value, index } = this.props;
		// const { open } = this.state
		// if (!this.props.active) return null;
		return (
			<Circle
				key={index}
				cx={x(index)}
				cy={y(value)}
				r={this.props.active ? 24 : 1}
				stroke={colors.violet_light}
				fill={colors.violet_light}
			/>
		);
	}
}
