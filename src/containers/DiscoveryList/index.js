import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TouchableOpacity, FlatList } from 'react-native';
import { fetchDiscovery } from '../../redux/actions/discovery';
import {
	getDiscoveryList,
	getDiscoveryPending
} from '../../redux/selectors/discovery';
import Loader from '../../components/Loader/Loader';
import { compose } from 'redux';
import { withNavigation } from 'react-navigation';
import DiscoverySmallComponent from '../../components/DiscoverySmallComponent';
import DiscoveryColumnsComponent from '../../components/DiscoveryColumnsComponent';
import DiscoveryBigComponent from '../../components/DiscoveryBigComponent';
import DiscoveryUpcomingEarning from '../../components/DiscoveryUpcomingEarning';
import DiscoveryNotificationComponent from '../../components/DiscoveryNotificationComponent/DiscoveryNotificationComponent';
import DiscoveryWatchListComponent from '../../components/DiscoveryWatchListComponent/DiscoveryWatchListComponent';
import EarningNewsComponent from '../../components/EarningNewsComponent/EarningNewsComponent';
import styled from 'styled-components';
import { Row } from '../../components/UIComponents/MainComponents';
import { padding } from '../../styles/base';
import { Actions } from 'react-native-router-flux';

type TDiscoveryList = {
	list: array,
	pending: boolean
};

const AllowedTypes = [
	'news_small_image_left',
	'news_small_image_right',
	'disovery_2_column',
	'big_news',
	'upcoming_earnings',
	'notifications',
	'discover_watchlist'
];
export class DiscoveryList extends Component<TDiscoveryList> {
	static propTypes = {
		list: PropTypes.array,
		pending: PropTypes.bool
	};

	componentDidMount = () => {
		this.props.fetchDiscovery();
	};

	onDiscoveryPress = discover => {
		Actions.DetailFeed({
			tickerData: discover,
			BackTitle:"Home"
		});
		// this.props.navigation.navigate('Detail');
	};

	renderItem = ({ item, index }) => {
		if (
			item.item_type === 'news_small_image_left' ||
			item.item_type === 'news_small_image_right'
		) {
			return (
				<DiscoverySmallComponent
					key={`${item.item_type}_${index}`}
					onDiscoveryPress={this.onDiscoveryPress}
					item_type={item.item_type}
					items={item.items}
				/>
			);
		} else if (item.item_type === 'disovery_2_column') {
			return (
				<DiscoveryColumnsComponent
					items={item.items}
					key={`${item.item_type}_${index}`}
					onNewsPress={this.onDiscoveryPress}
					item_type={'disovery_2_column'}
				/>
			);
		} else if (item.item_type === 'big_news') {
			return (
				<DiscoveryBigComponent
					key={`${item.item_type}_${index}`}
					onDiscoveryPress={this.onDiscoveryPress}
					item_type={item.item_type}
					items={item.items}
				/>
			);
		} else if (item.item_type === 'notifications') {
			return item.items.map(notify => (
				<DiscoveryNotificationComponent
					key={notify.ticker}
					ticker={notify.ticker}
					onNewsPress={this.onDiscoveryPress}
					notification_text_detail={notify.notification_text_detail}
					close={notify.close}
					price_pct_increase_over_last_day={
						notify.price_pct_increase_over_last_day
					}
					// ticker={notify.ticker}
				/>
			));
		} else if (item.item_type === 'upcoming_earnings') {
			return (
				<EarningNewsComponent
					key={`${item.item_type}_${index}`}
					item_type={item.item_type}
					onNewsPress={this.onDiscoveryPress}
					items={item.items[0] || []}
				/>
			);
		} else if (item.item_type === 'discover_watchlist') {
			return item.items.map((news, idx) => (
				<TouchableOpacity
					key={`${idx}_${news.ticker}`}
					onPress={() => this.onDiscoveryPress(news)}>
					<DiscoveryWatchListComponent
						ticker={news.ticker}
						onNewsPress={this.onDiscoveryPress}
						company_name={news.company_name}
						close={news.close}
						story_details={news.story_details[0]}
						price_pct_increase_over_last_day={
							news.price_pct_increase_over_last_day
						}
					/>
				</TouchableOpacity>
			));
		}
		return null;
	};

	keyExtractor = (item, index) => index.toString();

	checkAllowed = item => AllowedTypes.includes(item.item_type);

	render() {
		if (this.props.list && this.props.list.filter == undefined) {
			(async () => {
				await persistor.purge();
			})();
			return null;
		}
		return (
			<Wrapper
				initialNumToRender={7}
				enabled={false}
				refreshing={false}
				onRefresh={undefined}
				maxToRenderPerBatch={7}
				data={this.props.list.filter(this.checkAllowed)}
				contentContainerStyle={{}}
				renderItem={this.renderItem}
				ListFooterComponent={this.props.pending ? <Loader /> : null}
			/>
		);
	}
}

const Wrapper = styled.FlatList`
	background-color: ${props => props.theme.colors.background};
`;

const mapStateToProps = state => ({
	list: getDiscoveryList(state),
	pending: getDiscoveryPending(state)
});

const mapDispatchToProps = {
	fetchDiscovery
};

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

export default compose(withConnect)(DiscoveryList);
