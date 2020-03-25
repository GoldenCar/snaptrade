import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Home from './home';
import Setting from './setting';
import Watchlist from './watchlist';
import Notification from './notification';

export const SvgNames = {
	home: 'home',
	setting: 'setting',
	watchlist: 'watchlist',
	notification: 'notification'
};

export default class extends Component {
	static propTypes = {
		name: PropTypes.oneOf(['home', 'watchlist', 'setting', 'notification'])
			.isRequired
	};

	static defaultProps = {
		height: 25,
		width: 25,
		color: 'black',
		style: {}
	};

	render() {
		switch (this.props.name) {
			case 'home':
				return <Home {...this.props} />;
			case 'watchlist':
				return <Watchlist {...this.props} />;
			case 'setting':
				return <Setting {...this.props} />;
			case 'notification':
				return <Notification {...this.props} />;
			default:
				return null;
		}
	}
}
