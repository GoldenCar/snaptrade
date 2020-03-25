import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import AuthPlaceholder from '../../screens/AuthPlaceholder/AuthPlaceholder';
import { getUserLoggin } from '../../redux/selectors/user';

type TPrivateRoute = {
	isLogin: boolean
};
class PrivateRoute extends Component<TPrivateRoute> {
	static propTypes = {
		isLogin: PropTypes.bool
	};

	// static navigationOptions = ({ navigation, screenProps }) => {
    //     console.log({screenProps})
    //     console.log(navigation.getParam())
    //     console.log(navigation)
	// 	return {
	// 		title: navigation.getParam('otherParam', 'A Nested Details Screen')
	// 	};
	// };

	render() {
		if (!this.props.isLogin) {
			return <AuthPlaceholder />;
		}
		return this.props.children;
	}
}

const mapStateToProps = state => ({
	isLogin: getUserLoggin(state)
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(PrivateRoute);
