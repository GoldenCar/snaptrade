import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { notificationsFetchLates } from '../../redux/actions/notifications';
import {
	getNotificationLates,
	getNotificationsPending
} from '../../redux/selectors/notifications';
import NotificationComponent from '../../components/NotificationComponent';
import { FlatList } from 'react-native-gesture-handler';
import { compose } from 'redux';
import { withNavigation } from 'react-navigation';
import Loader from '../../components/Loader/Loader';
import { getUserLoggin } from '../../redux/selectors/user';
import StyledText from '../../components/StyledText';
import { textStyles, padding } from '../../styles/base';
import NavigateTo from '../../components/NavigateToLink';
import { HomeScreenStyles } from '../../screens/HomeScreen/styles';
import { mainStyles } from '../../styles/controls';
import { Actions } from 'react-native-router-flux';

class LastNotifications extends Component {
	componentDidMount = () => {
		if (this.props.isLogin) this.props.notificationsFetchLates();
	};
	onNotificationPress = notification => {
		Actions.Watchlist({
			tickerData: notification
		})
	};

	keyExtractor = item => item.id.toString();

	renderItem = ({ item }) => {
		return (
			<NotificationComponent
				ticker={item.ticker}
				key={item.id}
				id={item.id}
				days_ago={item.days_ago}
				image_file_link={item.image_file_link}
				notification_text={item.notification_text}
				notification_text_detail={item.notification_text_detail}
				onNotificationPress={this.onNotificationPress}
			/>
		);
	};

	render() {
		return (
			<View style={{ marginBottom: padding.medium }}>
				<StyledText style={textStyles.title}>
					{this.props.isLogin
						? 'Important events in your watchlist'
						: 'Login to see your alerts'}
				</StyledText>
				<FlatList
					keyExtractor={this.keyExtractor}
					data={this.props.list}
					renderItem={this.renderItem}
					ListFooterComponent={this.props.pending ? <Loader /> : null}
				/>
				{this.props.isLogin && (
					<NavigateTo
						textStyle={HomeScreenStyles.showMore}
						screen={'Notifications'}
						wrapperStyle={[mainStyles.row, mainStyles.rowEnd]}
						text={'See all'}
					/>
				)}
			</View>
		);
	}
}

const mapStateToProps = state => ({
	list: getNotificationLates(state),
	pending: getNotificationsPending(state),
	isLogin: getUserLoggin(state)
});

const mapDispatchToProps = {
	notificationsFetchLates
};

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

export default compose(
	withConnect
)(LastNotifications);
