import React, { PureComponent } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { formatPrice, getColorFromValue } from '../../utils';
import ShadowComponent from '../../components/ShadowComponent/ShadowComponent';
import { Text, TextBold } from '../UIComponents/TextComponents';
import { spacingOrSizingScale, colors, padding } from '../../styles/base';
import { Row } from '../UIComponents/MainComponents';

export default class TopPricesComponent extends PureComponent {
	static defaultProps = {
		ticker: '',
		close_formatted: 0,
		price_pct_increase_over_last_day: 0,
		price_increase_over_last_day: 0
	};

	render() {
		return (
			<ShadowComponent
				width={140}
				border={12}
				color={colors.grey}
				opacity={0.1}
				radius={25}
				y={2}
				height={50}
				style={{ marginRight: 10 }}>
				<PriceWrapper key={this.props.ticker}>
					<View>
						<Text>{this.props.ticker}</Text>
						<Row>
							<TextBold>{this.props.close_formatted} </TextBold>
							<TextBold
								color={getColorFromValue(
									this.props.price_increase_over_last_day
								)}>
								({formatPrice(this.props.price_increase_over_last_day, 2, true)})
							</TextBold>
						</Row>
					</View>
				</PriceWrapper>
			</ShadowComponent>
		);
	}
}

const PriceWrapper = styled.View`
	padding: ${spacingOrSizingScale._8}px ${spacingOrSizingScale._12}px;
	border-radius: 25px;
	align-items: center;
	justify-content: center;
	background-color: ${props => props.theme.colors.background};
`;
