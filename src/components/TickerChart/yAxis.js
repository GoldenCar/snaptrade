import React from 'react';
import { StyleSheet } from 'react-native';
import { TickerChartStyled } from './styles';
import { YAxis as RNSCYAxis } from 'react-native-svg-charts';
import {
	fonts,
	textColors,
	fontWeights,
	fontFamily,
	colors
} from '../../styles/base';

export default class YAxis extends React.PureComponent {
	static defaultProps = {
		data: []
	};

	formatLabel = a => {
		const num = Number(a);
		return num.toFixed(0);
	};

	render() {
		return (
			<RNSCYAxis
				data={this.props.data}
				numberOfTicks={4}
				formatLabel={this.formatLabel}
				svg={{
					fill: colors.purple,
					textAlign: 'left'
				}}
				style={[TickerChartStyled.yAxis]}
			/>
		);
	}
}
