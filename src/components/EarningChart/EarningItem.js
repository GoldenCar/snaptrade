import React, { Component } from 'react';
import { View } from 'react-native';
import { EarningChartStyled } from './styles';
import { textStyles, colors, padding } from '../../styles/base';
import { Text, TextBold } from '../UIComponents/TextComponents';

export default class EarningItem extends Component {
	static defaultProps = {
		color: colors.green,
		title: 'Mock data',
		subtitle: 'Mock data'
	};

	render() {
		return (
			<View
				style={[
					EarningChartStyled.row,
					EarningChartStyled.earningItemWrapper
				]}>
				<View
					style={[
						EarningChartStyled.earningDot,
						{
							backgroundColor: this.props.color,
							marginRight: padding.medium
						}
					]}
				/>
				<View>
					<TextBold>
						{this.props.title}
					</TextBold>
					<Text>{this.props.subtitle}</Text>
				</View>
			</View>
		);
	}
}

