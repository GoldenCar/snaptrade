import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { PERIODS } from '../../constants';
import { TickerChartStyled } from './styles';
import { colors } from '../../styles/base';
import Chart from './Chart';
import ChartDashed from './ChartDashed';
import { getChartState } from '../../redux/selectors/charts';
import { fetchStockChart } from '../../redux/actions/charts';

class StockChart extends Component {
	updateTimer = null;
	static defaultProps = {
		period: '1d',
		ticker: '',
		fetchOnMount: true,
		prev: true
	};

	state = {
		data: [],
		prevision: 0,
		status: colors.green,
		width: 100,
		pending: false,
		min: 0,
		max: 0,
		updatedAt: undefined
	};

	// async componentDidMount() {
	// 	if (this.props.fetchOnMount) {
	//
	// 	}
	// }

	shouldComponentUpdate = async (props, state) => {
		return props.chartData.updatedAt !== this.props.chartData.updatedAt;
	};

	static getDerivedStateFromProps = (props, state) => {
		if (props.chartData.updatedAt !== state.updatedAt) {
			return { ...state, ...props.chartData };
		}
		return state;
	};

	render() {
		if (!this.state.data.length) return null;
		return (
			<View style={TickerChartStyled.wrapper}>
				{this.props.prev && (
					<ChartDashed
						max={this.state.max}
						min={this.state.min}
						prevision={[this.state.prevision, this.state.prevision]}
						status={this.state.status}
					/>
				)}
				<Chart
					data={this.state.data}
					status={this.state.status}
					width={this.state.width}
				/>
			</View>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		chartData: getChartState(props.ticker, props.period)(state)
	};
};

const mapDispatchToProps = {};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StockChart);
