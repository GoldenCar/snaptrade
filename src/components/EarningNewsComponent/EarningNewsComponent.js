import React, { Component } from 'react';
import { View } from 'react-native';
import { ContentOffset, Row } from '../UIComponents/MainComponents';
import styled from 'styled-components';
import calendarIcon from '../../../assets/icons/calendar.png';
import { padding, newsWrapperShadow, colors } from '../../styles/base';
import { Icon } from '../UIComponents/IconsComponents';
import { TextLight, TextTickerBig } from '../UIComponents/TextComponents';
import EarningRowComponent from '../EarningRowComponent/EarningRowComponent';
export default class EarningNewsComponent extends Component {
	static defaultProps = {
		items: [],
		onNewsPress: () => {}
	};
	renderEarningComponent = (earning, idx) => {
		return (
			<EarningRowComponent
				key={idx}
				onRowPress={this.props.onNewsPress}
				ticker={earning.ticker}
				company_name={earning.company_name}
				latest_earning_surprise={earning.latest_earning_surprise}
				days_from_today={earning.days_from_today}
				earning_date_formatted={earning.earning_date_formatted}
				earning_time={earning.earning_time}
			/>
		);
	};

	render() {
		return (
			<Wrapper style={newsWrapperShadow}>
				<ContentOffset>
					<Row style={{ marginBottom: padding.medium }}>
						<CalendarIcon source={calendarIcon} />
						<View>
							<TextLight style={{ marginVertical: 7 }}>
								EARNING CALENDAR
							</TextLight>
							<TextTickerBig>
								Upcoming Earnings Reports
							</TextTickerBig>
						</View>
					</Row>
					{this.props.items.map(this.renderEarningComponent)}
				</ContentOffset>
				<ContentOffset />
			</Wrapper>
		);
	}
}

const Wrapper = styled.View`
	margin-bottom: ${padding.chubby}px;
	background-color: ${colors.white};
`;

const CalendarIcon = styled(Icon).attrs({})`
	margin-right: ${padding.chubby}px;
`;

const AlignedRow = styled(Row)`
	align-items: center;
`;
