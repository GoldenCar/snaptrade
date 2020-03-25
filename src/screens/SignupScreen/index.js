import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import { textStyles, colors, padding } from '../../styles/base';
import {
	inputStyles,
	buttonStyles,
	controlsStyles
} from '../../styles/controls';
import styles from './styles';
import { getAuthErrors, getAuthPending } from '../../redux/selectors/auth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
	signupRequest,
	clearAuthState
} from '../../screens/AuthFeed/actions.AuthFeed';
import ErrorMessage from '../../components/Messages/ErrorMessage';
import InputComponent from '../../components/Controls/InputComponent/InputComponent';
import ShadowComponent from '../../components/ShadowComponent/ShadowComponent';
import ButtonComponent from '../../components/Controls/ButtonComponent/ButtonComponent';
import { AuthComponents } from '../LoginScreen/styles';
import LogoComponent from '../../components/LogoComponent/LogoComponent';
import { Row, Wrapper } from '../../components/UIComponents/MainComponents';
import { dimension } from '../../styles/themes';
import { withNavigation } from 'react-navigation';
import { Actions } from 'react-native-router-flux';
import { Svg, G, Path } from 'react-native-svg';

export type UserSignup = {
	email: string,
	nickname: string,
	password: string,
	password_confirmation: string,
	referrer: string
};

type SignupProps = {
	pending: boolean,
	signupRequest: (data: UserSignup) => void,
	errors: string
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

class SignupScreen extends Component<SignupProps> {

	static propTypes = {
		errors: PropTypes.object,
		pending: PropTypes.bool,
		signupRequest: PropTypes.func
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

	state: UserSignup = {
		email: '',
		nickname: '',
		referrer: 'SnapTradeMobile',
		password: '',
		password_confirmation: ''
	};

	handleChange = name => text => {
		this.setState({ [name]: text });
	};

	signup = () => {
		this.props.signupRequest({ ...this.state });
	};
	componentDidMount() {
		const headerTintColor = this.props.mode ? '#fff' : '#000';
		this.props.navigation.setParams({ headerTintColor });
	}

	shouldComponentUpdate = (props: UserSignup) =>
		props.pending !== this.props.pending;

	navigateToLogin = () => {
		this.props.clearAuthState();
		Actions.Login()
	};

	componentWillUnmount = () => {
		this.props.clearAuthState();
	};

	render() {
		return (
			<ScrollView keyboardDismissMode={'interactive'}>
				<Wrapper
					style={{
						height: dimension.height * 1.3,
						alignItems: 'center'
					}}>
					<AuthComponents.LogoWrapper>
						<LogoComponent />
					</AuthComponents.LogoWrapper>
					<View style={styles.inputWrapper}>
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
								placeholder="Email"
								onChangeText={this.handleChange('email')}
							/>
						</ShadowComponent>
						{/*<Input*/}
						{/*	containerStyle={inputStyles.main}*/}
						{/*	inputContainerStyle={inputStyles.container}*/}
						{/*	leftIconContainerStyle={inputStyles.iconContainer}*/}
						{/*	placeholder="Email"*/}
						{/*	onChangeText={this.handleChange('email')}*/}
						{/*	// errorMessage={this.props.errors['username']}*/}
						{/*	leftIcon={*/}
						{/*		<Icon*/}
						{/*			name="envelope"*/}
						{/*			type={'font-awesome'}*/}
						{/*			size={24}*/}
						{/*			color={colors.gray}*/}
						{/*		/>*/}
						{/*	}*/}
						{/*/>*/}
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
								placeholder="Nickname"
								onChangeText={this.handleChange('nickname')}
							/>
						</ShadowComponent>
						{/*<Input*/}
						{/*	containerStyle={inputStyles.main}*/}
						{/*	inputContainerStyle={inputStyles.container}*/}
						{/*	leftIconContainerStyle={inputStyles.iconContainer}*/}
						{/*	placeholder="Nickname"*/}
						{/*	onChangeText={this.handleChange('nickname')}*/}
						{/*	// errorMessage={this.props.errors['username']}*/}
						{/*	leftIcon={*/}
						{/*		<Icon*/}
						{/*			name="user"*/}
						{/*			type={'font-awesome'}*/}
						{/*			size={24}*/}
						{/*			color={colors.gray}*/}
						{/*		/>*/}
						{/*	}*/}
						{/*/>*/}
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
								onChangeText={this.handleChange('password')}
								placeholder="Password"
							/>
						</ShadowComponent>
						{/*<Input*/}
						{/*	containerStyle={inputStyles.main}*/}
						{/*	inputContainerStyle={inputStyles.container}*/}
						{/*	leftIconContainerStyle={inputStyles.iconContainer}*/}
						{/*	secureTextEntry={true}*/}
						{/*	onChangeText={this.handleChange('password')}*/}
						{/*	placeholder="Password"*/}
						{/*	// errorMessage={this.props.errors['password']}*/}
						{/*	leftIcon={*/}
						{/*		<Icon*/}
						{/*			name="lock"*/}
						{/*			type={'font-awesome'}*/}
						{/*			size={24}*/}
						{/*			color={colors.gray}*/}
						{/*		/>*/}
						{/*	}*/}
						{/*/>*/}
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
								onChangeText={this.handleChange(
									'password_confirmation'
								)}
								placeholder="Password confirmation"
							/>
						</ShadowComponent>
						{/*<Input*/}
						{/*	containerStyle={inputStyles.main}*/}
						{/*	inputContainerStyle={inputStyles.container}*/}
						{/*	secureTextEntry={true}*/}
						{/*	leftIconContainerStyle={inputStyles.iconContainer}*/}
						{/*	onChangeText={this.handleChange(*/}
						{/*		'password_confirmation'*/}
						{/*	)}*/}
						{/*	placeholder="Password confirmation"*/}
						{/*	// errorMessage={*/}
						{/*	// 	this.props.errors['password_confirmation']*/}
						{/*	// }*/}
						{/*	leftIcon={*/}
						{/*		<Icon*/}
						{/*			name="lock"*/}
						{/*			type={'font-awesome'}*/}
						{/*			size={24}*/}
						{/*			color={colors.gray}*/}
						{/*		/>*/}
						{/*	}*/}
						{/*/>*/}
					</View>

					<ErrorMessage message={this.props.error} />
					<ButtonComponent
						title={'SIGN UP'}
						loading={this.props.pending}
						onPress={this.signup}
						containerStyle={{ width: controlsStyles.input.width }}
					/>
					<ButtonComponent
						title={'Login'}
						onPress={this.navigateToLogin}
						containerStyle={{ width: controlsStyles.input.width }}
					/>
					{/*<Button*/}
					{/*	containerStyle={buttonStyles.main}*/}
					{/*	buttonStyle={buttonStyles.conatiner}*/}
					{/*	loading={this.props.pending}*/}
					{/*	title={'SignUp'}*/}
					{/*	onPress={this.signup}*/}
					{/*/>*/}
					{/*<Button*/}
					{/*	containerStyle={buttonStyles.main}*/}
					{/*	buttonStyle={buttonStyles.conatiner}*/}
					{/*	title={'Login As'}*/}
					{/*	onPress={this.navigateToLogin}*/}
					{/*/>*/}
				</Wrapper>
			</ScrollView>
		);
	}
}

const mapStateToProps = state => ({
	error: getAuthErrors(state),
	pending: getAuthPending(state),
	mode: state.setting.darkMode
});

const mapDispatchToProps = {
	signupRequest,
	clearAuthState
};

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

export default compose(
	withConnect
)(SignupScreen);
