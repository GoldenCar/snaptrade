import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import DiscoveryColumnsComponentStyles from './styles';
import { mainStyles } from '../../styles/controls';
import { getColorFromValue } from '../../utils';
import DetailChartComponent from '../DetailChart/DetailChartComponent';
import NewsColumnComponent from '../NewsColumnComponent/NewsColumnComponent';
import { ContentOffset, Row } from '../UIComponents/MainComponents';

export class DiscoveryColumnsComponent extends Component {
	static defaultProps = {
		items: [],
		item_type: '',
		onNewsPress: () => {}
	};

	getStoryDetail = discovery => {
		const story = discovery.story_details.find(
			detail => detail.category === 'Analyst'
		);
		if (story) return `${story.category}: ${story.label_details}`;
		const firstStory = discovery.story_details[0];
		if (firstStory)
			return `${firstStory.category}: ${firstStory.label_details}`;
		return null;
	};

	renderDiscovery = (discovery, index) => {
		return (
			<NewsColumnComponent
				first={!index}
				onNewsPress={this.props.onNewsPress}
				analyst_ratings_buy_pct={discovery.analyst_ratings_buy_pct}
				key={discovery.ticker}
				ticker={discovery.ticker}
				company_name={discovery.company_name}
				close={discovery.close}
				image_file_link={discovery.image_file_link}
				short_desc={discovery.short_desc}
				news_tile={discovery.news_tile}
				market_cap={discovery.market_cap}
				price_pct_increase_over_last_day={
					discovery.price_pct_increase_over_last_day
				}
				price_pct_increase_over_3days={
					discovery.price_pct_increase_over_3days
				}
			/>
		);
	};

	render() {
		return (
			<Row>
				{this.props.items.map(this.renderDiscovery)}
			</Row>
		);
	}
}

export default DiscoveryColumnsComponent;
