import React, { Component } from 'react';
import { Circle, Rect, Text, G } from 'react-native-svg';
import ChartActivePoint from './ChartActivePoint';

export default class ChartPoint extends Component {
	state = {
		open: false
	};

	open = () => {
		this.props.onTouch(
			this.props.x(this.props.value),
			this.props.y(this.props.value),
			this.props.value,
			this.props.index
		);

		this.setState({ open: true });
	};

	close = () => {
		this.props.onTouchEnd();
		this.setState({ open: false });
	};

	render() {
		const { x, y, value, index, data, color } = this.props;
		return (
			<React.Fragment>
				<ChartActivePoint
					x={x}
					y={y}
					value={value}
					index={index}
					active={this.state.open}
				/>
				<Circle
					onPressIn={this.open}
					onPressOut={this.close}
					key={index}
					cx={x(index)}
					cy={y(value)}
					r={8}
					stroke={color}
					fill={color}
				/>
			</React.Fragment>
		);
	}
}

const Decorator = ({ x, y, data, color }) => {
	return data.map((value, index) => (
		<Circle
			key={index}
			cx={x(index)}
			cy={y(value)}
			r={8}
			stroke={color}
			fill={color}
		/>
	));
};
