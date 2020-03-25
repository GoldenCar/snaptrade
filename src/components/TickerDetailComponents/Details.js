import React from 'react';
import { colors, padding } from '../../styles/base.js';
import styled from 'styled-components';
import { Wrapper, Row, ContentOffset } from '../UIComponents/MainComponents';
import { Text, TitleBold } from '../UIComponents/TextComponents';

const Details = (props: Props) => {
	return (
		<Wrapper>
			<ContentOffset>
				<TitleBold>Stats</TitleBold>
			</ContentOffset>

			<ContentOffset>
				<Row>
					<Column first>
						<ContentWrapper>
							<NameText>Open</NameText>
							<Text>{props.tickerDetails.open}</Text>
						</ContentWrapper>
						<ContentWrapper>
							<NameText>High</NameText>
							<Text>{props.tickerDetails.high}</Text>
						</ContentWrapper>
						<ContentWrapper>
							<NameText>Low</NameText>
							<Text>{props.tickerDetails.low}</Text>
						</ContentWrapper>

						<ContentWrapper>
							<NameText>52 Wk High</NameText>
							<Text>{props.tickerDetails.high_price_52week}</Text>
						</ContentWrapper>
						<ContentWrapper>
							<NameText>52 Wk Low</NameText>
							<Text>{props.tickerDetails.low_price_52week}</Text>
						</ContentWrapper>

						<ContentWrapper>
							<NameText>Volume</NameText>
							<Text>{props.tickerDetails.volume_formatted}</Text>
						</ContentWrapper>

						<ContentWrapper>
							<NameText>30d AVG Vol</NameText>
							<Text>
								{props.tickerDetails.avg_volume_30_formatted}
							</Text>
						</ContentWrapper>
					</Column>
					<Column>
						<ContentWrapper>
							<NameText>Vol Chg</NameText>
							<Text>
								{
									props.tickerDetails
										.gain_volume_percentage_past_day
								}
							</Text>
						</ContentWrapper>
						<ContentWrapper>
							<NameText>PE Ratio</NameText>
							<Text>{props.tickerDetails.price_to_earnings}</Text>
						</ContentWrapper>
						<ContentWrapper>
							<NameText>EPS</NameText>
							<Text>{props.tickerDetails.latest_eps}</Text>
						</ContentWrapper>

						<ContentWrapper>
							<NameText>Dividend</NameText>
							<Text>{props.tickerDetails.dividend_amount}</Text>
						</ContentWrapper>
						<ContentWrapper>
							<NameText>14 Day RSI</NameText>
							<Text>{props.tickerDetails.rsi_14_day}</Text>
						</ContentWrapper>
						<ContentWrapper>
							<NameText>Mkt cap</NameText>
							<Text>{props.tickerDetails.market_cap}</Text>
						</ContentWrapper>
						<ContentWrapper>
							<NameText>Earnings</NameText>
							<Text>
								{props.tickerDetails.next_earnings_date}
							</Text>
						</ContentWrapper>
					</Column>
				</Row>
			</ContentOffset>
		</Wrapper>
	);
};

const NameText = styled(Text)`
	color: ${colors.gray};
`;

const Column = styled.View`
	flex: 1;
	padding: 0;
	padding-right: ${props => (props.first ? padding.medium : 0)}px;
	padding-left: ${props => (props.first ? 0 : padding.medium)}px;
`;
const ContentWrapper = styled(Row)`
	justify-content: space-between;
	margin-bottom: ${padding.chubby}px;
`;

export default Details;
