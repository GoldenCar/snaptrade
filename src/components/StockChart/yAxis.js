import React from 'react';
import { StyleSheet } from 'react-native';
import { TickerChartStyled } from './styles';
import { YAxis as RNSCYAxis } from 'react-native-svg-charts';
import { fonts, textColors, fontWeights, fontFamily } from '../../styles/base';

export default class YAxis extends React.PureComponent {
	static defaultProps = {
		data: []
	};

	render() {
		return (
			<RNSCYAxis
				data={this.props.data}
				numberOfTicks={4}
				svg={{
					fill: textColors.primary
				}}
				style={[StyleSheet.absoluteFill, TickerChartStyled.yAxis]}
			/>
		);
	}
}
