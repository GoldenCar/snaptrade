import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import type { NavigationScreenConfig } from 'react-navigation';
import { backgroundColor, padding } from '../../styles/base.js';
import { connect } from 'react-redux';

import TickerDetail from '../../components/TickerDetail';
import type { TickerDetailModel } from '../../data/TickerDetailModel';
import SignComponent from '../../components/SignComponent/SignComponent.js';
import { getPSTHours } from '../../utils/index.js';
import SignContainer from '../../components/TickerDetailComponents/SignContainer.js';
import { setIsInWatchList } from '../../redux/actions/ticker.js';
import api from '../../api/api.js';
import { Row } from '../../components/UIComponents/MainComponents.js';
import styled from 'styled-components';
import { Svg, G, Path } from 'react-native-svg';

import { Actions } from 'react-native-router-flux';
import { colors } from '../../styles/base';

type State = {
	error: ?Error
};

const Back = ({ width, height, color }) => {
	return (
		<Svg
			version="1.1"
			id="Layer_1"
			x="0px"
			y="0px"
			width={width}
			height={height}
			viewBox="0 0 492 492"
			space="preserve">
			<G>
				<G>
					<Path
						fill={color}
						d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12
	C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084
	c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864
	l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z"
					/>
				</G>
			</G>
		</Svg>
	);
};

class DetailFeed extends React.Component<{}, State> {
	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;
		const ticker = params.tickerData.ticker;
		return {
			title: ticker || 'Details',
			headerLeft: (
				<TouchableOpacity onPress={() => Actions.pop()}>
					<Row
						style={{
							marginLeft: padding.large,
							alignItems: 'center'
						}}>
						<Back
							color={colors.purple}
							width={18}
							height={18}
						/>
						<Text
							style={{
								fontSize: 20,
								color: colors.purple,
								fontWeight: 'bold'
							}}>
							{params.BackTitle}
						</Text>
					</Row>
				</TouchableOpacity>
			),
			headerRight: (
				<Row style={{ marginRight: padding.large }}>
					<SignComponent
						signed={params.isInWatchList}
						ticker={ticker}
					/>
				</Row>
			)
		};
	};

	constructor(props: any) {
		super(props);
		this.state = {
			chartData: [],
			tickerNews: [],
			chartDta: [],
			tickerDetails: [],
			error: null,
			timePeriod: getPSTHours() < 13 ? '1y_a' : '1d'
		};
	}

	componentDidMount() {
		const headerTintColor = this.props.mode ? '#fff' : '#000';
		this.props.navigation.setParams({ headerTintColor });
		this.fetchData();
	}

	fetchData = () => {
		this._getChartData();
		this._getTickerDetails();
		this._getTickerNews();
	};

	render() {
		return <Container>{this._renderTickerDetail()}</Container>;
	}

	_renderTickerDetail() {
		const { navigation } = this.props;
		const tickerData = navigation.getParam('tickerData');
		if (this.state.error) {
			return <Text>Something went wrong!</Text>;
		} else if (this.state.tickerDetails) {
			return (
				<TickerDetail
					_onRefresh={this.fetchData}
					timePeriod={this.state.timePeriod}
					action={this._getChartData}
					tickerData={tickerData}
					chartData={this.state.chartData}
					tickerDetails={this.state.tickerDetails}
					tickerNews={this.state.tickerNews}
				/>
			);
		}
		return <Text>Loading...</Text>;
	}

	_getChartData = (period, symbol) => {
		if (!period) {
			period = '1y_a';
		}
		this.setState({ timePeriod: period });
		// if (!symbol) {
		// 	const { navigation } = this.props;
		// 	const tickerData = navigation.getParam('tickerData');
		// 	symbol = tickerData.ticker;
		// }

		// return fetch(
		// 	'https://api.snaptrade.us/chart/tickers/' +
		// 		symbol +
		// 		'?period=' +
		// 		period
		// )
		// 	.then(response => response.json())
		// 	.then(responseJson => {
		// 		this.setState({ chartData: responseJson });
		// 	})
		// 	.catch(error => {
		// 		this.setState({
		// 			chartData: [],
		// 			error: error
		// 		});

		// 		console.error(error);
		// 	});
	};

	_getTickerDetails = async () => {
		const { navigation } = this.props;
		const tickerData = navigation.getParam('tickerData');
		try {
			let details = null;
			if (this.props.ticket[tickerData.ticker]) {
				details = Object.assign(this.props.ticket[tickerData.ticker]);
				this.setState({ tickerDetails: details });
			}
			const res = await api.get(
				'/tickers/' + tickerData.ticker + '?period=1d'
			);
			details = res.data[0];

			const isInWatchList = details.is_in_watchlist;
			const { params = {} } = navigation.state;

			this.props.navigation.setParams({
				isInWatchList: params.isInWatchList || isInWatchList
			});
			// this.props.setIsInWatchList(isInWatchList);
			this.setState({ tickerDetails: details });
		} catch (error) {
			console.log('error', error);
			this.setState({
				tickerDetails: [],
				error: error
			});
		}

		// return
		// 	.then(response => response.json())
		// 	.then(responseJson => {
		// 		const tickerDetails = responseJson[0] || {};

		// 	})
		// 	.catch(error => {
		// 		this.setState({
		// 			tickerDetails: [],
		// 			error: error
		// 		});
		// 		console.error(error);
		// 	});
	};

	_getTickerNews() {
		const { navigation } = this.props;
		const tickerData = navigation.getParam('tickerData');
		return fetch(
			'https://api.snaptrade.us/news?ticker=' +
				tickerData.ticker +
				'&relevance=1&limit=10'
		)
			.then(response => response.json())
			.then(responseJson => {
				this.setState({ tickerNews: responseJson });
			})
			.catch(error => {
				this.setState({
					tickerNews: [],
					error: error
				});
				console.error(error);
			});
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: backgroundColor.primary_rev,
		alignItems: 'flex-start',
		justifyContent: 'flex-start'
	}
});

const Container = styled.View`
	flex: 1;
	background-color: ${props => props.theme.colors.background};
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-start;
`;

const mapStateToProps = state => ({
	ticket: state.discovery.setTicket,
	mode: state.setting.darkMode
});

const mapDispatchToProps = {
	setIsInWatchList: setIsInWatchList
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DetailFeed);
