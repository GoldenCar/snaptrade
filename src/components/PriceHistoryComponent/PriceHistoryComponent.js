import React, { Component } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import calendarIcon from '../../../assets/icons/calendar.png';
import { colors } from '../../styles/base';
import { Row } from '../UIComponents/MainComponents';
import { Text, TextBold } from '../UIComponents/TextComponents';
import { Icon } from '../UIComponents/IconsComponents';
import { formatPrice } from '../../utils';
export default class PriceHistoryComponent extends Component {
	static defaultProps = {
		start: 0,
		end: 0,
		current: 0
	};
	render() {
		const low = Number(this.props.start);
		const hight = Number(this.props.end);
		const current = Number(this.props.current);
		let point = ((current - low) / (hight - low)) * 100;
		if (point < 0) point = 0;
		if (point > 100) point = 100;
		return (
			<Wrapper>
				<LabelWrapper>
					<Icon source={calendarIcon} />
					<TextBold>
						{'  '} 52 Week {'  '}
					</TextBold>
				</LabelWrapper>
				<Row style={{ flexGrow: 1, width: 240 }}>
					<View style={{ flexGrow: 1, width: 240 }}>
						<Line>
							<CurrentPriceWrapper style={{ left: `${point}%` }}>
								<CurrentPrice>
									{formatPrice(current)}
								</CurrentPrice>
								<Dot />
							</CurrentPriceWrapper>
						</Line>
						<PricesRow>
							<Text>{formatPrice(low)} </Text>
							<Text> {formatPrice(hight)}</Text>
						</PricesRow>
					</View>
				</Row>
			</Wrapper>
		);
	}
}

const Wrapper = styled(Row)`
	flex: 1;
	height: 50px;
	overflow: hidden;
	justify-content: space-between;
	align-items: flex-end;
	/* justify-content: flex-end; */
`;
const Line = styled.View`
	/* width: 100%; */
	flex-grow: 1;
	background-color: ${colors.dark_gray};
	height: 2px;
	align-items: center;
	border-radius: 1px;
`;

const PricesRow = styled(Row)`
	/* width: 100%; */
	flex-grow: 1;
	justify-content: space-between;
	margin-top: 5px;
`;

const Dot = styled.View`
	width: 10px;
	height: 10px;
	top: -4px;
	border-radius: 5px;
	background-color: ${colors.violet};
`;

const CurrentPriceWrapper = styled.View`
	height: 30px;
	justify-content: space-between;
	align-items: center;
	top: -20px;
	width: 70px;
	margin-left: -35px;
	position: absolute;
`;

const LabelWrapper = styled(Row)`
	margin-bottom: 10px;
	align-items: center;
`;

const CurrentPrice = styled(TextBold)`
	/* left: -10px; */
`;
