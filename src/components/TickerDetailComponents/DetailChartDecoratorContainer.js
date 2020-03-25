import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Svg, Circle, Rect, G } from 'react-native-svg';
import { connect } from 'react-redux';
import TickerChart from '../TickerChart/TickerChart';
import { colors } from '../../styles/base';
import {
	setTickerPriceSnapshot,
	removeTickerPriceSnapshot
} from '../../redux/actions/ticker';
import { TooltipDecorator } from '../TickerChart/decorators';
import { selectTickerPriceSnapshot } from '../../redux/selectors/ticker';

class DetailChartDecoratorContainer extends Component {
	static propTypes = {
		prop: PropTypes
	};

	static defaultProps = {
		data: []
	};

	state = {
		index: null,
		value: null
	};

	onTouchStart = index => event => {
		const value = this.props.data[index];
		this.props.setPriceSnapshot(value);
	};

	onTouchEnd = index => event => {
		const value = this.props.data[index];
		this.props.removePriceSnapshot();
	};

	render() {
		const Decorator = ({ x, y, data, width }) => {
			const widthPerItem = Math.ceil(width / data.length);
			const currentY = y(this.props.max);
			return data.map((value, index) => {
				return (
					<Rect
						y={currentY}
						x={x(index)}
						width={widthPerItem}
						key={index}
						onPressIn={this.onTouchStart(index)}
						// onResponderMove={this.onTouchStart(index)}
						// onResponderStart={}
						onPressOut={this.onTouchEnd(index)}
						// onPressOut={}
						delayPressIn={0}
						delayPressOut={0}
						fill={'transparent'}
						height={this.props.height}
					/>
				);
			});
		};

		return [
			[
				<Decorator {...this.props} />,
				<TooltipDecorator
					{...this.props}
					index={10}
					value={this.props.priceSnapshot}
				/>
			]
		];
	}
}

const mapStateToProps = state => ({
	priceSnapshot: selectTickerPriceSnapshot(state)
});

const mapDispatchToProps = {
	setPriceSnapshot: setTickerPriceSnapshot,
	removePriceSnapshot: removeTickerPriceSnapshot
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DetailChartDecoratorContainer);
