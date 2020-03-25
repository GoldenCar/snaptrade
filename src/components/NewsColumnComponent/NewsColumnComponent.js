import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FormRow, ContentOffset, Row } from '../UIComponents/MainComponents';
import styled from 'styled-components';
import {
	TextTickerBig,
	PriceBigText,
	Text,
	SmallBold,
	SmallText
} from '../UIComponents/TextComponents';
import DiffComponent from '../DiffComponent/DiffComponent';
import { newsWrapperShadow, padding, colors } from '../../styles/base';
import StockChart from '../StockChart/StockChart';
import SignComponent from '../SignComponent/SignComponent';
import { formatPrice } from '../../utils';

export default class NewsColumnComponent extends Component {
	static defaultProps = {
		first: false,
		ticker: '',
		company_name: '',
		close: 0,
		market_cap: 0,
		price_pct_increase_over_last_day: 0,
		price_pct_increase_over_3days: 0,

		image_file_link: '',
		news_tile: '',
		short_desc: '',
		analyst_ratings_buy_pct: 0,
		onNewsPress: () => {}
		// close: 0,
		// market_cap: '0'
	};

	onNewsPress = () => {
		this.props.onNewsPress(this.props);
	};

	render() {
		return (
			<Wrapper
				first={this.props.first}
				style={newsWrapperShadow}
				as={TouchableOpacity}
				onPress={this.onNewsPress}>
				<FormRow style={{ overflow: 'hidden' }}>
					<View style={{ flex: 1 }}>
						<TextTickerBig numberOfLines={1}>
							{this.props.company_name} {this.props.ticker}
						</TextTickerBig>
					</View>
				</FormRow>
				<FormRow>
					<PriceBigText>{formatPrice(this.props.close)} </PriceBigText>
					<DiffComponent
						value={this.props.price_pct_increase_over_last_day}
						format
						formatSymbol
						afterSymbol={'%'}
					/>
				</FormRow>
				<FormRow>
					<SmallBold>Mkt Cap: </SmallBold>
					<SmallText>{this.props.market_cap} </SmallText>
					<SmallBold>3d Chg: </SmallBold>
					<SmallText>
						{this.props.price_pct_increase_over_3days}%
					</SmallText>
				</FormRow>

				<FormRow
					style={{
						height: 50,
						alignItems: 'center',
						justifyContent: 'space-between'
					}}>
					<Row>
						<SmallBold> Buy: </SmallBold>
						<SmallText>
							{this.props.analyst_ratings_buy_pct}% Analysts
						</SmallText>
					</Row>
					<StockChart
						ticker={this.props.ticker}
						fetchOnMount
						period={'1y'}
						prev={false}
					/>
				</FormRow>
				<FormRow>
					<NewsImage
						source={{
							uri: `https://s3.amazonaws.com/img-snaptrade-us${
								this.props.image_file_link
							}`
						}}
					/>
				</FormRow>

				<FormRow>
					<View>
						<TextTickerBig numberOfLines={2}>
							{this.props.news_tile}
						</TextTickerBig>
						<Text numberOfLines={2}>{this.props.short_desc}</Text>
					</View>
				</FormRow>
			</Wrapper>
		);
	}
}

const Wrapper = styled(ContentOffset)`
	margin-bottom: ${padding.chubby}px;
	flex: 1;
	background-color: ${props => props.theme.colors.blockBackground};
	margin-right: ${props => (props.first ? padding.chubby : 0)}px;
	overflow: hidden;
`;

const NewsImage = styled.Image`
	height: 88px;
	width: 100%;
`;
