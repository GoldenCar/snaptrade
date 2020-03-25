import React, { Component } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import DiscoveryList from '../../containers/DiscoveryList';
import { withNavigation } from 'react-navigation';
import SearchStocksList from '../../containers/SearchStocksList/SearchStocksList';
import TopPrices from '../../containers/TopPrices/TopPrices';
import { RefreshControl } from 'react-native';
import { getUserLoggin } from '../../redux/selectors/user';
import { notificationsFetchLates } from '../../redux/actions/notifications';
import { fetchTopPrices } from '../../redux/actions/discovery';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getTopPricesPending } from '../../redux/selectors/discovery';
import { View } from 'react-native-animatable';
import { ContentOffset } from '../../components/UIComponents/MainComponents';
// import NewsDiscoveryComponent from '../../components/NewsDiscoveryComponent/NewsDiscoveryComponent';
import { fetchWatchList } from '../../redux/actions/watchlist';
import { colors } from '../../styles/base';
import HomeLoginAlertContainer from '../../containers/HomeLoginAlertContainer/HomeLoginAlertContainer';

export class HomeScreen extends Component {
	componentDidMount = async () => {
		console.disableYellowBox = true;
		await this.props.fetchWatchList();
	};


	refresh = () => {
		this.props.fetchTopPrices();
	};

	render() {
		return (
			<View>
				<ScrollView
					keyboardDismissMode={'interactive'}
					refreshControl={
						<RefreshControl
							colors={[colors.violet]}
							refreshing={
								this.props.topPrices &&
								this.props.topPrices.pending
							}
							onRefresh={this.refresh}
						/>
					}>
					<HomeLoginAlertContainer />
					<ContentOffset>
						<TopPrices />
					</ContentOffset>
					<DiscoveryList />
				</ScrollView>
				<SearchStocksList page={"Home"} />
			</View>
		);
	}
}

const mapStateToProps = state => ({
	mode: state.setting.darkMode,
	state: state,
	topPrices: state.discovery.topPrices,
	// notificationsPending: getNotificationsPending(state),
	isLogin: getUserLoggin(state)
});

const mapDispatchToProps = {
	notificationsFetchLates,
	fetchTopPrices,
	fetchWatchList
};

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

export default compose(
	withConnect
)(HomeScreen);
