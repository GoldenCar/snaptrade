import React, { PureComponent } from 'react';
import { colors, fontWeights } from '../../styles/base';
import styled from 'styled-components';

import { Text } from '../UIComponents/TextComponents';
import { formatPrice, getColorFromValue } from '../../utils';

export default class DiffComponent extends PureComponent {
	static defaultProps = {
		value: 0,
		trigger: 0,
		format: false,
		formatSymbol: false,
		afterSymbol: null
	};

	render() {
		const trigger = this.props.trigger || this.props.value;
		return (
			<Wrapper color={getColorFromValue(trigger)}>
				<DiffText>
					{this.props.format
						? formatPrice(
								this.props.value,
								2,
								this.props.formatSymbol
						  )
						: this.props.value}
					{this.props.afterSymbol}
				</DiffText>
			</Wrapper>
		);
	}
}

const Wrapper = styled.View`
	border-radius: 13px;
	align-items: center;
	justify-content: center;
	width: 65px;
	height: 24px;

	background-color: ${props => props.color || colors.gray};
`;

const DiffText = styled(Text)`
	font-size: 13px;
	font-weight: ${fontWeights.bold};
	color: ${colors.white};
`;
