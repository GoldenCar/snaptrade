import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import DiscoverySmallComponentStyles from '../DiscoverySmallComponent/styles';
import { getColorFromValue, getColorFromFormattedValue } from '../../utils';
import { DiscoveryEarningStyles } from './styles';
import { textStyles } from '../../styles/base';
import EarningNewsComponent from '../EarningNewsComponent/EarningNewsComponent';

export class DiscoveryUpcomingEarning extends Component {
	static defaultProps = {
		items: [],
		item_type: '',
		onDiscoveryPress: () => console.log('Pressed by')
	};

	renderDiscovery = discovery => {

		return (
			<EarningNewsComponent
				ticker={discovery.ticker}
				company_name={discovery.company_name}
				days_from_today={discovery.days_from_today}
				earning_date_formatted={discovery.earning_date_formatted}
				earning_time={discovery.earning_time}
			/>
			// <TouchableOpacity
			// 	key={discovery.ticker}
			// 	onPress={() => this.props.onDiscoveryPress(discovery)}>
			// 	<View
			// 		style={{
			// 			flexDirection: 'row',
			// 			justifyContent: 'space-between',
			// 			width: '100%'
			// 		}}>
			// 		<Text
			// 			style={[
			// 				textStyles.subtitle,
			// 				DiscoverySmallComponentStyles.ticker,
			// 				DiscoveryEarningStyles.text
			// 			]}>
			// 			{discovery.ticker}
			// 		</Text>
			// 		<Text
			// 			style={[textStyles.body, DiscoveryEarningStyles.text]}>
			// 			{discovery.earning_date_formatted}
			// 		</Text>
			// 		<Text
			// 			style={[
			// 				textStyles.body,
			// 				{
			// 					color: getColorFromValue(
			// 						discovery.eps_surprise
			// 					),
			// 					textAlign: 'center'
			// 				},
			// 				DiscoveryEarningStyles.text
			// 			]}>
			// 			{discovery.eps_surprise}%
			// 		</Text>
			// 		<Text
			// 			style={[
			// 				textStyles.body,
			// 				DiscoveryEarningStyles.text,
			// 				{
			// 					color: getColorFromFormattedValue(
			// 						discovery['Price chg since last earnings']
			// 					),
			// 					textAlign: 'right'
			// 				}
			// 			]}>
			// 			{discovery['Price chg since last earnings']}
			// 		</Text>
			// 	</View>
			// </TouchableOpacity>
		);
	};

	render() {
		return (
			<View>
				<Text style={textStyles.title}>Upcoming Earning</Text>
				{this.props.items.map(this.renderDiscovery)}
			</View>
		);
	}
}

export default DiscoveryUpcomingEarning;
