import React, { Component } from 'react';
import { dimension } from '../../styles/themes';
import { ContentOffset, Row } from '../UIComponents/MainComponents';
import styled from 'styled-components';
import NewsContentComponent from '../NewsContentComponent/NewsContentComponent';
import { padding, newsWrapperShadow } from '../../styles/base';

export default class StandardNewsComponent extends Component {
	static defaultProps = {
		shadow: true,
		ticker: '',
		item_type: 'news_small_image_left',
		image_file_link: '',

		price_pct_increase_over_last_day: '',
		pub_time_days_ago_mod: '',
		title: '',
		news_clip: '',
		link: ''
	};

	renderImageLeft = () => (
		<ContentRow>
			<NewsImage
				leftImage={true}
				source={{
					uri: `https://s3.amazonaws.com/img-snaptrade-us${
						this.props.image_file_link
					}`
				}}
			/>
			<NewsContentWrapper>
				<NewsContentComponent
					link={this.props.link}
					ticker={this.props.ticker}
					price_pct_increase_over_last_day={
						this.props.price_pct_increase_over_last_day
					}
					pub_time_days_ago_mod={this.props.pub_time_days_ago_mod}
					title={this.props.title}
					news_clip={this.props.news_clip}
				/>
			</NewsContentWrapper>
		</ContentRow>
	);

	renderImageRight = () => (
		<ContentRow>
			<NewsContentWrapper>
				<NewsContentComponent
					link={this.props.link}
					ticker={this.props.ticker}
					price_pct_increase_over_last_day={
						this.props.price_pct_increase_over_last_day
					}
					pub_time_days_ago_mod={this.props.pub_time_days_ago_mod}
					title={this.props.title}
					news_clip={this.props.news_clip}
				/>
			</NewsContentWrapper>

			<NewsImage
				source={{
					uri: `https://s3.amazonaws.com/img-snaptrade-us${
						this.props.image_file_link
					}`
				}}
			/>
		</ContentRow>
	);

	render() {
		return (
			<Wrapper style={this.props.shadow ? newsWrapperShadow : {}}>
				{this.props.item_type === 'news_small_image_left'
					? this.renderImageLeft()
					: this.renderImageRight()}
			</Wrapper>
		);
	}
}

const Wrapper = styled(ContentOffset)`
	width: ${props => props.theme.dimension.width}px;
	margin-bottom: 10px;
	background-color: ${props => props.theme.colors.blockBackground};
`;

const NewsImage = styled.Image`
	width: 115px;
	height: 88px;
	margin-left: ${props => (props.leftImage ? 0 : padding.chubby)}px;
	margin-right: ${props => (props.leftImage ? padding.chubby : 0)}px;
	border-radius: 4px;
`;

const ContentRow = styled(Row)`
	justify-content: space-between;
	width: 100%;
`;

const NewsContentWrapper = styled.View`
	max-width: ${dimension.width - 150}px;
	width: 100%;
`;
