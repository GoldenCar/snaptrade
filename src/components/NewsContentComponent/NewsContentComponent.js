import React, { PureComponent } from 'react';
import { TouchableOpacity, Linking, View } from 'react-native';
import { colors } from '../../styles/base';
import {
	TextBold,
	Text,
	Title,
	TextLight
} from '../UIComponents/TextComponents';
import { Row } from '../UIComponents/MainComponents';
import { getColorFromValue, formatPrice } from '../../utils';

export default class NewsContentComponent extends PureComponent {
	static defaultProps = {
		ticker: '',
		price_pct_increase_over_last_day: '',
		pub_time_days_ago_mod: '',
		title: '',
		link: '',
		news_clip: ''
	};

	state = {
		open: false
	};

	openInBrowser = () => {
		this.props.link && Linking.openURL(this.props.link);
	};

	toggle = () => this.setState(state => ({ open: !state.open }));

	render() {
		return (
			<TouchableOpacity onPress={this.toggle}>
				<Row>
					<TextBold color={colors.violet}>
						{this.props.ticker ? `${this.props.ticker} ` : ''}
					</TextBold>
					<TextBold
						color={getColorFromValue(
							this.props.price_pct_increase_over_last_day
						)}>
						{this.props.price_pct_increase_over_last_day === ''
							? ''
							: `${formatPrice(
									this.props.price_pct_increase_over_last_day,
									2,
									true
							  )}% `}
					</TextBold>
					<TextLight color={colors.gray}>
						{this.props.pub_time_days_ago_mod}
					</TextLight>
				</Row>
				<Row>
					<Title numberOfLines={3}>{this.props.title}</Title>
				</Row>
				{this.state.open ? (
					<View>
						<Text>{this.props.news_clip}</Text>
						{this.props.link ? (
							<TouchableOpacity onPress={this.openInBrowser}>
								<Text color={colors.gray}>Show more</Text>
							</TouchableOpacity>
						) : null}
					</View>
				) : null}
			</TouchableOpacity>
		);
	}
}
