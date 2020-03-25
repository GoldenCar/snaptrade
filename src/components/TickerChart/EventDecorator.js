import React, { Component } from 'react';
import { Circle, Text, TSpan } from 'react-native-svg';
import { colors } from '../../styles/base';

export const EventDecorator = ({ x, y, data, events, onTouch, onTouchEnd }) => {
	return events.map((point, index) => {
		const value = data[point.index];
		return (
			<EventPoint
				key={index}
				x={x(point.index)}
				y={y(value) - 15}
				value={value}
				type={point.event}
				label={point.name}
				index={point.index}
				onTouch={onTouch}
				onTouchEnd={onTouchEnd}
			/>
		);
	});
};

export default class EventPoint extends Component {
	state = {
		open: false
	};

	open = () => {
		this.props.onTouch(
			null,
			null,
			this.props.value,
			this.props.index,
			this.props.label
		);

		this.setState({ open: true });
	};

	close = () => {
		this.props.onTouchEnd();
		this.setState({ open: false });
	};

	render() {
		const { x, y, type, index } = this.props;
		if (type === 'news') {
			return (
				<React.Fragment>
					<Circle
						onPressIn={this.open}
						// onPressOut={this.close}
						key={index}
						cx={x}
						cy={y}
						r={12}
						stroke={colors.purple}
						fill={colors.white}
						style={{ zIndex: 1000, elevation: 10 }}
					/>
					<Text
						fontSize={12}
						x={x - 4}
						fontWeight={'600'}
						y={y + 4}
						fill={colors.violet}>
						{`N`}
					</Text>
				</React.Fragment>
			);
		} else if (type === 'earnings') {
			return (
				<React.Fragment>
					<Circle
						onPressIn={this.open}
						// onPressOut={this.close}
						key={index}
						cx={x}
						cy={y}
						r={12}
						stroke={colors.purple}
						fill={colors.purple}
					/>
					<Text
						x={x - 4}
						y={y + 4}
						fontWeight={'600'}
						fontSize={12}
						fill={colors.white}>
						{`E`}
					</Text>
				</React.Fragment>
			);
		} else if (type === 'Technical Signal') {
			return (
				<React.Fragment>
					<Circle
						onPressIn={this.open}
						// onPressOut={this.close}
						key={index}
						cx={x}
						cy={y}
						r={12}
						stroke={colors.purple}
						fill={colors.purple}
					/>
					<Text
						x={x - 4}
						y={y + 4}
						fontWeight={'600'}
						fontSize={12}
						fill={colors.white}>
						{`$`}
					</Text>
				</React.Fragment>
			);
		}
		return null;
	}
}
