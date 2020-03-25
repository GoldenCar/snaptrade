import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Icon, ListItem } from 'react-native-elements';
import styles from './styles';
import {
	View as AView,
	initializeRegistryWithDefinitions
} from 'react-native-animatable';
import { withNavigation, SafeAreaView } from 'react-navigation';
import {
	fetchSearchCompany,
	addStockToWatchList,
	clearSearchBox,
	fetchWatchList
} from '../../redux/actions/watchlist';
import { compose } from 'redux';
import TouchableScale from 'react-native-touchable-scale';
import Ticker from '../../redux/orm/models/Ticker';
import { SearchBar } from 'react-native-elements';
import { mainStyles } from '../../styles/controls';
import { dimensions, colors, spacingOrSizingScale } from '../../styles/base';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { getUserLoggin } from '../../redux/selectors/user';
import { Actions } from 'react-native-router-flux';

type SearchBoxCompanyProps = {
	ticker: string,
	company: string,
	rank: string,
	onCompanyPress: (ticker: Ticker) => void,
	onAddCompanyToWatchList: (ticker: Ticker) => void
};

type SearchBoxProps = {
	searchCompany: Ticker[],
	pendingCompany: boolean,
	searchCompanyError: string
};

initializeRegistryWithDefinitions({
	SlideIn: {
		from: {
			transform: [{ translateY: -dimensions.fullHeight }]
		},
		to: {
			transform: [{ translateY: 0 }]
		}
	},
	SlideOut: {
		from: {
			transform: [{ translateY: 0 }]
		},
		to: {
			transform: [{ translateY: -dimensions.fullHeight }]
		}
	}
});

class SearchBoxCompany extends React.PureComponent<SearchBoxCompanyProps> {
	onAddCompanyToWatchList = () => {
		this.props.onAddCompanyToWatchList({
			ticker: this.props.ticker,
			company: this.props.company,
			rank: this.props.rank
		});
	};

	onCompanyPress = () => {
		this.props.onCompanyPress({
			ticker: this.props.ticker,
			company: this.props.company,
			rank: this.props.rank
		});
	};
	render() {
		return (
			<AView animation={'fadeIn'} duration={400}>
				<ListItem
					onPress={this.onCompanyPress}
					key={this.props.ticker}
					title={this.props.ticker}
					subtitle={this.props.company}
					bottomDivider={true}
					rightIcon={
						this.props.canAddToWatchlist && (
							<TouchableOpacity
								delayPressIn={0}
								style={styles.addButton}
								onPress={this.onAddCompanyToWatchList}>
								<Icon
									type={'font-awesome'}
									color={colors.dark}
									name={'plus'}
									size={spacingOrSizingScale._24}
								/>
							</TouchableOpacity>
						)
					}
				/>
			</AView>
		);
	}
}

class SearchStocksList extends Component<SearchBoxProps> {
	static propTypes = {
		searchCompany: PropTypes.array,
		pendingCompany: PropTypes.bool,
		searchCompanyError: PropTypes.string
	};

	static defaultProps = {
		searchCompany: [],
		pendingCompany: false,
		searchCompanyError: ''
	};

	state = {
		focused: false,
		keyword: ''
	};
	timer = null;

	onChange = (keyword: string) => {
		this.setState({ keyword });
		if (this.timer) clearTimeout(this.timer);
		if (keyword) {
			this.timer = setTimeout(
				() => this.props.fetchSearchCompany(keyword),
				700
			);
		}
	};

	hide = () => {
		this.setState({ focused: false });
	};

	show = () => {
		this.setState({ focused: true });
	};

	onCompanyPress = (company: Ticker) => {
		Actions.DetailFeed({
			tickerData: company,
			BackTitle: this.props.page
		});
	};

	onClear = () => {
		this.props.clearSearchBox();
	};

	onAddedTickerToWatchlist = () => {
		Actions.Watchlist();
		this.onClear();
		this.props.fetchData();
	};

	onAddCompanyToWatchList = (company: Ticker) => {
		this.props.addStockToWatchList(
			company.ticker,
			this.onAddedTickerToWatchlist
		);
	};

	_keyExtractor = (item, index) => `${item.ticker}`;

	renderCompany = ({ item }) => {
		return (
			<SearchBoxCompany
				key={item.ticker}
				lightTheme={true}
				onCompanyPress={this.onCompanyPress}
				onAddCompanyToWatchList={this.onAddCompanyToWatchList}
				company={item.company}
				rank={item.rank}
				ticker={item.ticker}
				canAddToWatchlist={this.props.isLogin}
			/>
		);
	};

	render() {
		return (
			<AView
				animation={
					this.props.searchCompany.length ? 'SlideIn' : 'SlideOut'
				}
				duration={600}
				useNativeDriver
				style={[styles.wrapper]}>
				<FlatList
					keyExtractor={this._keyExtractor}
					initialNumToRender={5}
					style={styles.scrollWrapper}
					data={this.props.searchCompany}
					renderItem={this.renderCompany}
				/>
			</AView>
		);
	}
}

const mapStateToProps = state => {
	return {
		searchCompany: state.watchlist.searchCompany,
		pendingCompany: state.watchlist.pendingCompany,
		searchCompanyError: state.watchlist.searchCompanyError,
		isLogin: getUserLoggin(state)
	};
};
const mapDispatchToProps = {
	fetchSearchCompany,
	addStockToWatchList,
	clearSearchBox,
	fetchData: fetchWatchList
};

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

export default compose(withConnect)(SearchStocksList);
