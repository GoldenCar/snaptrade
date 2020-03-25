import React, { Component } from 'react';
import styled from 'styled-components';
import { compose } from 'redux';
import { withNavigation } from 'react-navigation';
import { Wrapper, Row } from '../../components/UIComponents/MainComponents';
import { Divider } from '../../components/UIComponents/ControlComponents';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { padding } from '../../styles/base';
import { Text } from '../../components/UIComponents/TextComponents';
import { Actions } from 'react-native-router-flux';

class AuthPlaceholder extends Component {
	navigateToLogin = () => {
		Actions.Login({ BackTitle: 'Back' });
	};

	navigateToSignup = () => {
		Actions.Signup({ BackTitle: 'Back' });
	};

	render() {
		return (
			<LinksWrapper>
				<Divider />
				<LinkRow>
					<TouchableOpacity onPress={this.navigateToLogin}>
						<LinkText>Login</LinkText>
					</TouchableOpacity>
				</LinkRow>
				<Divider />
				<LinkRow>
					<TouchableOpacity onPress={this.navigateToSignup}>
						<LinkText>Sign up</LinkText>
					</TouchableOpacity>
				</LinkRow>
			</LinksWrapper>
		);
	}
}

const LinksWrapper = styled(Wrapper)`
	padding-left: ${padding.xlarge}px;
`;
const LinkRow = styled(Row)`
	padding-right: ${padding.xlarge}px;
	justify-content: space-between;
`;

const LinkText = styled(Text)`
	font-size: 17px;
	line-height: 20px;
	padding: ${padding.xlarge}px 0;
`;

export default compose(AuthPlaceholder);
