import React, { PureComponent } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { newsWrapperShadow, colors, padding } from '../../styles/base';
import {
	TextTickerBig,
	PriceBigText,
	TextBold,
	Text
} from '../UIComponents/TextComponents';
import DiffComponent from '../DiffComponent/DiffComponent';
import StockChart from '../StockChart/StockChart';
import { Row, ContentOffset, FormRow } from '../UIComponents/MainComponents';
import { Icon } from '../UIComponents/IconsComponents';
import priceIcon from '../../../assets/icons/price.png';
import tagIcon from '../../../assets/icons/tag.png';
import towardIcon from '../../../assets/icons/toward.png';
import addIcon from '../../../assets/icons/add.png';
import calendarIcon from '../../../assets/icons/calendar.png';
import PriceHistoryComponent from '../PriceHistoryComponent/PriceHistoryComponent';
import SignComponent from '../SignComponent/SignComponent';
import { formatPrice } from '../../utils';

export default class DiscoveryWatchListComponent extends PureComponent {
	static defaultProps = {
		ticker: '',
		company_name: '',
		close: 0,
		price_pct_increase_over_last_day: 0,
		story_details: {}
	};
	render() {
		return (
			<Wrapper style={newsWrapperShadow}>
				<FormRow>
					<AlignedRow style={{ justifyContent: 'space-between' }}>
						<Row>
							<TextTickerBig color={colors.violet}>
								{this.props.ticker}{' '}
							</TextTickerBig>
							<TextTickerBig>
								{this.props.company_name}
							</TextTickerBig>
						</Row>
						<SignComponent ticker={this.props.ticker} signed />
						{/* <Icon source={addIcon} /> */}
					</AlignedRow>
				</FormRow>

				<FormRow>
					<AlignedRow>
						<Row style={{ alignItems: 'center' }}>
							<PriceBigText>{formatPrice(this.props.close)} </PriceBigText>
							<DiffComponent
								value={
									this.props.price_pct_increase_over_last_day
								}
								format
								formatSymbol
								afterSymbol={'%'}
							/>
						</Row>
						<StockChart
							ticker={this.props.ticker}
							fetchOnMount
							prev={false}
							period={'1y'}
						/>
					</AlignedRow>
				</FormRow>

				<FormRow>
					<CentredRow>
						<AlignedRow>

							<PriceHistoryComponent
								current={this.props.close}
								start={this.props.story_details['52_Week_Low']}
								end={this.props.story_details['52_Week_High']}
							/>
						</AlignedRow>
					</CentredRow>
				</FormRow>

				<View>
					{this.props.story_details.Analyst_Buy_Ratings ? (
						<FormRow>
							<CentredRow>
								<Icon source={tagIcon} />
								<TextBold>
									{' '}
									Buy:{' '}
									{
										this.props.story_details
											.Analyst_Buy_Ratings
									}
								</TextBold>
								<Text> of analyst</Text>
							</CentredRow>
						</FormRow>
					) : null}

					{this.props.story_details.EPS_Qtr ? (
						<FormRow>
							<CentredRow>
								<Icon source={priceIcon} />
								<TextBold>
									{' '}
									{this.props.story_details.EPS_Qtr}: $
									{this.props.story_details.EPS}
								</TextBold>
								<Text> earning/share</Text>
							</CentredRow>
						</FormRow>
					) : null}

					{this.props.story_details.pct_chage_since_earnings ? (
						<FormRow>
							<CentredRow>
								<Icon source={towardIcon} />
								<TextBold>
									{' '}
									{
										this.props.story_details
											.pct_chage_since_earnings
									}
								</TextBold>
								<Text> since last earnings</Text>
							</CentredRow>
						</FormRow>
					) : null}
				</View>
			</Wrapper>
		);
	}
}

const Wrapper = styled(ContentOffset)`
	margin-bottom: ${padding.chubby}px;
	background-color: ${props => props.theme.colors.blockBackground};
`;

const AlignedRow = styled(Row)`
	align-items: center;
	justify-content: space-between;
	width: 100%;
`;

const CentredRow = styled(Row)`
	align-items: center;
`;

// {
// 	"item_type": "discover_watchlist",
// 	"items": [
// 		{
// 			"close": 43.45,
// 			"company_name": "Western Digital",
// 			"price_increase_over_last_day": 1.5,
// 			"price_pct_increase_over_last_day": 3.58,
// 			"story_details": [
// 				{
// 					"52_Week_High": "88.50",
// 					"52_Week_Low": "35.06",
// 					"Analyst_Buy_Ratings": "80.65%",
// 					"EPS": "1.4500",
// 					"EPS_Qtr": "2018Q4",
// 					"PE": "16.37",
// 					"current_price": "43.45000",
// 					"pct_chage_since_earnings": "-20.77%",
// 					"ticker": "WDC"
// 				}
// 			],
// 			"ticker": "WDC"
// 		}
// 	]
// },
