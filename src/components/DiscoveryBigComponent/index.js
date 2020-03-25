import React, { Component } from 'react';
import {  View,  TouchableOpacity } from 'react-native';
import DiscoveryBigComponentStyles from './styles';
import BigNewsComponent from '../BigNewsComponent/BigNewsComponent';

export class DiscoveryBigComponent extends Component {
	static defaultProps = {
		items: []
	};

	renderDiscovery = discovery => (
		<TouchableOpacity
			key={discovery.ticker}
			onPress={() => this.props.onDiscoveryPress(discovery)}>
			<BigNewsComponent
				discovery={discovery}
				ticker={discovery.ticker}
				chart_url={discovery.chart_url}
				image_file_link={discovery.image_file_link_2}
				price_pct_increase_over_last_day={
					discovery.price_pct_increase_over_last_day
				}
				pub_time_days_ago_mod={discovery.pub_time_days_ago_mod}
				title={discovery.title}
				news_clip={discovery.news_clip}
			/>
		</TouchableOpacity>
	);
	render() {
		return (
			<View style={DiscoveryBigComponentStyles.wrapper}>
				{this.props.items.map(this.renderDiscovery)}
			</View>
		);
	}
}

export default DiscoveryBigComponent;
