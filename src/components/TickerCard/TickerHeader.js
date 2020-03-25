import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	colors,
	fonts,
	padding,
	icons,
	backgroundColor
} from '../../styles/base';
import { Icon } from 'react-native-elements';
import {
	getWatchlistSortingKey,
	getWatchlistSortingDirection
} from '../../redux/selectors/watchlist';
import TouchableScale from 'react-native-touchable-scale';
import { setWatchlistSortingKey } from '../../redux/actions/watchlist';
import { State } from '../../redux/actions/types';

type TickerHeaderProps = {
	sortingKey: string,
	sortingDirection: number,
	setWatchlistSortingKey: sortingKey => void
};

class TickerHeader extends Component<TickerHeaderProps> {
	getColor = (active, direction) => {
		if (active && direction === this.props.sortingDirection) {
			return colors.green;
		}
		return colors.gray;
	};

	renderArrows = type => {
		const active = type === this.props.sortingKey;
		return (
			<View style={styles.iconWrapper}>
				<Icon
					name={'caret-up'}
					type={'font-awesome'}
					size={icons.small}
					color={this.getColor(active, 1)}
				/>
				<Icon
					name={'caret-down'}
					type={'font-awesome'}
					size={icons.small}
					color={this.getColor(active, -1)}
				/>
			</View>
		);
	};

	setWatchlistSortingKey = key => event => {
		this.props.setWatchlistSortingKey(key);
	};

	render() {
		return (
			<View style={[styles.row, styles.wrapper]}>
				<TouchableScale
					style={styles.row}
					onPress={this.setWatchlistSortingKey('ticker')}>
					<Text style={styles.label}>LIST | A-Z</Text>
					{this.renderArrows('ticker')}
				</TouchableScale>
				<TouchableScale
					style={styles.row}
					onPress={this.setWatchlistSortingKey(
						'price_pct_increase_over_last_day'
					)}>
					<Text style={styles.label}>PRICE</Text>
					{this.renderArrows('price_pct_increase_over_last_day')}
				</TouchableScale>
			</View>
		);
	}
}

const mapStateToProps = (state: State) => ({
	sortingKey: getWatchlistSortingKey(state),
	sortingDirection: getWatchlistSortingDirection(state)
});

const mapDispatchToProps = {
	setWatchlistSortingKey: setWatchlistSortingKey
};

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	wrapper: {
		width: '100%',
		paddingVertical: 10,
		borderStyle: 'dashed',
		borderBottomWidth: 2,
		borderColor: colors.gray,
		paddingHorizontal: padding.screen,
		backgroundColor: backgroundColor.primary
	},
	label: {
		color: colors.gray,
		fontSize: fonts.xsmall_title
	},
	icon: {},
	iconWrapper: {
		marginLeft: padding.medium
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TickerHeader);
