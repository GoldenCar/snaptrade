import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import bellIcon from '../../../assets/icons/notification-filled.png';
import { newsWrapperShadow, colors, padding } from '../../styles/base';
import { Row, ContentOffset } from '../UIComponents/MainComponents';
import { Icon, IconSmall } from '../UIComponents/IconsComponents';
import {
	TextTickerBig,
	TextLight,
	TextBold,
	PriceBigText
} from '../UIComponents/TextComponents';
import DiffComponent from '../DiffComponent/DiffComponent';

export default class DiscoveryNotificationComponent extends Component {
	static defaultProps = {
		notification_text_detail: '',
		ticker: '',
		close: 0,
		price_pct_increase_over_last_day: 0,
		onNewsPress: () => {}
	};

	onPress = () => {
		this.props.onNewsPress(this.props);
	};
	render() {
		return (
			<TouchableOpacity onPress={this.onPress}>
				<Wrapper style={newsWrapperShadow}>
					<IconWrapper>
						<IconSmall source={bellIcon} />
					</IconWrapper>
					<View>
						<ContentWrapper>
							<TextLight color={colors.gray}>
								NOTIFICATION
							</TextLight>
						</ContentWrapper>

						<ContentWrapper style={{ overflow: 'hidden' }}>
							<TextTickerBig color={colors.violet}>
								{this.props.ticker}{' '}
							</TextTickerBig>
							<TextBold numberOfLines={1}>
								{this.props.notification_text_detail}
							</TextBold>
						</ContentWrapper>

						<ContentWrapper>
							<PriceBigText>{this.props.close} </PriceBigText>
							<DiffComponent
								format
								formatSymbol
								afterSymbol={'%'}
								value={
									this.props.price_pct_increase_over_last_day
								}
							/>
						</ContentWrapper>
					</View>
				</Wrapper>
			</TouchableOpacity>
		);
	}
}
const IconWrapper = styled.View`
	margin-right: ${padding.medium}px;
`;
const Wrapper = styled(ContentOffset)`
	width: ${props => props.theme.dimension.width}px;
	margin-bottom: 10px;
	flex-direction: row;
	background-color: ${props => props.theme.colors.background};
`;

const ContentWrapper = styled(Row)`
	margin-bottom: ${padding.small}px;
	align-items: flex-end;
`;
