import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import DiscoverySmallComponentStyles from './styles';
import { mainStyles } from '../../styles/controls';
import { getColorFromValue } from '../../utils';
import { DiscoveryStyles } from '../DiscoveryComponent/styles';
import DiscoveryContent from '../DiscoveryContent/DiscoveryContent';
import { imageWidth } from '../DiscoverySmallComponent/styles';

export class DiscoverySmallImageComponent extends Component {
	static defaultProps = {
		items: [],
		item_type: ''
	};

	renderImage = discovery => {
		return (
			<View>
				<Image
					source={{
						uri: `https://s3.amazonaws.com/img-snaptrade-us${
							discovery.image_file_link
							}`
					}}
					style={DiscoverySmallComponentStyles.image}
				/>
			</View>
		);
	};

	renderContent = discovery => (
		<View style={{ flex: 1 }}>
			<View style={mainStyles.row}>
				<Text
					style={[
						DiscoverySmallComponentStyles.smallText,
						DiscoverySmallComponentStyles.ticker
					]}>
					{discovery.ticker}
				</Text>
				<Text
					style={[
						DiscoverySmallComponentStyles.smallText,
						DiscoverySmallComponentStyles.price,
						{
							color: getColorFromValue(
								discovery.price_pct_increase_over_last_day
							)
						}
					]}>
					{discovery.price_pct_increase_over_last_day}%
				</Text>
				<Text
					style={[
						DiscoverySmallComponentStyles.smallText,
						DiscoverySmallComponentStyles.time
					]}>
					| {discovery.pub_time_days_ago_mod}
				</Text>
			</View>
			<View>
				<Text
					numberOfLines={2}
					style={DiscoverySmallComponentStyles.title}>
					{discovery.title}
				</Text>
			</View>
			<View>
				<Text
					numberOfLines={4}
					style={DiscoverySmallComponentStyles.smallText}>
					{discovery.news_clip}
				</Text>
			</View>
		</View>
	);

	renderDiscovery = discovery => {
		if (this.props.item_type === 'news_small_image_left') {
			return (
				<TouchableOpacity
					onPress={() => this.props.onDiscoveryPress(discovery)}>
					<View
						style={[
							// mainStyles.row,
							DiscoverySmallComponentStyles.wrapper
						]}>
						<View
							style={
								DiscoverySmallComponentStyles.leftImageWrapper
							}>
							{this.renderImage(discovery)}
						</View>
						<DiscoveryContent discovery={discovery} />
					</View>
					<View>
						{discovery.story_details.map(story => (
							<Text style={DiscoveryStyles.text}>
								{story.category}: {story.label_details}
							</Text>
						))}
					</View>
				</TouchableOpacity>
			);
		}
		return (
			<View
				style={[
					// mainStyles.row,
					DiscoverySmallComponentStyles.wrapper, { paddingRight: imageWidth + 10 }
				]}>
				<DiscoveryContent discovery={discovery} />
				<View style={[DiscoverySmallComponentStyles.rightImageWrapper]}>
					{this.renderImage(discovery)}
				</View>
			</View>
		);
	};

	render() {
		return <View>{this.props.items.map(this.renderDiscovery)}</View>;
	}
}

export default DiscoverySmallImageComponent;
