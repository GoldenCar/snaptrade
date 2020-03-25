import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getUserLoggin } from '../../redux/selectors/user';
import StyledText from '../../components/StyledText';
import { textStyles } from '../../styles/base';

class LastNotificationsLabelContainer extends Component {
	render() {
		return (
			<StyledText style={textStyles.title}>
				{this.props.isLogin
					? 'Important events in your watchlist'
					: 'Login to see your alerts'}
			</StyledText>
		);
	}
}
const mapStateToProps = state => ({
	isLogin: getUserLoggin(state)
});
const withConnect = connect(mapStateToProps);
export default compose(withConnect)(LastNotificationsLabelContainer);
