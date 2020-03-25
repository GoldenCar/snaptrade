import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, Text } from 'react-native';
import type { NavigationScreenConfig } from 'react-navigation';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
	getNotificationsPending,
	getNotificationsListFiltred,
	getShowAllNotifications
} from '../../redux/selectors/notifications';
import { State } from '../../redux/actions/types';
import {
	notificationsRequest,
	showAllNotifications,
	notificationsFetchSeens,
	notificationsFetchClick
} from '../../redux/actions/notifications';
import { ListItem, Button } from 'react-native-elements';
import Loader from '../../components/Loader/Loader';
import { withNavigation } from 'react-navigation';
import NotificationComponent from '../../components/NotificationComponent';
import PrivateRoute from '../../containers/PrivateRoute';
import { Actions } from 'react-native-router-flux';
// import styled from 'styled-components';
// import { Wrapper } from '../../components/UIComponents/MainComponents';
// import { padding } from '../../styles/base';

type NotificationScreenProps = {
	list: array,
	isShowAllNotifications: boolean,
	pending: boolean,
	notificationsRequest: () => void,
	showAllNotifications: () => void,
	mode: boolean
};

class NotificationsScreen extends Component<NotificationScreenProps> {
	componentDidMount() {
		this.props.navigation.addListener('didFocus', this.onScreenFocus);
	}

	onScreenFocus = () => {
		this.props.notificationsRequest();
		this.props.notificationsFetchSeens();
	};

	static propTypes = {
		list: PropTypes.array
	};

	showAllNotifications = () => {
		this.props.showAllNotifications();
	};

	onNotificationPress = notification => {
		this.props.notificationsFetchClick(notification.id);
		this.redirectToTicker(notification);
	};

	keyExtractor = (item, index) => item.id.toString();

	redirectToTicker = notification => {
		Actions.NotificationsDetail({
			tickerData: notification,
			BackTitle:"Notifications"
		});
	};

	renderNotification = ({ item }) => (
		<NotificationComponent
			key={item.id}
			days_ago={item.days_ago}
			ticker={item.ticker}
			id={item.id}
			image_file_link={item.image_file_link}
			notification_text={item.notification_text}
			notification_text_detail={item.notification_text_detail}
			onNotificationPress={this.onNotificationPress}
		/>
	);

	render() {
		return (
			<React.Fragment>
				<PrivateRoute>
					<FlatList
						keyExtractor={this.keyExtractor}
						onRefresh={this.onScreenFocus}
						data={this.props.list}
						refreshing={false}
						renderItem={this.renderNotification}
						ListHeaderComponent={
							this.props.pending ? <Loader /> : null
						}
					/>
					{!this.props.isShowAllNotifications && (
						<Button
							title={'Show more'}
							onPress={this.showAllNotifications}
						/>
					)}
				</PrivateRoute>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: State) => ({
	list: getNotificationsListFiltred(state),
	isShowAllNotifications: getShowAllNotifications(state),
	pending: getNotificationsPending(state),
	mode: state.setting.darkMode
});

const mapDispatchToProps = {
	notificationsRequest,
	showAllNotifications,
	notificationsFetchSeens,
	notificationsFetchClick
};

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);
export default compose(withConnect)(NotificationsScreen);
