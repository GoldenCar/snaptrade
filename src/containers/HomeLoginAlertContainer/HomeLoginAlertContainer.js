import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import styled from 'styled-components';
import removeIcon from '../../../assets/icons/remove.png';
import { connect } from 'react-redux';
import { Row } from '../../components/UIComponents/MainComponents';
import { padding, colors } from '../../styles/base';
import { TextBold, Text } from '../../components/UIComponents/TextComponents';
import { getUserLoggin } from '../../redux/selectors/user';
import { IconSmall } from '../../components/UIComponents/IconsComponents';
import { Actions } from 'react-native-router-flux';

class HomeLoginAlertContainer extends Component {
	state = {
		open: true
	};

	onLoginPress = () => {
		Actions.Login({BackTitle:'Home'})
	};

	onSignUpPress = () => {
		Actions.Signup({BackTitle:'Home'})
	};

	close = () => {
		this.setState({ open: false });
	};

	static getDerivedStateFromProps = (props, state) => {
		if (!state.open && props.isLogin) {
			return {
				open: true
			};
		}
		return state;
	};

	render() {
		if (this.props.isLogin || !this.state.open) return null;
		return (
			<Wrapper>
				<IconWrapper />
				<Row>
					<TouchableOpacity
						delayPressIn={0}
						onPress={this.onLoginPress}>
						<TextBold color={colors.white}>Log in </TextBold>
					</TouchableOpacity>
					<Text color={colors.white}>to see your alerts or</Text>
					<TouchableOpacity
						delayPressIn={0}
						onPress={this.onSignUpPress}>
						<TextBold color={colors.white}> Sign Up</TextBold>
					</TouchableOpacity>
				</Row>
				<TouchableOpacity delayPressIn={0} onPress={this.close}>
					<IconWrapper>
						<IconSmall source={removeIcon} />
					</IconWrapper>
				</TouchableOpacity>
			</Wrapper>
		);
	}
}

const mapStateToProps = state => ({
	isLogin: getUserLoggin(state)
});

const mapDispatchToProps = {};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeLoginAlertContainer);

const Wrapper = styled(Row)`
	padding: ${padding.chubby}px;
	background-color: #6979f8;
	justify-content: space-between;
	align-items: center;
`;

const IconWrapper = styled.View`
	width: 40px;
`;
