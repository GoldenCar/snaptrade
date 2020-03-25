import React, { Component } from 'react';
import { View } from 'react-native';
import api from '../../api/api';

import { EarningChartStyled } from './styles';

import styled from 'styled-components';
import EarningChart from './EarningChart';
import XAxis from './xAxis';
import YAxis from './yAxis';
import ChartLoader from './ChartLoader';
import EarningItem from './EarningItem';
import { Row, ContentOffset } from '../UIComponents/MainComponents';
import { TitleBold } from '../UIComponents/TextComponents';
import { dimensions, padding } from '../../styles/base';
import { Divider } from '../UIComponents/ControlComponents';

const reduceChart = ([eps_actuals, eps_estimates, dates, min, max], item) => {
	if (item.eps_actual) {
		eps_actuals = [...eps_actuals, item.eps_actual];
		eps_estimates = [...eps_estimates, item.eps_estimate];
		dates = [...dates, item.earning_qtr];
	}

	if (!min || item.eps_actual < min) min = item.eps_actual;
	if (item.eps_estimate < min) min = item.eps_estimate;

	if (item.eps_actual > max) max = item.eps_actual;
	if (item.eps_estimate > max) max = item.eps_estimate;

	// if (item.close > max) max = item.close;

	// if (min === null || item.close < min) min = item.close;

	return [eps_actuals, eps_estimates, dates, min, max];
};
const actualColor = '#6979f8';
const estimatedColor = '#9cabf6';

class EarningChartComponent extends Component {
	static defaultProps = {
		height: 170,
		xAxis: true,
		yAxis: true
	};

	state = {
		dates: [],
		eps_actuals: [],
		eps_estimates: [],
		pending: false,
		next: {
			earning_date_formatted: '--',
			earning_time: '--',
			eps_actual: '--'
		}
	};

	componentDidUpdate = props => {
		if (
			props.ticker !== this.props.ticker ||
			(props.updating !== this.props.updating && !this.props.updating)
		) {
			this.fetchChart();
			this.fetchNext();
		}
	};

	componentDidMount = () => {
		this.fetchChart();
		this.fetchNext();
	};

	shouldComponentUpdate = (props, state) =>
		props.ticker !== this.props.ticker ||
		state.eps_actuals.length !== this.state.eps_actuals.length ||
		state.next.eps_actual !== this.state.next.eps_actual ||
		state.pending !== this.state.pending;

	fetchNext = async () => {
		try {
			const response = await api.get(
				`tickers/earnings/next/${this.props.ticker}`
			);
			if (response.data[0]) {
				this.setState({ next: response.data[0] });
			}
		} catch (error) {
			console.warn({ error });
		}
	};

	fetchChart = async () => {
		try {
			this.setState({ pending: true });
			const response = await api.get(
				`/tickers/earnings/${this.props.ticker}`
			);

			if (!Array.isArray(response.data) || !response.data.length) return;

			const [
				eps_actuals,
				eps_estimates,
				dates,
				min,
				max
			] = response.data.reduce(reduceChart, [[], [], [], null, 0]);

			this.setState({
				dates,
				eps_actuals,
				eps_estimates,
				pending: false
			});
		} catch (error) {
			this.setState({ pending: false });
		}
	};

	renderEarnings = () => (
		<ContentOffset>
			<Wrapper>
				<View style={{ width: '100%' }}>
					<TitleBold>Earnings</TitleBold>
					<Divider />
					<View
						style={[
							EarningChartStyled.wrapper,
							{ height: this.props.height }
						]}>
						<ChartLoader loading={this.state.pending} />
						{this.props.yAxis && (
							<YAxis data={this.state.eps_estimates} />
						)}

						<EarningChart
							color={estimatedColor}
							data={this.state.eps_estimates}
							max={this.state.max}
							min={this.state.min}
						/>

						<EarningChart
							color={actualColor}
							data={this.state.eps_actuals}
							max={this.state.max}
							min={this.state.min}
						/>
					</View>
					<View
						style={{
							width: '100%'
						}}>
						{this.props.xAxis && <XAxis data={this.state.dates} />}
					</View>
					<LabelsWrapper>
						<EarningItem
							color={actualColor}
							title={'Actual'}
							subtitle={`Expected ${
								this.state.next.earning_date_formatted
							}, ${this.state.next.earning_time}`}
						/>
						<EarningItem
							color={estimatedColor}
							title={'Estimated'}
							subtitle={this.state.next.eps_estimate}
						/>
					</LabelsWrapper>
				</View>
			</Wrapper>
		</ContentOffset>
	);

	render() {
		return (
			<View style={{ width: dimensions.fullWidth }}>
				{this.state.dates.length !== 0 && this.renderEarnings()}
			</View>
		);
	}
}

const Wrapper = styled(Row)`
	height: 240;
	width: 100%;
	justify-content: space-between;
`;

const LabelsWrapper = styled(Row)`
	justify-content: space-between;
	margin-top: ${padding.large}px;
`;

export default EarningChartComponent;
