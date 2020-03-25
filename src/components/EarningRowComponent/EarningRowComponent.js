import React, { Component } from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import styled from 'styled-components';
import bellIcon from '../../../assets/icons/notification-filled.png';
import bellIconGray from '../../../assets/icons/notification-filled-gray.png';
import { Row } from '../UIComponents/MainComponents';
import { Icon, IconSmall } from '../UIComponents/IconsComponents';
import { padding, colors } from '../../styles/base';
import { Text, TextBold } from '../UIComponents/TextComponents';

export default class EarningRowComponent extends Component {
	static defaultProps = {
		ticker: '',
		company_name: '',
		days_from_today: '',
		earning_date_formatted: '',
		earning_time: '',
		latest_earning_surprise: ''
	};

	onPress = () => {
		this.props.onRowPress(this.props);
	};

	render() {
		return (
			<TouchableOpacity onPress={this.onPress}>
				<Wrapper>
					<ScrollView horizontal>
						<ContentOffset style={{ width: 20 }}>
							<IconSmall source={bellIconGray} />
						</ContentOffset>
						<ContentOffset style={{ width: 40 }}>
							<TextBold color={colors.violet}  >
								{this.props.ticker}
							</TextBold>
						</ContentOffset>

						<ContentOffset  style={{ width: 60 }}>
							<Text>{this.props.earning_date_formatted}</Text>
						</ContentOffset>

						<ContentOffset
							style={{ alignItems: 'flex-end', width: 90  }}>
							<Text>{this.props.earning_time}</Text>
						</ContentOffset>

						<ContentOffset>
							<Text color={colors.gray} numberOfLines={1}>
								{this.props.latest_earning_surprise}
							</Text>
						</ContentOffset>
					</ScrollView>
				</Wrapper>
			</TouchableOpacity>
		);
	}
}

const ContentOffset = styled(Row)`
	margin-right: ${padding.large}px;
	flex: ${props => props.flex};
	overflow: hidden;
`;

const Wrapper = styled(Row)`
	justify-content: space-between;
	background-color: ${props => props.theme.colors.blockBackground};
	align-items: center;
	padding: 3.5px 0;
	overflow: hidden;
`;
