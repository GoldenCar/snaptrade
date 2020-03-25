import React, { Component } from 'react';
import { View } from 'react-native';
import api from '../../api/api';
import { renderChart } from '../TickerDetail';
import { colors } from '../../styles/base';

type TDetailChartComponent = {
	imageticker_file_link: string,
	period: string,
	priceIncrease: number,

	onNotificationPress: () => void
};

const small = {
	// height:
}
export class DetailChartComponent extends Component<TDetailChartComponent> {
	static defaultProps = {
		ticker: 'AAPL',
		period: '1y_a',
		priceIncrease: 0,
		height: 230
	};

	state = {
		chartData: [],
		error: '',
		color: colors.green
	};

	componentDidMount = () => {
		this.getChartColor()
		this.getChartData();

	};
	getChartColor = async () => {
		const response = await api.get(
			'/chart/tickers/trend/' +
				this.props.ticker +
				'?period=' +
				this.props.period
		);
		this.setState({ color: response.data.is_positive ? colors.green : colors.red })
		// http://api-dev.snaptrade.us/chart/tickers/trend/FB?period=30d
	}

	getChartData = async () => {
		try {
			const response = await api.get(
				'/chart/tickers/' +
					this.props.ticker +
					'?period=' +
					this.props.period
			);
			this.setState({ chartData: response.data });
		} catch (error) {
			this.setState({ chartData: [], error: '' });
		}
	};

	render() {
		return (
			<View>
				{renderChart(this.state.chartData, this.props.priceIncrease, this.props.height, this.props.isSmall, this.state.color)}
			</View>
		);
	}
}

export default DetailChartComponent;
