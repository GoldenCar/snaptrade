import React, { Component } from 'react';
import styled from 'styled-components';

import { View } from 'react-native';
import { ContentOffset, Row } from '../UIComponents/MainComponents';
import { Title, Text } from '../UIComponents/TextComponents';
import { colors, fontWeights, padding } from '../../styles/base';
import DiffComponent from '../DiffComponent/DiffComponent';
// {
// 	"close": 1907.57,
// 	"company_name": "Amazon.com Inc",
// 	"price_increase_over_last_day": 36.42,
// 	"price_pct_increase_over_last_day": 1.95,
// 	"story_details": [
// 		{
// 			"category": "Fundamentals",
// 			"id": 1235688,
// 			"label_details": "80.45",
// 			"label_name": "P/E"
// 		},
// 		{
// 			"category": "52 Week Low",
// 			"id": 1219346,
// 			"label_details": "1343.96",
// 			"label_name": "52 Week Low"
// 		},
// 		{
// 			"category": "52 Week High",
// 			"id": 1202963,
// 			"label_details": "2039.51",
// 			"label_name": "52 Week High"
// 		},
// 		{
// 			"category": "EPS",
// 			"id": 1198638,
// 			"label_details": "6.0400",
// 			"label_name": "2018Q4"
// 		},
// 		{
// 			"category": "Price change since last earnings",
// 			"id": 1178213,
// 			"label_details": "-1.63%",
// 			"label_name": "Price change since last earnings"
// 		},
// 		{
// 			"category": "52 Week Low",
// 			"id": 998168,
// 			"label_details": "1343.96",
// 			"label_name": "Stock Price"
// 		}
// 	],
// 	"ticker": "AMZN"
// },
export default class NewsDiscoveryComponent extends Component {
	static defaultProps = {
		ticker: 'AMZ',
		close: 1907.57,
		company_name: 'Amazon.com Inc',
		price_increase_over_last_day: 36.42,
		price_pct_increase_over_last_day: 1.95,
		story_details: []
	};

	render() {
		return (
			<Wrapper>
				<AlignedRow>
					<NewTitle color={colors.violet}>
						{this.props.ticker}
					</NewTitle>
					<NewTitle>{this.props.company_name}</NewTitle>
				</AlignedRow>
				<AlignedRow>
					<Price>{this.props.close} </Price>
					<DiffComponent
						format={true}
						formatSymbol={true}
						value={this.props.price_pct_increase_over_last_day}
					/>
				</AlignedRow>
				<Row />
				<View />
			</Wrapper>
		);
	}
}

const Wrapper = styled(ContentOffset)`
	border: 1px solid red;
	margin-top: 100px;
`;

const NewTitle = styled(Text)`
	font-size: 17px;
	font-weight: ${fontWeights.bold};
	text-align: center;
`;

const Price = styled(Text)`
	font-size: 22px;
	font-weight: ${fontWeights.normal};
	line-height: 25;
`;

const AlignedRow = styled(Row)`
	align-items: center;
	margin-bottom: ${padding.medium}px;
`;
