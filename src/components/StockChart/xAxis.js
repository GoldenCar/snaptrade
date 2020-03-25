import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { XAxis as RNSCXAxis } from 'react-native-svg-charts';

import { textColors, fonts, fontWeights } from '../../styles/base';
import { TickerChartStyled } from './styles';
import StyledText from '../StyledText';

export default class XAxis extends React.PureComponent {
	static defaultProps = {
		data: []
	};

	formatLabel = (value, index) => {
		return this.props.data[index]
	};

	// xAccessor = (x) => {
	//     return x
	// }

	render() {
		return (
			<RNSCXAxis
				data={this.props.data}
				numberOfTicks={6}
				// xAccessor={this.xAccessor}
				formatLabel={this.formatLabel}
				svg={{
					fill: textColors.primary
				}}
				style={TickerChartStyled.xAxis}
			/>
		);
	}
}
