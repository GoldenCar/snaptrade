import React, { Component } from 'react';
import { View, PanResponder, TouchableWithoutFeedback } from 'react-native';
import api from '../../api/api';
import { ScrollView } from 'react-native-gesture-handler';
import { MAX_CHART_POINTS } from '../../constants';
import { TickerChartStyled } from './styles';
import { colors, textStyles, padding, shadowColor } from '../../styles/base';
import Chart from './Chart';
import { connect } from 'react-redux';
import XAxis from './xAxis';
import YAxis from './yAxis';
import ChartLoader from './ChartLoader';
import { getChartState } from '../../redux/selectors/charts';
import {
	setTickerPriceSnapshot,
	removeTickerPriceSnapshot
} from '../../redux/actions/ticker';
import { mainStyles } from '../../styles/controls';
import { fetchStockChart } from '../../redux/actions/charts';
import { Text } from '../UIComponents/TextComponents';

const reduceChart = ([data, labels, events, max, min], item, index) => {
	if (item.close) {
		data = [...data, item.close];
		labels = [...labels, item.date];
	}

	if (item.event_category) {
		events = [...events, { event: item.event_category, index }];
	}

	if (item.close > max) max = item.close;

	if (min === null || item.close < min) min = item.close;

	return [data, labels, events, max, min];
};

const calculateChartWidth = (currentLength = 70, max = 70) => {
	return (100 / max) * currentLength;
};

const getCurrentActive = (currentX, width, count) => {
	const per = width / count;
	return Math.ceil(currentX / per);
};
const preFetchPeriods = ['1d', '7d', '30d', '1y', '1y_a', '5y_a'];
class TickerChart extends Component {
	state = {
		alerts: [],
		data: [],
		labels: [],
		events: [],
		status: colors.green,
		width: 100,
		current: 0,
		chartWidth: 0,
		pending: false,
		min: 0,
		max: 0,

		updatedAt: undefined,

		touchedValue: 0,
		touchedIndex: undefined,
		touchedLabel: ''
	};

	handleTouchMove = (event, state) => {
		const { nativeEvent } = event;
		const current = getCurrentActive(
			nativeEvent.locationX,
			this.state.chartWidth,
			this.state.data.length
		);
		this.setState({ current });
		this.props.setPriceSnapshot(this.state.data[current]);
		return true;
	};

	handleTouchEnd = (evt, gestureState) => {
		this.setState({ current: 0 });
		this.props.removePriceSnapshot();
		this.onTouchEnd();
		return true;
	};

	constructor(props) {
		super(props);

		this._panResponder = PanResponder.create({
			// Ask to be the responder:
			onStartShouldSetPanResponder: (evt, gestureState) => false,
			onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
			onMoveShouldSetPanResponder: (evt, gestureState) => {
				const { dx, dy } = gestureState;
				return dx > 10 || dx < -10 || dy > 10 || dy < -10;
			},
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

			onPanResponderGrant: (evt, gestureState) => {
				// The gesture has started. Show visual feedback so the user knows
				// what is happening!
				// gestureState.d{x,y} will be set to zero now
			},

			onPanResponderMove: this.handleTouchMove,
			// onPanResponderMove: (evt, gestureState) => {
			// 	// The most recent move distance is gestureState.move{X,Y}
			// 	// The accumulated gesture distance since becoming responder is
			// 	// gestureState.d{x,y}
			// },
			onPanResponderTerminationRequest: (evt, gestureState) => true,
			onPanResponderRelease: this.handleTouchEnd,
			onPanResponderTerminate: this.handleTouchEnd,
			onShouldBlockNativeResponder: (evt, gestureState) => {
				// Returns whether this component should block native components from becoming the JS
				// responder. Returns true by default. Is currently only supported on android.
				return false;
			}
		});
	}

	static defaultProps = {};

	updateTimer = null;
	static defaultProps = {
		period: '1y_a',
		ticker: '',
		height: 210,
		xAxis: true,
		yAxis: true,
		withPoints: false,
		markers: true,
		fetchOnMount: false
	};

	onTouch = (x, y, value, index, label) => {
		this.props.changeScroll();
		this.setState(() => ({
			touchedValue: value,
			touchedIndex: index,
			touchedLabel: label
		}));
	};

	onTouchEnd = () => {
		this.props.changeScroll();
		this.setState(() => ({
			touchedValue: 0,
			touchedIndex: undefined,
			touchedLabel: ''
		}));
	};

	// shouldComponentUpdate = (props, state) =>
	// 	props.chartData.updatedAt !== this.props.chartData.updatedAt;

	componentDidMount = async () => {
		if (this.props.fetchOnMount) {
			await Promise.all(
				preFetchPeriods.map(
					async period =>
						await fetchStockChart(this.props.ticker, period)
				)
			);
			// await this.LoadingLine();
			// fetchStockChart(this.props.ticker, /* this.props.period */ '1y_a');
		}
	};

	static getDerivedStateFromProps = (props, state) => {
		if (props.chartData.updatedAt !== state.updatedAt) {
			return { ...state, ...props.chartData };
		}
		return state;
	};
	//

	fetchChart = async () => {
		try {
			this.setState({ pending: true });
			const response = await api.get(
				`/chart/tickers/${this.props.ticker}?period=${this.props.period}&mobile=1`
			);
			const [data, labels, events, max, min] = response.data.reduce(
				reduceChart,
				[[], [], [], 0, null]
			);
			const status =
				data[0] < data[data.length - 1] ? colors.green : colors.red;
			let width = MAX_CHART_POINTS[this.props.period]
				? calculateChartWidth(
						data.length,
						MAX_CHART_POINTS[this.props.period]
				  )
				: 100;

			if (width > 100) width = 100;
			if (width < 5) width = 5;
			this.setState({
				data,
				labels,
				status,
				pending: false,
				events,
				width,
				max,
				min
			});
		} catch (error) {
			this.setState({ pending: false });
		}
	};

	getChartWidth = event => {
		this.setState({ chartWidth: event.nativeEvent.layout.width });
	};

	render() {
		// console.log({ fucccccccccccccccck: this.state.touchedIndex });
		const max = this.state.max + (this.state.max - this.state.min) / 5;
		return (
			<View>
				<View
					style={[
						mainStyles.row,
						{ justifyContent: 'center', height: 20 }
					]}>
					<Text style={TickerChartStyled.chartTopLabels}>
						{this.state.current
							? this.state.labels[this.state.current]
							: ''}
					</Text>

					{this.state.touchedIndex && (
						<View
							style={{
								width: 230,
								marginTop: 45,
								overflow: 'hidden',
								padding: padding.medium,
								height: 70,
								backgroundColor: this.props.mode
									? '#181818'
									: '#fff',
								borderRadius: 6,
								shadowColor: shadowColor.primary,
								shadowOffset: { width: 10, height: 10 },
								shadowOpacity: 0.4,
								shadowRadius: 6,
								elevation: 10
							}}>
							<Text
								style={{ fontSize: 10 }}
								size={10}
								numberOfLines={3}>
								{this.state.touchedLabel}
							</Text>
						</View>
					)}
				</View>
				<View style={mainStyles.row}>
					<View
						onLayout={this.getChartWidth}
						// {...this._panResponder.panHandlers}
						{...this._panResponder.panHandlers}
						style={[
							TickerChartStyled.wrapper,
							{ height: this.props.height }
						]}>
						<ChartLoader loading={this.state.pending} />
						{this.props.yAxis && <YAxis data={this.state.data} />}

						<Chart
							mode={this.props.mode}
							onTouch={this.onTouch}
							onTouchEnd={this.onTouchEnd}
							height={this.props.height}
							data={this.state.data}
							alerts={this.state.alerts}
							labels={this.state.labels}
							current={this.state.current}
							markers={this.props.markers}
							max={this.state.max}
							period={this.props.period}
							topMax={max}
							min={this.state.min}
							status={this.state.status}
							events={this.state.events}
							width={this.state.width}
							withPoints={this.props.withPoints}
							xAxis={this.props.xAxis}
							yAxis={this.props.yAxis}
						/>
					</View>
					{this.props.xAxis && (
						<XAxis
							period={this.props.period}
							data={this.state.labels}
						/>
					)}
				</View>
			</View>
		);
	}
}
window.show = false;
const mapStateToProps = (state, props) => {
	return {
		mode: state.setting.darkMode,
		chartData: getChartState(props.ticker, props.period)(state)
	};
};

const mapDispatchToProps = {
	setPriceSnapshot: setTickerPriceSnapshot,
	removePriceSnapshot: removeTickerPriceSnapshot
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TickerChart);
