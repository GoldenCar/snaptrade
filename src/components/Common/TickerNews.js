import React from 'react';
import { FlatList } from 'react-native';

// import TickerArticle from './TickerArticle.js';
import StandardNewsComponent from '../StandartNewsComponent/StandartNewsComponent.js';
import BigNewsComponent from '../BigNewsComponent/BigNewsComponent.js';

const TickerNews = (props: Props) => {
	renderNews = ({ item: news, index }) => {
		if (!((index + 1) % 5)) {
			return (
				<BigNewsComponent
					key={news.ticker}
					ticker={''}
					shadow={false}
					title={news.title}
					image_file_link={news.image_file_link}
					price_pct_increase_over_last_day={''}
					pub_time_days_ago_mod={news.pub_time_days_ago_mod}
					news_clip={news.news_clip}
					link={news.link}
				/>
			);
		}

		return (
			<StandardNewsComponent
				key={news.ticker}
				ticker={''}
				shadow={false}
				title={news.title}
				image_file_link={news.image_file_link}
				price_pct_increase_over_last_day={''}
				pub_time_days_ago_mod={news.pub_time_days_ago_mod}
				news_clip={news.news_clip}
				link={news.link}
			/>
		);
	};

	return (
		<FlatList
			data={props.tickerNews}
			style={{ flex: 1 }}
			renderItem={renderNews}
		/>
	);
};

export default TickerNews;
