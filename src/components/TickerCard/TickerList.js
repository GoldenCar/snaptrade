// @flow

import React from 'react';
import { View, Text } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Ticker from '../../redux/orm/models/Ticker';
import TickerCard, { HiddenItem } from './TickerCard';
import TickerHeader from './TickerHeader';
import { Wrapper } from '../UIComponents/MainComponents';
import { Actions } from 'react-native-router-flux';
import { fetchStockChart } from '../../redux/actions/charts';

type Props = {
	tickers: Ticker[],
	navigation: any,
	onRefresh: () => void
};

export default class TickerList extends React.Component<Props> {
	onTickerPress = tickerData => {
		Actions.WatchlistDetail({
			tickerData,
			isInWatchList: true,
			BackTitle:"Watchlist"
		});
	};

	fetchStock = async () => {
		this.props.tickers.forEach(async value => {
			await fetchStockChart(value.ticker, '1d');
		});
	};

	keyExtractor = (item: Ticker) => item.ticker;

	renderTicker = ({ item }: { ticker: Ticker }) => (
		<TickerCard
			key={item.ticker}
			chartData={item.chartData}
			tickerData={item}
			ticker={item.ticker}
			insight_info={item.insight_info}
			onTickerPress={this.onTickerPress}
			closePrice={item.close}
			companyName={item.company_name}
			pricePctIncreaseOverLastDay={item.price_pct_increase_over_last_day}
			priceIncreaseOverLastDay={item.price_increase_over_last_day}
			closeFormatted={item.close_formatted}
			marketCapFormatted={item.market_cap_formatted}
		/>
	);

	renderHiddenItem = ({ item, index }) => (
		<HiddenItem key={item.ticker} ticker={item.ticker} />
	);

	render() {
		const { tickers } = this.props;
		if (!tickers || tickers.length == 0) {
			return null;
		}
		return (
			<Wrapper>
				<TickerHeader />
				<SwipeListView
					useFlatList={true}
					data={tickers}
					refreshing={this.props.refreshing}
					keyExtractor={this.keyExtractor}
					onRefresh={this.props.onRefresh}
					// Close row after press
					closeOnRowPress={true}
					extraData={tickers}
					// Close current row if another be open
					closeOnRowOpen={true}
					disableRightSwipe={true}
					renderHiddenItem={this.renderHiddenItem}
					rightOpenValue={-110}
					renderItem={this.renderTicker}
					initialNumToRender={7}
					maxToRenderPerBatch={7}
				/>
			</Wrapper>
		);
	}
}
