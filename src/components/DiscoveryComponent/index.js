import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { DiscoveryStoryDetail, DiscoveryStyles } from './styles';
import StyledText from '../StyledText';
import { mainStyles } from '../../styles/controls';
import DetailChartComponent from '../DetailChart/DetailChartComponent';
import {
	TouchableOpacity,
	TouchableWithoutFeedback
} from 'react-native-gesture-handler';
import { colors } from '../../styles/base';

type TDetail = {
	id: number,
	category: string,
	label_name: string,
	label_details: string
};

type TDetailChartComponent = {
	ticker: string,
	close: number,
	close_formatted: string,
	id: number,
	short_desc: string,
	story_details: TDetail[],
	price_pct_increase_over_last_day: number,

	onNotificatioonDiscoveryPressnPress: () => void
};

export class SmallDiscoveryComponent extends React.PureComponent<TDetailChartComponent> {
	onDiscoveryPress = () => {
		const { onDiscoveryPress, ...props } = this.props;
		this.props.onDiscoveryPress(props);
	};

	getColor = num => (num >= 0 ? colors.green : colors.red);

	render() {
		return (
			<TouchableWithoutFeedback
				key={this.props.id}
				onPress={this.onDiscoveryPress}
				style={DiscoveryStoryDetail.wrapper}>
				<Image
					resizeMode={'cover'}
					style={DiscoveryStoryDetail.image}
					source={{
						uri: `https://s3.amazonaws.com/img-snaptrade-us${
							this.props.image_file_link
						}`
					}}
				/>

				<StyledText>
					{this.props.ticker}, ${this.props.close_formatted},{' '}
					<StyledText
						style={[
							DiscoveryStyles.text,
							{
								color: this.getColor(
									this.props.price_pct_increase_over_last_day
								)
							}
						]}>
						({this.props.price_pct_increase_over_last_day}%)
					</StyledText>
				</StyledText>

				<StyledText>{this.props.company_name}</StyledText>
				<StyledText numberOfLines={2} style={DiscoveryStyles.text}>
					{this.props.story}
				</StyledText>
			</TouchableWithoutFeedback>
		);
	}
}

export class DiscoveryComponent extends React.PureComponent<TDetailChartComponent> {
	state = {
		open: false
	};

	toggleDescriptionView = event => {
		this.setState(state => ({ open: !state.open }));
	};

	onDiscoveryPress = () => {
		const { onDiscoveryPress, ...props } = this.props;
		this.props.onDiscoveryPress(props);
	};

	getColor = num => (num >= 0 ? colors.green : colors.red);

	render() {
		if (!this.props.ticker) return null
		return (
			<View style={DiscoveryStyles.wrapper}>
				<TouchableWithoutFeedback onPress={this.onDiscoveryPress}>
					<View>
						<Text>
							<StyledText>
								{this.props.ticker}, $
								{this.props.close_formatted},{' '}
							</StyledText>

							<StyledText
								style={[
									DiscoveryStyles.text,
									{
										color: this.getColor(
											this.props
												.price_pct_increase_over_last_day
										)
									}
								]}>
								({this.props.price_pct_increase_over_last_day}%)
							</StyledText>
						</Text>
						<DetailChartComponent
							ticker={this.props.ticker}
							priceIncrease={
								this.props.price_pct_increase_over_last_day
							}
						/>
						<StyledText>{this.props.company_name}</StyledText>
						<View>
							<StyledText
								numberOfLines={this.state.open ? null : 4}
								style={DiscoveryStyles.text}>
								{this.props.short_desc}
							</StyledText>
						</View>
					</View>
				</TouchableWithoutFeedback>
				<TouchableOpacity onPress={this.toggleDescriptionView}>
					<StyledText
						style={[
							DiscoveryStyles.dangerText,
							DiscoveryStyles.showMoreButton
						]}>
						{this.state.open ? 'Less' : 'Show more'}
					</StyledText>
				</TouchableOpacity>
			</View>
		);
	}
}

export default DiscoveryComponent;
