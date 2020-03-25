import React, { PureComponent } from 'react';
import { View, TouchableOpacity } from 'react-native';
import StandardNewsComponent from '../StandartNewsComponent/StandartNewsComponent';

export class DiscoverySmallComponent extends PureComponent {
	static defaultProps = {
		items: [],
		item_type: '',
		onDiscoveryPress: () => {}
	};

	renderNews = (news, idx) => (
		<TouchableOpacity
			key={`${idx}_${news.ticker}`}
			onPress={() => this.props.onDiscoveryPress(news)}>
			<StandardNewsComponent
				item_type={this.props.item_type}
				ticker={news.ticker}
				key={news.ticker}
				news_clip={news.news_clip}
				type={news.type}
				image_file_link={news.image_file_link_2}
				price_pct_increase_over_last_day={
					news.price_pct_increase_over_last_day
				}
				pub_time_days_ago_mod={news.pub_time_days_ago_mod}
				title={news.title}
			/>
		</TouchableOpacity>
	);

	render() {
		return <View>{this.props.items.map(this.renderNews)}</View>;
	}
}

export default DiscoverySmallComponent;
