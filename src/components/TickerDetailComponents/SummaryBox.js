import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {
	padding,
	textColors,
	fonts,
	fontWeights,
	colors,
	textStyles,
	dimensions
} from '../../styles/base';
import styled from 'styled-components';

import priceIcon from '../../../assets/icons/price.png';
import tagIcon from '../../../assets/icons/tag.png';
import towardIcon from '../../../assets/icons/toward.png';
import bookmarkIcon from '../../../assets/icons/bookmark.png';
import api from '../../api/api';
import { TitleBold, Text, TextBold } from '../UIComponents/TextComponents';
import { FormRow, Row, ContentOffset } from '../UIComponents/MainComponents';
import { Icon } from '../UIComponents/IconsComponents';
// import { formatPrice } from '../../utils/index';
import PriceHistoryComponent from '../PriceHistoryComponent/PriceHistoryComponent';

// const getIcon = category => {
// 	let icon = priceIcon;
// 	switch (category) {
// 		case 'Earnings':
// 			icon = priceIcon;
// 			break;
//
// 		case 'Analyst':
// 			icon = tagIcon;
// 			break;
//
// 		case 'Category':
// 			icon = bookmarkIcon;
// 			break;
//
// 		case 'Price change since last earnings':
// 			icon = towardIcon;
// 			break;
//
// 		default:
// 			break;
// 	}
// 	return icon;
// };


export default class SummaryBox extends Component {
	state = {};

	componentDidMount = async () => {
		await this.fetchData();
	};

	fetchData = async () => {
		try {
			const response = await api.get(
				`/ticker/stories/new/${this.props.ticker}`
			);
			const summary = response.data;

			if (summary[0]) {
				this.setState({ ...summary[0] });
			}
		} catch (error) {}
	};

	render() {
		if (!this.state.current_price) return null;
		return (
			<Wrapper>
				<TitleBold style={styles.title}>Summary</TitleBold>
				<View style={{ flex: 1 }}>
					<PriceHistoryComponent
						start={this.state['52_Week_Low']}
						end={this.state['52_Week_High']}
						current={Number(this.state.current_price)}
					/>
				</View>

				<View>
					{this.state.Analyst_Buy_Ratings && (
						<FormRow>
							<CentredRow>
								<Icon source={tagIcon} />
								<TextBold>
									{' '}
									Buy: {this.state.Analyst_Buy_Ratings}
								</TextBold>
								<Text> of Analysts</Text>
							</CentredRow>
						</FormRow>
					)}

					{this.state.EPS_Qtr && (
						<FormRow>
							<CentredRow>
								<Icon source={priceIcon} />
								<TextBold>
									{' '}
									{this.state.EPS_Qtr}: ${this.state.EPS}
								</TextBold>
								<Text>{` earning/share  (${this.state.earnings_surprise_last_qtr} Surprise)`}</Text>
							</CentredRow>
						</FormRow>
					)}

					{this.state.earnings_surprise_beat_guidance_summary && (
						<FormRow>
							<CentredRow>
								<Icon source={priceIcon} />
								<TextBold>
									{' '}
									Earnings:
								</TextBold>
								<Text>{` ${this.state.earnings_surprise_beat_guidance_summary} beat guidance`}</Text>
							</CentredRow>
						</FormRow>
					)}

					{this.state.pct_chage_since_earnings && (
						<FormRow>
							<CentredRow>
								<Icon source={towardIcon} />
								<TextBold>
									{' '}
									{this.state.pct_chage_since_earnings}
								</TextBold>
								<Text> since last earnings</Text>
							</CentredRow>
						</FormRow>
					)}

					{/* {this.state.PE ? (
						<FormRow>
							<CentredRow>
								<Icon source={bookmarkIcon} />
								<TextBold>P/E Ratio: </TextBold>
								<Text>
									{' '}
									{this.state.PE === 'N/A'
										? 'N/A'
										: formatPrice(Number(this.state.PE))}
								</Text>
							</CentredRow>
						</FormRow>
					) : null} */}

					{this.state.market_cap_rank && (
						<FormRow>
							<CentredRow>
								<Icon source={bookmarkIcon} />
								<Text numberOfLines={2}>
									<TextBold>
										Mkt Cap: {this.state.market_cap_rank}
									</TextBold>
									<Text>
										{' '}
										in {this.state.market_cap_sector}
									</Text>
								</Text>
							</CentredRow>
						</FormRow>
					)}

					{this.state.performance && (
						<FormRow>
							<CentredRow>
								<Icon source={priceIcon} />
								<Text>
									<TextBold>
										Price Performance (1 month):
									</TextBold>
									<Text> {this.state.performance}</Text>
								</Text>
							</CentredRow>
						</FormRow>
					)}

					{/* {this.state.market_cap_sector ? (
						<FormRow>
							<CentredRow>
								<Icon source={priceIcon} />
								<Text numberOfLines={1}>{}</Text>
							</CentredRow>
						</FormRow>
					) : null} */}

					{/* {this.state.pct_chage_since_earnings ? (
						<FormRow>
							<CentredRow>
								<Icon source={towardIcon} />
								<TextBold>
									{' '}
									{this.state.pct_chage_since_earnings}
								</TextBold>
								<Text> since last earnings</Text>
							</CentredRow>
						</FormRow>
					) : null} */}
				</View>
			</Wrapper>
		);
	}
}

const Wrapper = styled(ContentOffset)`
	width: ${dimensions.fullWidth}px;
	overflow: hidden;
	margin-bottom: ${padding.xlarge}px;
`;

const StoryRow = styled(FormRow)`
	overflow: hidden;
	align-items: flex-start;
`;

const CentredRow = styled(Row)`
	align-items: center;
`;

const styles = StyleSheet.create({
	wrapper: {
		width: '100%',
		paddingHorizontal: padding.large,
		marginBottom: padding.xlarge
	},
	title: {
		marginVertical: padding.xlarge
	},
	content: {
		// paddingLeft: padding.xlarge
		marginBottom: padding.chubby
	},
	category: {
		color: colors.white,
		fontWeight: fontWeights.semi_bold
	},
	text: {
		color: textColors.primary
	},
	textWrapper: {
		marginBottom: padding.medium
	}
});
