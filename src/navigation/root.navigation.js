import React, { Component } from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import {
	StatusBar,
	SafeAreaView,
	View,
	Text,
	AsyncStorage,
	Platform,
	StyleSheet,
	NativeModules
} from 'react-native';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import DetailFeed from '../screens/DetailFeed/DetailFeed';
import Watchlist from '../screens/WacthListFeed/HomeFeed';
import SettingsScreen from '../screens/SettingsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import SearchStocksInput from '../containers/SearchStocksInput/SearchStocksInput';

import notoSansLight from '../../assets/fonts/NotoSans/NotoSansTC-Light.otf';
import notoSansRegular from '../../assets/fonts/NotoSans/NotoSansTC-Regular.otf';
import notoSansMedium from '../../assets/fonts/NotoSans/NotoSansTC-Medium.otf';
import notoSansBold from '../../assets/fonts/NotoSans/NotoSansTC-Bold.otf';
import notoSansBlack from '../../assets/fonts/NotoSans/NotoSansTC-Black.otf';

import { Font } from 'expo';
import { FETCH_NOTIFICATION_UNREAD_INTERVAL } from '../constants';
import { login, logout } from '../screens/AuthFeed/actions.AuthFeed';
import { notificationsFetchUnreadCount } from '../redux/actions/notifications';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Icon } from '../components/UIComponents/IconsComponents';

import Loader from '../components/Loader/Loader';
import homeIcon from '../../assets/icons/nav/home.png';
import homeIconInactive from '../../assets/icons/nav/home-inactive.png';
import watchlistIcon from '../../assets/icons/nav/watchlist.png';
import watchlistIconInactive from '../../assets/icons/nav/watchlist-inactive.png';
import settingsIcon from '../../assets/icons/nav/settings.png';
import settingsIconInactive from '../../assets/icons/nav/settings-inactive.png';
import activeIcon from '../../assets/icons/nav/notification.png';
import inactiveIcon from '../../assets/icons/nav/notification-inactive.png';
import styled from 'styled-components';
import { colors } from '../styles/base';
import { getNotificationsUnreadCount } from '../redux/selectors/notifications';

import SvgIcons, { SvgNames } from '../styles/icon/index';

window.fetchNotificationsCountTimer = null;
window.assetsLoaded = false;

const IconObj = {
	homeIcon: homeIcon,
	homeIconInactive: homeIconInactive,
	watchlistIcon: watchlistIcon,
	watchlistIconInactive: watchlistIconInactive,
	settingsIcon: settingsIcon,
	settingsIconInactive: settingsIconInactive
};

class TabIcon extends Component {
	render() {
		const { iconName, focused, title, darkMode } = this.props;
		let color = '#000';
		if (focused) {
			color = '#6878F6';
		} else if (darkMode) {
			color = '#d0c9d6';
		} else {
			color = '#000';
		}
		return (
			<View
				style={{
					justifyContent: 'center',
					alignItems: 'center'
				}}>
				<SvgIcons
					name={SvgNames[iconName]}
					height="24"
					width="24"
					color={color}
				/>
				<Text
					style={{
						fontWeight: '300',
						fontSize: 12,
						color: color
					}}>
					{title}
				</Text>
			</View>
		);
	}
}

class NotificationWithBadge extends Component {
	render() {
		const { unread_count, focused, title, darkMode } = this.props;
		let color = '#000';
		if (focused) {
			color = '#6878F6';
		} else if (darkMode) {
			color = '#d0c9d6';
		} else {
			color = '#000';
		}
		return (
			<View
				style={{
					justifyContent: 'center',
					alignItems: 'center'
				}}>
				{unread_count !== 0 && (
					<Badge>
						<BadgeText>{unread_count}</BadgeText>
					</Badge>
				)}
				<SvgIcons
					name={SvgNames.notification}
					height="24"
					width="24"
					color={color}
				/>
				<Text
					style={{
						fontWeight: '300',
						fontSize: 12,
						color: color
					}}>
					{title}
				</Text>
			</View>
		);
	}
}

const MyStatusBar = ({ backgroundColor, ...props }) => (
	<View style={[styles.statusBar, { backgroundColor }]}>
		<StatusBar backgroundColor={backgroundColor} {...props} />
	</View>
);

class Root extends Component {
	state = {
		loading: true,
		user: null,
		assetsLoaded: false
	};

	async componentWillMount() {
		this.Preload();
	}

	async Preload() {
		// await Promise.all([this.getAccess(), this.loadAssets()]);
		await Promise.all([this.getAccess(), this.loadAssets()]);
		this.setState({ loading: false });
		// await this.validate();
	}

	// load important assets here
	async loadAssets() {
		if (!window.assetsLoaded) {
			await Font.loadAsync({
				notoSansLight: notoSansLight,
				notoSansRegular: notoSansRegular,
				notoSansMedium: notoSansMedium,
				notoSansBold: notoSansBold,
				notoSansBlack: notoSansBlack
			});
		}
		return;
	}

	async getAccess() {
		const user = await AsyncStorage.getItem('access_token');
		if (window.fetchNotificationsCountTimer) {
			clearTimeout(window.fetchNotificationsCountTimer);
		}
		if (user) {
			// this.props.login();
			this.props.notificationsFetchUnreadCount();

			window.fetchNotificationsCountTimer = setTimeout(
				() => this.props.notificationsFetchUnreadCount(),
				FETCH_NOTIFICATION_UNREAD_INTERVAL
			);
		} else {
			this.props.logout();
		}
		return;
	}

	render() {
		const { darkMode } = this.props;
		return (
			<View style={{ flex: 1, backgroundColor: 'red' }}>
				<MyStatusBar
					backgroundColor={darkMode ? '#181818' : '#fff'}
					barStyle="light-content"
				/>
				{this.state.loading ? (
					<View
						style={{
							flex: 1,
							backgroundColor: darkMode ? '#181818' : '#fff'
						}}>
						<Loader />
					</View>
				) : (
					<Router
						getSceneStyle={() => ({
							backgroundColor: darkMode ? '#181818' : '#fff'
						})}>
						<Scene
							navigationBarStyle={{
								color: '#fff',
								backgroundColor: darkMode ? '#181818' : '#fff'
							}}
							headerTintColor={darkMode ? '#fff' : '#181818'}
							headerLayoutPreset="center"
							key="root"
							hideNavBar>
							<Scene
								animationEnabled={false}
								lazy
								key="Main"
								tabs={true}
								tabBarStyle={{
									backgroundColor: darkMode
										? '#181818'
										: '#fff'
								}}
								tabBarPosition={'bottom'}
								type="reset"
								showLabel={false}
								swipeEnabled={false}>
								<Scene
									icon={props => {
										return (
											<TabIcon
												active={props.focused}
												{...props}
												{...this.props}
											/>
										);
									}}
									key="HomeScreen"
									title="Home"
									iconName="home">
									<Scene
										renderRightButton={() => (
											<SearchStocksInput
												bg={
													darkMode
														? '#181818'
														: '#fff'
												}
												text={
													darkMode
														? '#fff'
														: '#181818'
												}
											/>
										)}
										key="Home"
										title="Home"
										component={HomeScreen}
										hideNavBar={false}
									/>
									<Scene
										key="DetailFeed"
										title="Detail"
										component={DetailFeed}
										hideNavBar={false}
									/>
								</Scene>
								<Scene
									icon={props => {
										return (
											<TabIcon
												active={props.focused}
												{...props}
												{...this.props}
											/>
										);
									}}
									key="Watchlist"
									title="Watchlist"
									iconName="watchlist">
									<Scene
										renderRightButton={
											<SearchStocksInput
												bg={
													darkMode
														? '#181818'
														: '#fff'
												}
												text={
													darkMode
														? '#fff'
														: '#181818'
												}
											/>
										}
										key="Watchlist"
										title="Watchlist"
										component={Watchlist}
										hideNavBar={false}
									/>
									<Scene
										key="WatchlistDetail"
										title="Detail"
										component={DetailFeed}
										hideNavBar={false}
									/>
								</Scene>
								<Scene
									icon={props => {
										return (
											<NotificationWithBadge
												active={props.focused}
												{...props}
												{...this.props}
											/>
										);
									}}
									key="NotificationsScreen"
									title="Notifications"
									iconName="notifications">
									<Scene
										key="Notifications"
										title="Notifications"
										component={NotificationsScreen}
										hideNavBar={false}
									/>
									<Scene
										key="NotificationsDetail"
										title="NotificationsDetail"
										component={DetailFeed}
										hideNavBar={false}
									/>
								</Scene>
								<Scene
									icon={props => {
										return (
											<TabIcon
												active={props.focused}
												{...props}
												{...this.props}
											/>
										);
									}}
									key="SettingsScreen"
									title="Settings"
									iconName="setting">
									<Scene
										key="Settings"
										title="Settings"
										component={SettingsScreen}
										hideNavBar={false}
									/>
								</Scene>
							</Scene>
							<Scene
								key="Login"
								title="Login"
								component={LoginScreen}
								hideNavBar={false}
							/>
							<Scene
								backButtonTintColor={'#fff'}
								key="Signup"
								title="Signup"
								component={SignupScreen}
								hideNavBar={false}
							/>
						</Scene>
					</Router>
				)}
			</View>
		);
	}
}

const mapDispatchToProps = {
	login,
	logout,
	notificationsFetchUnreadCount
};

const mapStateToProps = state => {
	return {
		darkMode: state.setting.darkMode,
		unread_count: getNotificationsUnreadCount(state)
	};
};

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);
export default compose(withConnect)(Root);

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const STATUSBAR_MARGIN = Platform.OS === 'ios' ? -20 : 0;

const styles = StyleSheet.create({
	statusBar: {
		marginTop: STATUSBAR_MARGIN,
		height: STATUSBAR_HEIGHT
	}
});

const Badge = styled.View`
	width: 20px;
	height: 20px;
	border-radius: 10px;
	position: absolute;
	right: 13px;
	z-index: 1000;
	top: -10px;
	align-items: center;
	justify-content: center;
	background-color: ${colors.purple};
`;

const BadgeText = styled.Text`
	font-size: 9px;
	color: ${colors.white};
`;
