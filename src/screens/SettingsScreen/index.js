import React, { Component } from 'react';
import { Linking, Modal, Alert, ScrollView } from 'react-native';
import { Constants } from 'expo';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import {
	logout,
	signupRequest,
	clearAuthState,
	loginRequest
} from '../AuthFeed/actions.AuthFeed';
import { Switch } from '../../components/Switch';
import { withNavigation } from 'react-navigation';
import { clearToken } from '../../utils';
import { ChangeDarkMode } from '../../redux/actions/setting';
import SwitchToggle from 'react-native-switch-toggle';
import { Row } from '../../components/UIComponents/MainComponents';
import { Divider } from '../../components/UIComponents/ControlComponents';
import { padding, colors } from '../../styles/base';
import { Text, TextBold } from '../../components/UIComponents/TextComponents';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getUserDarkMode, getUserLoggin } from '../../redux/selectors/user';
import ButtonComponent from '../../components/Controls/ButtonComponent/ButtonComponent';
import ShadowComponent from '../../components/ShadowComponent/ShadowComponent';
import api from '../../api/api';
import {
	fetchTopPricesFailed,
	fetchTopPricesPending,
	fetchTopPricesSuccess
} from '../../redux/actions/discovery';

import store from '../../../src/configureStore';
import { Actions } from 'react-native-router-flux';

type TSettingsScreen = {
	logout: () => void
};

export class SettingsScreen extends Component<TSettingsScreen> {
	static propTypes = {
		logout: PropTypes.func
	};

	constructor(props) {
		super(props);
		this.state = {
			val: false,
			theme: 'light',
			modal: false
		};
	}

	closeModal = () => {
		this.setState({ modal: false });
	};

	openModal = () => {
		this.setState({ modal: true });
	};

	logout = async () => {
		await clearToken();
		await this.props.logout();
		Actions.Main();
	};

	openLink = link => () => {
		Linking.openURL(link);
	};

	navigateToLogin = () => {
		this.props.clearAuthState();
		Actions.Login({ BackTitle: 'Settings' });
	};

	navigateToSignup = () => {
		this.props.clearAuthState();
		Actions.Signup({ BackTitle: 'Settings' });
	};

	toggleTheme = () => {
		this.setState(state => ({
			theme: state.theme === 'light' ? 'dark' : 'light'
		}));
	};

	openTwitter = async () => {
		const canOpen = await Linking.canOpenURL('twitter://timeline');
		if (canOpen) {
			Linking.openURL('twitter://timeline');
		} else {
			Linking.openURL('https://twitter.com/SnapTrade_US');
		}
	};

	darkMode = () => {
		store.dispatch({
			type: 'darkMode',
			payload: !this.props.mode
		});
	};

	render() {
		if (!this.props.isLogin) {
			return (
				<LinksWrapper>
					<Divider />
					<LinkRow>
						<TouchableOpacity
							onPress={this.openLink(
								'https://snaptrade.us/privacy-statement'
							)}>
							<LinkText>Privacy Policy</LinkText>
						</TouchableOpacity>
					</LinkRow>
					<Divider />
					<LinkRow>
						<TouchableOpacity
							onPress={this.openLink(
								'https://snaptrade.us/terms-of-use'
							)}>
							<LinkText>Terms of Service</LinkText>
						</TouchableOpacity>
					</LinkRow>

					<Divider />
					<LinkRow>
						<TouchableOpacity
							onPress={() =>
								Alert.alert(
									'Forgot user password',
									'Please use our website snaptrade.us for this. We hope to implement this feature soon in our app',
									[
										{
											text: 'Cancel',
											onPress: () =>
												console.log('Cancel Pressed'),
											style: 'cancel'
										},
										{
											text: 'Open website',
											onPress: () =>
												Linking.openURL(
													'https://snaptrade.us'
												)
										}
									],
									{ cancelable: true }
								)
							}>
							<LinkText>Forgot user password</LinkText>
						</TouchableOpacity>
					</LinkRow>

					<Divider />
					<LinkRow>
						<TouchableOpacity onPress={this.navigateToLogin}>
							<LinkText color={colors.red}>Sign in</LinkText>
						</TouchableOpacity>
					</LinkRow>

					<Divider />
					<LinkRow>
						<TouchableOpacity onPress={this.navigateToSignup}>
							<LinkText color={colors.red}>Sign up</LinkText>
						</TouchableOpacity>
					</LinkRow>

					<Divider />

					<LinkRow>
						<LinkText>
							app version ({Constants.manifest.version})
						</LinkText>
					</LinkRow>

					<Divider />
					<LinkRow>
						<TouchableOpacity onPress={this.openTwitter}>
							<LinkText>Twitter</LinkText>
						</TouchableOpacity>
					</LinkRow>
					<Divider />
					<LinkRow>
						<LinkText>Appearance</LinkText>
						<ShadowComponent
							width={65}
							border={9}
							color={colors.grey}
							opacity={0.1}
							radius={9}
							y={2}
							height={30}>
							<Switch
								activeText={'Light'}
								inActiveText={'Dark'}
								activeTextStyle={{ color: '#fff' }}
								inactiveTextStyle={{ color: '#000' }}
								circleActiveColor={'rgb(105, 121, 248)'}
								circleInActiveColor={'rgb(105, 121, 248)'}
								backgroundActive={'rgba(255, 255, 255, 0.1)'}
								backgroundInactive={'#ffffff'}
								changeValueImmediately={true}
								onValueChange={() => this.darkMode()}
								value={this.props.mode}
							/>
						</ShadowComponent>
					</LinkRow>
				</LinksWrapper>
			);
		}
		return (
			<LinksWrapper>
				<Divider />
				<LinkRow>
					<TouchableOpacity
						onPress={this.openLink(
							'https://snaptrade.us/privacy-statement'
						)}>
						<LinkText>Privacy Policy</LinkText>
					</TouchableOpacity>
				</LinkRow>
				<Divider />
				<LinkRow>
					<TouchableOpacity
						onPress={this.openLink(
							'https://snaptrade.us/terms-of-use'
						)}>
						<LinkText>Terms of Service</LinkText>
					</TouchableOpacity>
				</LinkRow>
				<Divider />
				<LinkRow>
					<TouchableOpacity
						onPress={this.openLink('https://snaptrade.us/aboutus')}>
						<LinkText>About</LinkText>
					</TouchableOpacity>
				</LinkRow>
				<Divider />
				<LinkRow>
					<TouchableOpacity onPress={this.logout}>
						<LinkText color={colors.red}>Sign out</LinkText>
					</TouchableOpacity>
				</LinkRow>
				<Divider />

				<LinkRow>
					<LinkText>
						app version ({Constants.manifest.version})
					</LinkText>
				</LinkRow>
				<Divider />
				<LinkRow>
					<LinkText>Appearance</LinkText>
					<ShadowComponent
						width={65}
						border={9}
						color={colors.grey}
						opacity={0.1}
						radius={9}
						y={2}
						height={30}>
						<Switch
							activeText={'Light'}
							inActiveText={'Dark'}
							activeTextStyle={{ color: '#fff' }}
							inactiveTextStyle={{ color: '#000' }}
							circleActiveColor={'rgb(105, 121, 248)'}
							circleInActiveColor={'rgb(105, 121, 248)'}
							backgroundActive={'rgba(255, 255, 255, 0.1)'}
							backgroundInactive={'#ffffff'}
							changeValueImmediately={true}
							onValueChange={() => this.darkMode()}
							value={this.props.mode}
						/>
					</ShadowComponent>
				</LinkRow>
				<Divider />
				<TouchableOpacity>
					<TouchableOpacity onPress={this.openTwitter}>
						<LinkText>Twitter</LinkText>
					</TouchableOpacity>
				</TouchableOpacity>
			</LinksWrapper>
		);
	}
}
const Wrapper = styled.ScrollView`
	flex: 1;
	background-color: ${props => props.theme.colors.background};
`;

const LinksWrapper = styled(Wrapper)`
	background-color: ${props => props.theme.colors.background};
	padding-left: ${padding.xlarge}px;
`;

const LinkRow = styled(Row)`
	align-items: center;
	padding-right: ${padding.xlarge}px;
	justify-content: space-between;
`;

const ModalContent = styled.View`
	padding: ${padding.xlarge}px;
`;

const LinkText = styled(Text)`
	font-size: 17px;
	line-height: 20px;
	padding: ${padding.xlarge}px 0;
`;

const mapDispatchToProps = {
	logout,
	clearAuthState: clearAuthState
};

const mapStateToProps = state => ({
	isLogin: getUserLoggin(state),
	mode: state.setting.darkMode
});

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

export default compose(withConnect)(SettingsScreen);
