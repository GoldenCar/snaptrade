import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { TickerChartStyled } from './styles';

export default class ChartLoader extends Component {
	static defaultProps = {
		loading: false
	};
	render() {
		return (
			<View
				style={[
					StyleSheet.absoluteFill,
					TickerChartStyled.loader,
					{ opacity: this.props.loading ? 1 : 0 }
				]}>
				<ActivityIndicator />
			</View>
		);
	}
}
