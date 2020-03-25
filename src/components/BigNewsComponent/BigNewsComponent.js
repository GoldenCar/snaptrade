import React, { PureComponent } from 'react';
import styled from 'styled-components';
import TickerChart from '../TickerChart/TickerChart';
import { ContentOffset, Row } from '../UIComponents/MainComponents';
import { dimension } from '../../styles/themes';
import NewsContentComponent from '../NewsContentComponent/NewsContentComponent';
import { newsWrapperShadow, colors } from '../../styles/base';
import { withNavigation } from 'react-navigation';
import { TextLight, Text } from '../UIComponents/TextComponents';

class BigNewsComponent extends PureComponent {
	static defaultProps = {
		shadow: true,
		ticker: '',
		chart_url: undefined,
		image_file_link: '',

		price_pct_increase_over_last_day: '',
		pub_time_days_ago_mod: '',
		title: '',
		news_clip: '',
		link: ''
	};

	render() {
		return (
			<Wrapper style={this.props.shadow ? newsWrapperShadow : {}}>
				{this.props.chart_url ? (
					<Row style={{ justifyContent: 'center' }}>
						<Text style={{ fontSize: 12 }}>
							{this.props.ticker} 1 yr chart
						</Text>
					</Row>
				) : null}
				<MediaWrapper>
					{this.props.chart_url ? (
						<TickerChart
							yAxis
							xAxis
							ticker={this.props.ticker}
							period={'1y'}
							fetchOnMount
							markers={false}
							height={dimension.width * 0.6}
						/>
					) : (
						<NewsImage
							source={{
								uri: `https://s3.amazonaws.com/img-snaptrade-us${
									this.props.image_file_link
								}`
							}}
						/>
					)}
				</MediaWrapper>
				<Content>
					<NewsContentComponent
						ticker={this.props.ticker}
						price_pct_increase_over_last_day={
							this.props.price_pct_increase_over_last_day
						}
						pub_time_days_ago_mod={this.props.pub_time_days_ago_mod}
						link={this.props.link}
						title={this.props.title}
						news_clip={this.props.news_clip}
					/>
				</Content>
			</Wrapper>
		);
	}
}

export default BigNewsComponent;

const Wrapper = styled.View`
	width: ${props => props.theme.dimension.width}px;
	margin-bottom: 10px;
	background-color: ${props => props.theme.colors.blockBackground};
`;

const MediaWrapper = styled.View``;

const NewsImage = styled.Image`
	height: ${props => props.theme.dimension.width * 0.6}px;
	width: ${props => props.theme.dimension.width}px;
`;

const Content = styled(ContentOffset)`
	background-color: ${props => props.theme.colors.background};
`;
