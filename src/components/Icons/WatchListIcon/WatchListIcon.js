import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { fetchWatchList } from '../../../redux/actions/watchlist';

export class WatchListIcon extends Component {
	static propTypes = {
		prop: PropTypes
    };
    
    onIconPress = () => {
        this.props.fetchList()
    }

	render() {
		return (
			<TouchableWithoutFeedback onPress={this.onIconPress}>
				<Icon
					name="eye"
					size={24}
					type={'font-awesome'}
					color={this.props.tintColor}
				/>
			</TouchableWithoutFeedback>
		);
	}
}

const mapDispatchToProps = {
    fetchList: fetchWatchList
};

export default connect(
	undefined,
	mapDispatchToProps
)(WatchListIcon);
