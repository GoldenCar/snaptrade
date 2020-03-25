// flow

import React from 'react';
import {
	connect,
	type MapStateToProps,
	type MapDispatchToProps
} from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import type { NavigationScreenConfig } from 'react-navigation';
import TickerList from '../../components/TickerCard/TickerList';
import PrivateRoute from '../../containers/PrivateRoute';
import type { TickerSymbol } from '../../data/TickerModel';
import {
	getFeedLoading,
	getFeedError,
	getSortedWatchList
} from '../../redux/selectors/watchlist';

import { backgroundColor } from '../../styles/base.js';
import { compose } from 'redux';
import { withNavigation } from 'react-navigation';
import SearchStocksInput from '../../containers/SearchStocksInput/SearchStocksInput';
import SearchStocksList from '../../containers/SearchStocksList/SearchStocksList';
import { fetchWatchList } from '../../redux/actions/watchlist';
import { Wrapper } from '../../components/UIComponents/MainComponents';

type DispatchProps = {|
	fetchFeedData: () => void,
	fetchChart1D: (tickerSymbol: TickerSymbol) => void
|};

type Props = {|
	...DispatchProps
|};

class HomeFeedContainer extends React.Component<Props> {
	autoFetch = null;
	refreshTimer = null;

	componentDidMount() {
		// this.fetchData();
		// fetch new data every minutes
		this.fetchData();
		console.log(new Date());
		this.autoFetch = setInterval(() => {
			console.log(new Date());
			this.fetchData();
		}, 60 * 15 * 1000);
		this.refreshTimer = setTimeout(this.fetchData, 60 * 1000);
	}

	componentWillUnmount() {
		// clearInterval(this.autoFetch);
		clearTimeout(this.refreshTimer);
	}

	fetchData = async () => {
		this.props.fetchWatchlist();
		await this.refList.fetchStock();
	};

	render() {
		return (
			<Wrapper>
				<PrivateRoute>
					<TickerList
						ref={ref => (this.refList = ref)}
						onRefresh={this.fetchData}
						tickers={this.props.tickers}
						refreshing={this.props.isLoading}
						navigation={this.props.navigation}
					/>
				</PrivateRoute>
				<SearchStocksList page={"Watchlist"} />
			</Wrapper>
		);
	}
}

const mapStateToProps = state => ({
	tickers: getSortedWatchList(state),
	isLoading: getFeedLoading(state),
	error: getFeedError(state),
	mode: state.setting.darkMode
});

const mapDispatchToProps = {
	fetchWatchlist: fetchWatchList
};

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);
export default compose(withConnect)(HomeFeedContainer);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: backgroundColor.primary,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
