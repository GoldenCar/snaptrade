// @flow

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { View } from 'react-native';
import { padding, colors, spacingOrSizingScale } from '../../styles/base.js';
import { deleteTickerFromWatchlistRequest } from '../../redux/actions/watchlist';
import { formatPrice } from '../../utils';
import TickerTypedContainer from '../../containers/TickerTypedContainer/TickerTypedContainer';
import StockChart from '../StockChart/StockChart';
import { getFeedLoading } from '../../redux/selectors/watchlist.js';
import {
	PriceBigText,
	TextTickerBig,
	Text
} from '../UIComponents/TextComponents.js';
import { Row, EndContent } from '../UIComponents/MainComponents.js';
import { colorsDark } from '../../styles/base';

const mapStateToProps = state => ({
	isLoading: getFeedLoading(state)
});

@connect(mapStateToProps)
export default class TickerCard extends React.PureComponent {
	onPress = () => {
		this.props.onTickerPress(this.props);
	};

	render() {
		return (
			<TickerWrapper
				as={TouchableOpacity}
				activeOpacity={0.9}
				onPress={this.onPress}>
				<Content>
					<ContentColumn
						style={{
							width: '47%',
							overflow: 'hidden'
						}}>
						<TextTickerBig color={colors.violet}>
							{this.props.ticker}
						</TextTickerBig>
						<Row>
							<Text
								style={{ fontSize: 12, lineHeight: 19 }}
								numberOfLines={1}>
								{this.props.insight_info}
							</Text>
						</Row>
					</ContentColumn>

					<ChartWrapper>
						<StockChart ticker={this.props.ticker} period={'1d'} />
					</ChartWrapper>

					<RightContentWrapper>
						<ContentColumn style={{ alignItems: 'flex-end' }}>
							<EndContent>
								<PriceBigText
									style={{ fontSize: 17, lineHeight: 19 }}>
									{formatPrice(this.props.closePrice)}
								</PriceBigText>
							</EndContent>
							<TickerTypedContainer
								views={[
									{
										value: formatPrice(
											this.props
												.pricePctIncreaseOverLastDay ||
												0
										),
										symbol: '%'
									},
									{
										value: formatPrice(
											this.props
												.priceIncreaseOverLastDay || 0
										),
										symbol: ''
									},
									{
										value:
											this.props.marketCapFormatted || 0,
										symbol: ''
									}
								]}
							/>
						</ContentColumn>
					</RightContentWrapper>
				</Content>
			</TickerWrapper>
		);
	}
}

const mapDispatchToProps = {
	deleteTickerFromWatchlistRequest
};

@connect(
	undefined,
	mapDispatchToProps
)
export class HiddenItem extends React.Component {
	onDeletePress = () => {
		this.props.deleteTickerFromWatchlistRequest(this.props.ticker);
	};

	render() {
		return (
			<View
				style={{
					flex: 1,
					width: '100%',
					justifyContent: 'flex-end',
					backgroundColor: colors.red,
					flexDirection: 'row',
					alignItems: 'center',
					paddingRight: padding.chubby
				}}>
				<TouchableOpacity onPress={this.onDeletePress}>
					<Text color={colors.white}>DELETE</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const TickerWrapper = styled.View`
	padding-left: 20px;
	width: 100%;
	padding-right: 20px;
	background-color: ${props => props.theme.colors.background};
`;

const Content = styled(Row)`
	border-bottom-width: 1px;
	border-color: ${props => props.theme.colors.line};
	padding: 15px 0;
	justify-content: space-between;
`;
const ContentColumn = styled.View`
	justify-content: space-between;
`;
const RightContentWrapper = styled.View`
	align-items: flex-end;
	margin-left: ${spacingOrSizingScale._12}px;
`;

const ChartWrapper = styled(Row)`
	justify-content: flex-end;
	flex: 1;
`;

const HiddenButtonWrapper = styled.View`
	flex: 1;
	width: 100%;
	justify-content: center;
	background-color: ${colors.red};
	flex-direction: row;
	align-items: center;
	padding: ${padding.chubby}px;
`;
