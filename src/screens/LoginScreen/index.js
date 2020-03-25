import React, { Component } from 'react';
import {
	ScrollView,
	View,
	Text,
	TouchableWithoutFeedback,
	Alert, TouchableOpacity
} from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import { textStyles, colors, padding } from '../../styles/base';
import {
	inputStyles,
	buttonStyles,
	controlsStyles
} from '../../styles/controls';
import TouchableScale from 'react-native-touchable-scale';
import styles, { AuthComponents } from './styles';
import {
	getAuthErrors,
	getAuthPending,
	getAuthLogin
} from '../../redux/selectors/auth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
	loginRequest,
	clearAuthState
} from '../../screens/AuthFeed/actions.AuthFeed';
import { State } from '../../redux/actions/types';
import ErrorMessage from '../../components/Messages/ErrorMessage';
import ButtonComponent from '../../components/Controls/ButtonComponent/ButtonComponent';
import InputComponent from '../../components/Controls/InputComponent/InputComponent';
import ShadowComponent from '../../components/ShadowComponent/ShadowComponent';
import LogoComponent from '../../components/LogoComponent/LogoComponent';
import { Actions } from 'react-native-router-flux';
import { Row } from '../../components/UIComponents/MainComponents';
import { Svg, G, Path } from 'react-native-svg';

import SignComponent from '../../components/SignComponent/SignComponent';
export type UserLogin = { username: string, password: string };

type LoginProps = {
	pending: boolean,
	loginRequest: (data: UserLogin) => void,
	errors: object
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

class LoginScreen extends Component<LoginProps> {
	static propTypes = {
		errors: PropTypes.object,
		pending: PropTypes.bool,
		loginRequest: PropTypes.func
	};

	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;
		return {
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
		};
	};

	state: UserLogin = {
		username: '',
		password: ''
	};

	componentWillReceiveProps = props => {
		if (props.loggin && !this.props.loggin) {
			Actions.Main();
		}
	};

	componentDidMount() {
		const headerTintColor = this.props.mode ? '#fff' : '#000';
		this.props.navigation.setParams({ headerTintColor });
	}

	handleChange = name => text => {
		this.setState({ [name]: text });
	};

	signup = () => {
		this.props.loginRequest({ ...this.state });
	};

	shouldComponentUpdate = (props: LoginProps) =>
		props.pending !== this.props.pending;

	navigateToSignup = () => {
		this.props.clearAuthState();
		Actions.Signup();
	};

	componentWillUnmount = () => {
		this.props.clearAuthState();
	};

	Alert = () => {
		Alert.alert(
			'',
			'Please use our website snaptrade.us to use this feature. We are still working on to implement this in the app'
		);
	};

	render() {
		return (
			<ScrollView
				keyboardDismissMode={'interactive'}
				style={styles.wrapper}
				contentContainerStyle={styles.wrapperContent}>
				<AuthComponents.AuthWrapper>
					<AuthComponents.LogoWrapper>
						<LogoComponent />
					</AuthComponents.LogoWrapper>
					<AuthComponents.AuthWrapper>
						<View>
							<ShadowComponent
								width={controlsStyles.input.width}
								border={20}
								color={colors.dark}
								opacity={0.07}
								radius={6}
								y={10}
								height={48}
								style={{ marginBottom: 20 }}>
								<InputComponent
									onChangeText={this.handleChange('username')}
									placeholder={'Username or Email'}
								/>
							</ShadowComponent>

							<ShadowComponent
								width={controlsStyles.input.width}
								border={20}
								y={10}
								height={48}>
								<InputComponent
									secureTextEntry
									onChangeText={this.handleChange('password')}
									placeholder={'Password'}
								/>
							</ShadowComponent>
							<ErrorMessage message={this.props.error} />

							<ButtonComponent
								loading={this.props.pending}
								title={'LOG IN'}
								onPress={this.signup}
							/>
							<TouchableWithoutFeedback
								onPress={() => this.Alert()}>
								<AuthComponents.AuthLinkText
									style={{ marginTop: 17 }}>
									Forgot username or password?
								</AuthComponents.AuthLinkText>
							</TouchableWithoutFeedback>
						</View>
					</AuthComponents.AuthWrapper>
				</AuthComponents.AuthWrapper>
			</ScrollView>
		);
	}
}

const mapStateToProps = (state: State) => ({
	error: getAuthErrors(state),
	pending: getAuthPending(state),
	loggin: getAuthLogin(state),
	mode: state.setting.darkMode
});

const mapDispatchToProps = {
	loginRequest,
	clearAuthState
};

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

export default compose(withConnect)(LoginScreen);
