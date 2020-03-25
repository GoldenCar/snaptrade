import React, { Component } from 'react';
import SignComponent from '../../components/SignComponent/SignComponent.js';

import { connect } from 'react-redux';
import { Row } from '../UIComponents/MainComponents.js';
import { padding } from '../../styles/base.js';

class SignContainer extends Component {
	render() {
		return (
			<Row style={{ marginRight: padding.large }}>
				<SignComponent
					ticker={this.props.ticker}
					signed={this.props.isInWatchList}
				/>
			</Row>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		isInWatchList: state.ticker.isInWatchList
	};
};

const mapDispatchToProps = {};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignContainer);
